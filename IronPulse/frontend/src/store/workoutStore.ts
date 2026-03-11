import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Workout, WorkoutLog, ActivityLog } from '../types/database';
import { addDays, startOfWeek } from 'date-fns';

interface Exercise {
  id: string;
  name: string;
  sets: {
    id: string;
    setNumber: number;
    reps: string;
    weight: string;
    completed: boolean;
  }[];
}

interface WorkoutState {
  workouts: Workout[];
  currentWorkout: Workout | null;
  currentExercises: Exercise[];
  activityLog: ActivityLog[];
  loading: boolean;
  error: string | null;
  trainingFrequency: number;

  // Workout actions
  fetchWorkouts: () => Promise<void>;
  createWorkout: (name: string) => Promise<Workout | null>;
  updateWorkout: (id: string, updates: Partial<Workout>) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  completeWorkout: (id: string) => Promise<void>;
  shiftWorkoutDate: (id: string, deltaDays: number) => Promise<void>;
  generatePlan: (frequency: number, weeks?: number) => Promise<void>;
  setTrainingFrequency: (frequency: number) => Promise<void>;

  // Exercise actions (local state for active workout)
  setCurrentWorkout: (workout: Workout | null) => void;
  addExercise: (name: string) => void;
  removeExercise: (exerciseId: string) => void;
  addSet: (exerciseId: string) => void;
  removeSet: (exerciseId: string, setId: string) => void;
  updateSet: (exerciseId: string, setId: string, field: 'reps' | 'weight', value: string) => void;
  toggleSetComplete: (exerciseId: string, setId: string) => void;
  saveWorkoutLogs: () => Promise<void>;
  clearCurrentWorkout: () => void;

  // Activity log
  fetchActivityLog: (days?: number) => Promise<void>;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  workouts: [],
  currentWorkout: null,
  currentExercises: [],
  activityLog: [],
  loading: false,
  error: null,
  trainingFrequency: 3,

  fetchWorkouts: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ workouts: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createWorkout: async (name) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('workouts')
        .insert({
          user_id: user.id,
          name,
          status: 'in_progress',
        })
        .select()
        .single();

      if (error) throw error;

      // Optimistic update
      set((state) => ({ workouts: [data, ...state.workouts] }));
      return data;
    } catch (error: any) {
      set({ error: error.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  updateWorkout: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('workouts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Optimistic update
      set((state) => ({
        workouts: state.workouts.map((w) =>
          w.id === id ? { ...w, ...updates } : w
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteWorkout: async (id) => {
    try {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Optimistic update
      set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  completeWorkout: async (id) => {
    try {
      const { error } = await supabase
        .from('workouts')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        workouts: state.workouts.map((w) =>
          w.id === id
            ? { ...w, status: 'completed' as const, completed_at: new Date().toISOString() }
            : w
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  shiftWorkoutDate: async (id, deltaDays) => {
    try {
      const workout = get().workouts.find((w) => w.id === id);
      if (!workout) throw new Error('Séance introuvable');

      const newDate = addDays(new Date(workout.workout_date), deltaDays);
      const iso = newDate.toISOString().slice(0, 10);

      const { error } = await supabase
        .from('workouts')
        .update({ workout_date: iso })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        workouts: state.workouts.map((w) =>
          w.id === id ? { ...w, workout_date: iso } : w
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  generatePlan: async (frequency, weeks = 4) => {
    set({ loading: true, error: null, trainingFrequency: frequency });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const today = new Date();
      const monday = startOfWeek(today, { weekStartsOn: 1 });

      // Nettoyage des séances planifiées futures
      await supabase
        .from('workouts')
        .delete()
        .eq('user_id', user.id)
        .eq('status', 'planned')
        .gte('workout_date', today.toISOString().slice(0, 10));

      const inserts: any[] = [];
      let counter = 1;
      for (let w = 0; w < weeks; w++) {
        const weekStart = addDays(monday, w * 7);
        for (let i = 0; i < frequency; i++) {
          const offset = Math.max(
            0,
            Math.round(((i + 1) * 7) / (frequency + 1)) - 1
          );
          const date = addDays(weekStart, offset);
          inserts.push({
            user_id: user.id,
            name: `Séance planifiée #${counter++}`,
            status: 'planned',
            workout_date: date.toISOString().slice(0, 10),
          });
        }
      }

      if (inserts.length) {
        const { data, error } = await supabase
          .from('workouts')
          .insert(inserts)
          .select();
        if (error) throw error;
        // rafraîchir
        await get().fetchWorkouts();
      }

      // persister la fréquence côté profil
      await get().setTrainingFrequency(frequency);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setTrainingFrequency: async (frequency) => {
    set({ trainingFrequency: frequency });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase
        .from('profiles')
        .update({ training_frequency: frequency })
        .eq('id', user.id);
      if (error) throw error;
    } catch (error) {
      console.error('Training frequency update error:', error);
    }
  },

  setCurrentWorkout: (workout) => {
    set({ currentWorkout: workout, currentExercises: [] });
  },

  addExercise: (name) => {
    const newExercise: Exercise = {
      id: generateId(),
      name,
      sets: [
        {
          id: generateId(),
          setNumber: 1,
          reps: '',
          weight: '',
          completed: false,
        },
      ],
    };
    set((state) => ({
      currentExercises: [...state.currentExercises, newExercise],
    }));
  },

  removeExercise: (exerciseId) => {
    set((state) => ({
      currentExercises: state.currentExercises.filter((e) => e.id !== exerciseId),
    }));
  },

  addSet: (exerciseId) => {
    set((state) => ({
      currentExercises: state.currentExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const newSetNumber = exercise.sets.length + 1;
          return {
            ...exercise,
            sets: [
              ...exercise.sets,
              {
                id: generateId(),
                setNumber: newSetNumber,
                reps: '',
                weight: '',
                completed: false,
              },
            ],
          };
        }
        return exercise;
      }),
    }));
  },

  removeSet: (exerciseId, setId) => {
    set((state) => ({
      currentExercises: state.currentExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const filteredSets = exercise.sets.filter((s) => s.id !== setId);
          // Renumber sets
          const renumberedSets = filteredSets.map((s, index) => ({
            ...s,
            setNumber: index + 1,
          }));
          return { ...exercise, sets: renumberedSets };
        }
        return exercise;
      }),
    }));
  },

  updateSet: (exerciseId, setId, field, value) => {
    set((state) => ({
      currentExercises: state.currentExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((s) =>
              s.id === setId ? { ...s, [field]: value } : s
            ),
          };
        }
        return exercise;
      }),
    }));
  },

  toggleSetComplete: (exerciseId, setId) => {
    set((state) => ({
      currentExercises: state.currentExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((s) =>
              s.id === setId ? { ...s, completed: !s.completed } : s
            ),
          };
        }
        return exercise;
      }),
    }));
  },

  saveWorkoutLogs: async () => {
    const { currentWorkout, currentExercises } = get();
    if (!currentWorkout) return;

    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Prepare logs for insertion
      const logs: any[] = [];
      currentExercises.forEach((exercise) => {
        exercise.sets.forEach((s) => {
          if (s.reps || s.weight) {
            logs.push({
              workout_id: currentWorkout.id,
              user_id: user.id,
              exercise_name: exercise.name,
              set_number: s.setNumber,
              reps: s.reps ? parseInt(s.reps) : null,
              weight: s.weight ? parseFloat(s.weight) : null,
              completed: s.completed,
            });
          }
        });
      });

      if (logs.length > 0) {
        const { error } = await supabase
          .from('workout_logs')
          .insert(logs);

        if (error) throw error;
      }

      // Complete the workout
      await get().completeWorkout(currentWorkout.id);
      get().clearCurrentWorkout();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearCurrentWorkout: () => {
    set({ currentWorkout: null, currentExercises: [] });
  },

  fetchActivityLog: async (days = 90) => {
    set({ loading: true, error: null });
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .gte('activity_date', startDate.toISOString().split('T')[0])
        .order('activity_date', { ascending: true });

      if (error) throw error;
      set({ activityLog: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
