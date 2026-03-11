export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          email: string | null
          full_name: string | null
          avatar_url: string | null
          streak_count: number
          longest_streak: number
          total_workouts: number
          training_frequency: number
          consistency_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          streak_count?: number
          longest_streak?: number
          total_workouts?: number
          training_frequency?: number
          consistency_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          streak_count?: number
          longest_streak?: number
          total_workouts?: number
          training_frequency?: number
          consistency_score?: number
          created_at?: string
          updated_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string
          name: string
          status: 'planned' | 'in_progress' | 'completed'
          notes: string | null
          duration_minutes: number | null
          calories_burned: number | null
          workout_date: string
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          status?: 'planned' | 'in_progress' | 'completed'
          notes?: string | null
          duration_minutes?: number | null
          calories_burned?: number | null
          workout_date?: string
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          status?: 'planned' | 'in_progress' | 'completed'
          notes?: string | null
          duration_minutes?: number | null
          calories_burned?: number | null
          workout_date?: string
          created_at?: string
          completed_at?: string | null
        }
      }
      workout_logs: {
        Row: {
          id: string
          workout_id: string
          user_id: string
          exercise_name: string
          set_number: number
          reps: number | null
          weight: number | null
          weight_unit: 'kg' | 'lbs'
          duration_seconds: number | null
          distance_meters: number | null
          notes: string | null
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          workout_id: string
          user_id: string
          exercise_name: string
          set_number?: number
          reps?: number | null
          weight?: number | null
          weight_unit?: 'kg' | 'lbs'
          duration_seconds?: number | null
          distance_meters?: number | null
          notes?: string | null
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          workout_id?: string
          user_id?: string
          exercise_name?: string
          set_number?: number
          reps?: number | null
          weight?: number | null
          weight_unit?: 'kg' | 'lbs'
          duration_seconds?: number | null
          distance_meters?: number | null
          notes?: string | null
          completed?: boolean
          created_at?: string
        }
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          invite_code: string
          owner_id: string
          is_public: boolean
          max_members: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          invite_code: string
          owner_id: string
          is_public?: boolean
          max_members?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          invite_code?: string
          owner_id?: string
          is_public?: boolean
          max_members?: number
          created_at?: string
          updated_at?: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          joined_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          joined_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member'
          joined_at?: string
        }
      }
      activity_log: {
        Row: {
          id: string
          user_id: string
          activity_date: string
          workout_count: number
          total_sets: number
          total_reps: number
          total_weight: number
          intensity_level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_date: string
          workout_count?: number
          total_sets?: number
          total_reps?: number
          total_weight?: number
          intensity_level?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_date?: string
          workout_count?: number
          total_sets?: number
          total_reps?: number
          total_weight?: number
          intensity_level?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Workout = Database['public']['Tables']['workouts']['Row']
export type WorkoutLog = Database['public']['Tables']['workout_logs']['Row']
export type Group = Database['public']['Tables']['groups']['Row']
export type GroupMember = Database['public']['Tables']['group_members']['Row']
export type ActivityLog = Database['public']['Tables']['activity_log']['Row']
