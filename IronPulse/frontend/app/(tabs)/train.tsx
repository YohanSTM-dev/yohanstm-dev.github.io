import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useWorkoutStore } from '../../src/store/workoutStore';
import { ExerciseCard } from '../../src/components/workout/ExerciseCard';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';

const POPULAR_EXERCISES = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Pull-up',
  'Dumbbell Curl',
  'Tricep Pushdown',
  'Leg Press',
  'Lat Pulldown',
  'Cable Fly',
  'Leg Extension',
];

export default function TrainScreen() {
  const {
    currentWorkout,
    currentExercises,
    createWorkout,
    setCurrentWorkout,
    addExercise,
    removeExercise,
    addSet,
    removeSet,
    updateSet,
    toggleSetComplete,
    saveWorkoutLogs,
    clearCurrentWorkout,
    loading,
  } = useWorkoutStore();

  const [workoutName, setWorkoutName] = useState('');
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [customExercise, setCustomExercise] = useState('');
  const [showStartModal, setShowStartModal] = useState(false);

  const handleStartWorkout = async () => {
    if (!workoutName.trim()) {
      Alert.alert('Erreur', 'Indique un nom de séance');
      return;
    }

    const workout = await createWorkout(workoutName.trim());
    if (workout) {
      setCurrentWorkout(workout);
      setWorkoutName('');
      setShowStartModal(false);
    }
  };

  const handleAddExercise = (name: string) => {
    addExercise(name);
    setShowExerciseModal(false);
    setCustomExercise('');
  };

  const handleFinishWorkout = async () => {
    if (currentExercises.length === 0) {
      Alert.alert('Erreur', 'Ajoute au moins un exercice avant de terminer');
      return;
    }

    Alert.alert(
      'Terminer la séance',
      'Tu es sûr de vouloir terminer cette séance ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Terminer',
          onPress: async () => {
            await saveWorkoutLogs();
            Alert.alert('Bien joué !', 'Séance terminée avec succès !');
          },
        },
      ]
    );
  };

  const handleCancelWorkout = () => {
    Alert.alert(
      'Annuler la séance',
      'Tu es sûr de vouloir annuler ? Toute la progression sera perdue.',
      [
        { text: 'Continuer', style: 'cancel' },
        {
          text: 'Annuler la séance',
          style: 'destructive',
          onPress: clearCurrentWorkout,
        },
      ]
    );
  };

  if (!currentWorkout) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyContent}>
            <View style={styles.emptyIconBg}>
              <Ionicons name="barbell" size={48} color="#10B981" />
            </View>
            <Text style={styles.emptyTitle}>Prêt à t’entraîner ?</Text>
            <Text style={styles.emptyText}>
              Démarre une nouvelle séance et suis ta progression.
            </Text>
            <Button
              title="Commencer une séance"
              onPress={() => setShowStartModal(true)}
              style={styles.startButton}
            />
          </View>
        </View>

        {/* Start Workout Modal */}
        <Modal
          visible={showStartModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowStartModal(false)}
        >
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalContent}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Nouvelle séance</Text>
                <TouchableOpacity onPress={() => setShowStartModal(false)}>
                  <Ionicons name="close" size={24} color="#F8FAFC" />
                </TouchableOpacity>
              </View>

              <Input
                label="Nom de la séance"
                placeholder="ex. Haut du corps, Jambes"
                value={workoutName}
                onChangeText={setWorkoutName}
                icon="fitness-outline"
              />

              <Button
                title="Commencer"
                onPress={handleStartWorkout}
                loading={loading}
                style={styles.modalButton}
              />
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.workoutTitle}>{currentWorkout.name}</Text>
          <Text style={styles.workoutStatus}>En cours</Text>
        </View>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={handleCancelWorkout}
        >
          <Ionicons name="close" size={24} color="#F43F5E" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Exercises */}
        {currentExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            name={exercise.name}
            sets={exercise.sets}
            onAddSet={() => addSet(exercise.id)}
            onRemoveSet={(setId) => removeSet(exercise.id, setId)}
            onUpdateSet={(setId, field, value) =>
              updateSet(exercise.id, setId, field, value)
            }
            onToggleComplete={(setId) => toggleSetComplete(exercise.id, setId)}
            onRemoveExercise={() => removeExercise(exercise.id)}
          />
        ))}

        {/* Add Exercise Button */}
        <TouchableOpacity
          style={styles.addExerciseBtn}
          onPress={() => setShowExerciseModal(true)}
        >
          <Ionicons name="add-circle" size={24} color="#10B981" />
          <Text style={styles.addExerciseText}>Ajouter un exercice</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button
          title="Terminer la séance"
          onPress={handleFinishWorkout}
          loading={loading}
          disabled={currentExercises.length === 0}
          size="lg"
        />
      </View>

      {/* Exercise Modal */}
      <Modal
        visible={showExerciseModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowExerciseModal(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContent, styles.exerciseModalContent]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ajouter un exercice</Text>
              <TouchableOpacity onPress={() => setShowExerciseModal(false)}>
                <Ionicons name="close" size={24} color="#F8FAFC" />
              </TouchableOpacity>
            </View>

            {/* Custom Exercise */}
            <View style={styles.customExerciseRow}>
              <TextInput
                style={styles.customExerciseInput}
                placeholder="Exercice personnalisé..."
                placeholderTextColor="#64748B"
                value={customExercise}
                onChangeText={setCustomExercise}
              />
              <TouchableOpacity
                style={[
                  styles.customExerciseBtn,
                  !customExercise && styles.customExerciseBtnDisabled,
                ]}
                onPress={() => customExercise && handleAddExercise(customExercise)}
                disabled={!customExercise}
              >
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.popularTitle}>Exercices populaires</Text>
            <ScrollView style={styles.exerciseList}>
              {POPULAR_EXERCISES.map((exercise) => (
                <TouchableOpacity
                  key={exercise}
                  style={styles.exerciseItem}
                  onPress={() => handleAddExercise(exercise)}
                >
                  <Ionicons name="barbell-outline" size={20} color="#10B981" />
                  <Text style={styles.exerciseItemText}>{exercise}</Text>
                  <Ionicons name="add" size={20} color="#64748B" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  emptyContent: {
    alignItems: 'center',
  },
  emptyIconBg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  startButton: {
    minWidth: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  workoutTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
  },
  workoutStatus: {
    color: '#10B981',
    fontSize: 14,
    marginTop: 4,
  },
  cancelBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  addExerciseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#334155',
    borderRadius: 12,
    gap: 8,
  },
  addExerciseText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomActions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  exerciseModalContent: {
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
  },
  modalButton: {
    marginTop: 8,
  },
  customExerciseRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  customExerciseInput: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 16,
    color: '#F8FAFC',
    fontSize: 16,
  },
  customExerciseBtn: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customExerciseBtnDisabled: {
    opacity: 0.5,
  },
  popularTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  exerciseList: {
    maxHeight: 400,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  exerciseItemText: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 16,
  },
});
