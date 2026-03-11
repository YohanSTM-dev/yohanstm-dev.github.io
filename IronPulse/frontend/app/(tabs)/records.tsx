import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { usePRStore } from '../../src/store/prStore';

export default function RecordsScreen() {
  const { records, addRecord } = usePRStore();
  const [exercise, setExercise] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs' | 'rep' | 'sec'>('kg');
  const [note, setNote] = useState('');

  const handleAdd = () => {
    if (!exercise.trim() || !value) return;
    addRecord({
      exercise: exercise.trim(),
      value: Number(value),
      unit,
      date: new Date().toISOString(),
      note: note.trim() || undefined,
    });
    setExercise('');
    setValue('');
    setNote('');
  };

  const grouped = records.reduce<Record<string, typeof records>>((acc, r) => {
    acc[r.exercise] = acc[r.exercise] ? [...acc[r.exercise], r] : [r];
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Records personnels</Text>
        <Text style={styles.subtitle}>
          Suis tes PR et garde une trace de ta progression.
        </Text>

        {/* Form */}
        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>Ajouter un PR</Text>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              placeholder="Exercice (ex. Squat)"
              placeholderTextColor="#64748B"
              value={exercise}
              onChangeText={setExercise}
            />
            <View style={[styles.input, styles.inputNumber, styles.stepper]}>
              <TouchableOpacity
                onPress={() => setValue((v) => (Number(v) > 0 ? String(Number(v) - 1) : '0'))}
                style={styles.stepperBtn}
              >
                <Ionicons name="remove" size={18} color="#E2E8F0" />
              </TouchableOpacity>
              <Text style={styles.stepperValue}>{value || '0'}</Text>
              <TouchableOpacity
                onPress={() => setValue((v) => String(Number(v || '0') + 1))}
                style={styles.stepperBtn}
              >
                <Ionicons name="add" size={18} color="#E2E8F0" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.unitRow}>
            {(['kg', 'lbs', 'rep', 'sec'] as const).map((u) => (
              <Button
                key={u}
                title={u.toUpperCase()}
                variant={unit === u ? 'primary' : 'outline'}
                onPress={() => setUnit(u)}
                style={styles.unitBtn}
              />
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Note (optionnel)"
            placeholderTextColor="#64748B"
            value={note}
            onChangeText={setNote}
          />
          <Button
            title="Enregistrer le PR"
            onPress={handleAdd}
            icon={<Ionicons name="save" size={18} color="#fff" />}
          />
        </Card>

        {/* Records list */}
        {Object.entries(grouped).map(([exerciseName, prs]) => (
          <Card key={exerciseName} style={styles.recordCard}>
            <View style={styles.recordHeader}>
              <Text style={styles.recordTitle}>{exerciseName}</Text>
              <Ionicons name="stats-chart" size={18} color="#10B981" />
            </View>
            {prs.map((r) => (
              <View key={r.id} style={styles.recordRow}>
                <Text style={styles.recordValue}>
                  {r.value} {r.unit.toUpperCase()}
                </Text>
                <Text style={styles.recordDate}>
                  {format(parseISO(r.date), 'd MMM yyyy', { locale: fr })}
                </Text>
                {r.note ? (
                  <Text style={styles.recordNote}>{r.note}</Text>
                ) : null}
              </View>
            ))}
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  title: { color: '#F8FAFC', fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#94A3B8', marginTop: 6, marginBottom: 16 },
  formCard: { marginBottom: 16 },
  formTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  formRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
  },
  inputNumber: { maxWidth: 140 },
  unitRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  unitBtn: { flex: 1 },
  recordCard: { marginBottom: 12 },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '700' },
  recordRow: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#1E293B' },
  recordValue: { color: '#10B981', fontSize: 18, fontWeight: '700' },
  recordDate: { color: '#94A3B8', fontSize: 12 },
  recordNote: { color: '#CBD5E1', marginTop: 4 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    gap: 8,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  stepperValue: { color: '#F8FAFC', fontSize: 16, fontWeight: '700' },
});
