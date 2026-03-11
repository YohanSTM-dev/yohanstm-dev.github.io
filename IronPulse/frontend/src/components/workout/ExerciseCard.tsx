import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';

interface Set {
  id: string;
  setNumber: number;
  reps: string;
  weight: string;
  completed: boolean;
}

interface ExerciseCardProps {
  name: string;
  sets: Set[];
  onAddSet: () => void;
  onRemoveSet: (setId: string) => void;
  onUpdateSet: (setId: string, field: 'reps' | 'weight', value: string) => void;
  onToggleComplete: (setId: string) => void;
  onRemoveExercise: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  sets,
  onAddSet,
  onRemoveSet,
  onUpdateSet,
  onToggleComplete,
  onRemoveExercise,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.exerciseName}>{name}</Text>
        <TouchableOpacity onPress={onRemoveExercise} style={styles.removeBtn}>
          <Ionicons name="trash-outline" size={20} color="#F43F5E" />
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.setCol]}>SET</Text>
        <Text style={[styles.headerText, styles.inputCol]}>WEIGHT (kg)</Text>
        <Text style={[styles.headerText, styles.inputCol]}>REPS</Text>
        <Text style={[styles.headerText, styles.checkCol]}></Text>
      </View>

      {sets.map((set) => (
        <View key={set.id} style={styles.setRow}>
          <Text style={[styles.setText, styles.setCol]}>{set.setNumber}</Text>
          <TextInput
            style={[styles.setInput, styles.inputCol]}
            value={set.weight}
            onChangeText={(v) => onUpdateSet(set.id, 'weight', v)}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#64748B"
          />
          <TextInput
            style={[styles.setInput, styles.inputCol]}
            value={set.reps}
            onChangeText={(v) => onUpdateSet(set.id, 'reps', v)}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#64748B"
          />
          <TouchableOpacity
            style={[
              styles.checkBtn,
              styles.checkCol,
              set.completed && styles.checkBtnActive,
            ]}
            onPress={() => onToggleComplete(set.id)}
          >
            <Ionicons
              name={set.completed ? 'checkmark' : 'checkmark'}
              size={18}
              color={set.completed ? '#fff' : '#64748B'}
            />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addSetBtn} onPress={onAddSet}>
        <Ionicons name="add" size={18} color="#10B981" />
        <Text style={styles.addSetText}>Add Set</Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseName: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
  },
  removeBtn: {
    padding: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginBottom: 8,
  },
  headerText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  setCol: {
    width: 40,
    textAlign: 'center',
  },
  inputCol: {
    flex: 1,
    textAlign: 'center',
  },
  checkCol: {
    width: 44,
    alignItems: 'center',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  setText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  setInput: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#F8FAFC',
    fontSize: 14,
    marginHorizontal: 4,
    textAlign: 'center',
  },
  checkBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBtnActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  addSetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 6,
  },
  addSetText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
});
