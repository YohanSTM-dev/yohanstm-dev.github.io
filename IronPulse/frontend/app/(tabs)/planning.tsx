import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Ionicons } from '@expo/vector-icons';
import { useWorkoutStore } from '../../src/store/workoutStore';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';

export default function PlanningScreen() {
  const {
    workouts,
    fetchWorkouts,
    trainingFrequency,
    generatePlan,
    shiftWorkoutDate,
  } = useWorkoutStore();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const upcomingDays = Array.from({ length: 14 }).map((_, i) =>
    addDays(new Date(), i)
  );

  const planned = workouts
    .filter((w) => w.status === 'planned' || w.status === 'in_progress')
    .sort((a, b) => a.workout_date.localeCompare(b.workout_date));

  const completed = workouts
    .filter((w) => w.status === 'completed')
    .sort((a, b) => b.workout_date.localeCompare(a.workout_date))
    .slice(0, 5);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Planning</Text>
        <Text style={styles.subtitle}>
          Planifie tes prochaines séances et garde le cap.
        </Text>

        {/* Sélecteur de rythme */}
        <Card style={styles.freqCard}>
          <View style={styles.freqHeader}>
            <Text style={styles.freqTitle}>Rythme hebdo</Text>
            <Text style={styles.freqValue}>{trainingFrequency}x / semaine</Text>
          </View>
          <View style={styles.freqRow}>
            {[2, 3, 4, 5, 6].map((n) => (
              <Button
                key={n}
                title={`${n}x`}
                onPress={() => generatePlan(n)}
                variant={trainingFrequency === n ? 'primary' : 'outline'}
                style={styles.freqBtn}
              />
            ))}
          </View>
          <Text style={styles.freqHint}>
            On répartit automatiquement tes séances sur les 4 prochaines
            semaines. Tu peux ensuite décaler un jour si besoin.
          </Text>
        </Card>

        {/* Mini calendrier 2 semaines */}
        <Card style={styles.calendarCard}>
          <View style={styles.calendarRow}>
            {upcomingDays.map((day) => {
              const hasSession = planned.some((w) =>
                isSameDay(parseISO(w.workout_date), day)
              );
              return (
                <View key={day.toISOString()} style={styles.calendarCell}>
                  <Text style={styles.calendarDow}>
                    {format(day, 'EE', { locale: fr })}
                  </Text>
                  <View
                    style={[
                      styles.calendarDate,
                      hasSession && styles.calendarDateActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarDateText,
                        hasSession && styles.calendarDateTextActive,
                      ]}
                    >
                      {format(day, 'd')}
                    </Text>
                  </View>
                  {hasSession && <View style={styles.dot} />}
                </View>
              );
            })}
          </View>
        </Card>

        {/* Séances planifiées */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>À venir</Text>
            <TouchableOpacity>
              <Text style={styles.link}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {planned.length === 0 ? (
            <Card>
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={48} color="#334155" />
                <Text style={styles.emptyText}>
                  Aucune séance planifiée. Ajoute-en une pour rester régulier.
                </Text>
              </View>
              </Card>
            ) : (
            planned.map((w) => (
              <Card key={w.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemIcon}>
                    <Ionicons name="barbell" size={18} color="#10B981" />
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{w.name}</Text>
                    <Text style={styles.itemMeta}>
                      {format(parseISO(w.workout_date), 'd MMM yyyy', {
                        locale: fr,
                      })}{' '}
                      • {w.status === 'planned' ? 'Prévu' : 'En cours'}
                    </Text>
                  </View>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      onPress={() => shiftWorkoutDate(w.id, -1)}
                      style={styles.actionBtn}
                    >
                      <Ionicons name="chevron-back" size={18} color="#94A3B8" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => shiftWorkoutDate(w.id, 1)}
                      style={styles.actionBtn}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#94A3B8"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {w.notes ? (
                  <Text style={styles.itemNotes}>{w.notes}</Text>
                ) : null}
              </Card>
            ))
          )}
        </View>

        {/* Dernières complétées */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dernières séances</Text>
          </View>
          {completed.length === 0 ? (
            <Card>
              <View style={styles.emptyState}>
                <Ionicons name="barbell-outline" size={48} color="#334155" />
                <Text style={styles.emptyText}>
                  Pas encore de séance terminée. Lance-toi !
                </Text>
              </View>
            </Card>
          ) : (
            completed.map((w) => (
              <Card key={w.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemIconCompleted}>
                    <Ionicons name="checkmark" size={16} color="#0F172A" />
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{w.name}</Text>
                    <Text style={styles.itemMeta}>
                      Terminé le{' '}
                      {format(parseISO(w.workout_date), 'd MMM yyyy', {
                        locale: fr,
                      })}
                    </Text>
                  </View>
                  <Text style={styles.badge}>Complétée</Text>
                </View>
              </Card>
            ))
          )}
        </View>

        <Button
          title="Planifier une séance"
          style={styles.cta}
          icon={<Ionicons name="add-circle" size={20} color="#fff" />}
        />
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
  freqCard: { marginBottom: 16 },
  freqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  freqTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '700' },
  freqValue: { color: '#10B981', fontWeight: '700' },
  freqRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  freqBtn: { flex: 1 },
  freqHint: { color: '#94A3B8', fontSize: 12, marginTop: 8, lineHeight: 16 },
  calendarCard: { marginBottom: 16 },
  calendarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  calendarCell: { width: '13%', alignItems: 'center', gap: 4 },
  calendarDow: { color: '#94A3B8', fontSize: 11, textTransform: 'capitalize' },
  calendarDate: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDateActive: { backgroundColor: 'rgba(16,185,129,0.15)', borderColor: '#10B981' },
  calendarDateText: { color: '#E2E8F0', fontWeight: '600' },
  calendarDateTextActive: { color: '#10B981' },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  section: { marginTop: 12 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: { color: '#F8FAFC', fontSize: 18, fontWeight: '700' },
  link: { color: '#10B981', fontWeight: '600' },
  emptyState: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  emptyText: { color: '#64748B', textAlign: 'center' },
  itemCard: { marginBottom: 10 },
  itemHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(16,185,129,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIconCompleted: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: { flex: 1 },
  itemTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '600' },
  itemMeta: { color: '#94A3B8', fontSize: 13 },
  itemNotes: { color: '#94A3B8', marginTop: 8, lineHeight: 18 },
  badge: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 12,
  },
  cta: { marginTop: 16 },
  actions: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
});
