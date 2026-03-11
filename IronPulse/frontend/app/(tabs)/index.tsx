import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { useWorkoutStore } from '../../src/store/workoutStore';
import { usePRStore } from '../../src/store/prStore';
import { StreakCard } from '../../src/components/dashboard/StreakCard';
import { ActivityHeatmap } from '../../src/components/dashboard/ActivityHeatmap';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function HomeScreen() {
  const { profile, fetchProfile } = useAuthStore();
  const { workouts, activityLog, fetchWorkouts, fetchActivityLog } =
    useWorkoutStore();
  const { records } = usePRStore();

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([fetchProfile(), fetchWorkouts(), fetchActivityLog()]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const todayWorkouts = workouts.filter(
    (w) =>
      w.workout_date === format(new Date(), 'yyyy-MM-dd') &&
      w.status === 'completed'
  );

  const recentWorkouts = workouts
    .filter((w) => w.status === 'completed')
    .slice(0, 3);

  const today = format(new Date(), 'EEEE d MMMM', { locale: fr });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#10B981"
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bon retour,</Text>
            <Text style={styles.username}>
              {profile?.username || profile?.email?.split('@')[0] || 'Athlète'}
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#F8FAFC" />
          </TouchableOpacity>
        </View>

        {/* Streak Card */}
        <StreakCard
          currentStreak={profile?.streak_count || 0}
          longestStreak={profile?.longest_streak || 0}
          totalWorkouts={profile?.total_workouts || 0}
        />

        {/* Today card */}
        <Card style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <View>
              <Text style={styles.todayLabel}>Séance du jour</Text>
              <Text style={styles.todayDate}>{today}</Text>
            </View>
            <Ionicons name="flame" size={26} color="#F59E0B" />
          </View>
          <Text style={styles.todayText}>
            Lance ta séance prévue ou ajuste ton planning en 2 clics.
          </Text>
          <View style={styles.todayActions}>
            <Button
              title="Démarrer"
              onPress={() => router.push('/(tabs)/train')}
              style={styles.todayPrimary}
            />
            <Button
              title="Voir planning"
              variant="outline"
              onPress={() => router.push('/(tabs)/planning')}
              style={styles.todaySecondary}
            />
          </View>
        </Card>

        {/* Today's Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Résumé du jour</Text>
          <Card>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.summaryValue}>{todayWorkouts.length}</Text>
                <Text style={styles.summaryLabel}>Séances</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Ionicons name="time" size={24} color="#3B82F6" />
                <Text style={styles.summaryValue}>
                  {todayWorkouts.reduce(
                    (acc, w) => acc + (w.duration_minutes || 0),
                    0
                  )}
                </Text>
                <Text style={styles.summaryLabel}>Minutes</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Activity Heatmap */}
        <View style={styles.section}>
          <ActivityHeatmap data={activityLog} weeks={12} />
        </View>

        {/* PR preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Derniers PR</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/records')}>
              <Text style={styles.seeAll}>Voir les PR</Text>
            </TouchableOpacity>
          </View>
          {records.length === 0 ? (
            <Card>
              <View style={styles.emptyState}>
                <Ionicons name="stats-chart" size={48} color="#334155" />
                <Text style={styles.emptyText}>
                  Aucun record enregistré. Ajoute ton premier PR !
                </Text>
              </View>
            </Card>
          ) : (
            records.slice(0, 3).map((r) => (
              <Card key={r.id} style={styles.workoutCard}>
                <View style={styles.workoutHeader}>
                  <View style={styles.prIcon}>
                    <Ionicons name="trophy" size={20} color="#0F172A" />
                  </View>
                  <View style={styles.workoutInfo}>
                    <View style={styles.prRow}>
                      <Text style={styles.workoutName}>{r.exercise}</Text>
                      <View style={styles.prBadge}>
                        <Text style={styles.prBadgeText}>PR</Text>
                      </View>
                    </View>
                    <Text style={styles.workoutDate}>
                      {r.value} {r.unit.toUpperCase()} •{' '}
                      {format(new Date(r.date), 'd MMM yyyy', { locale: fr })}
                    </Text>
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Séances récentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Tout voir</Text>
            </TouchableOpacity>
          </View>

          {recentWorkouts.length === 0 ? (
            <Card>
              <View style={styles.emptyState}>
                <Ionicons name="barbell-outline" size={48} color="#334155" />
                <Text style={styles.emptyText}>
                  Aucune séance pour l’instant. Lance ta première !
                </Text>
              </View>
            </Card>
          ) : (
            recentWorkouts.map((workout) => (
              <Card key={workout.id} style={styles.workoutCard}>
                <View style={styles.workoutHeader}>
                  <View style={styles.workoutIcon}>
                    <Ionicons name="barbell" size={20} color="#10B981" />
                  </View>
                  <View style={styles.workoutInfo}>
                    <Text style={styles.workoutName}>{workout.name}</Text>
                    <Text style={styles.workoutDate}>
                      {format(new Date(workout.created_at), 'd MMM yyyy', {
                        locale: fr,
                      })}
                    </Text>
                  </View>
                  <View style={styles.workoutStatus}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#10B981"
                    />
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    color: '#64748B',
    fontSize: 14,
  },
  username: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickStartCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: '#10B981',
  },
  quickStartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  quickStartTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
  },
  quickStartText: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 16,
  },
  quickStartBtn: {
    backgroundColor: '#10B981',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  seeAll: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryValue: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  summaryLabel: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 48,
    backgroundColor: '#334155',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  workoutCard: {
    marginBottom: 8,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutInfo: {
    flex: 1,
    marginLeft: 12,
  },
  workoutName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
  },
  workoutDate: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 2,
  },
  workoutStatus: {
    marginLeft: 12,
  },
  todayCard: {
    marginBottom: 16,
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  todayLabel: {
    color: '#94A3B8',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  todayDate: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  todayText: { color: '#CBD5E1', marginBottom: 12 },
  todayActions: { flexDirection: 'row', gap: 10 },
  todayPrimary: { flex: 1 },
  todaySecondary: { flex: 1 },
  prIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  prBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  prBadgeText: {
    color: '#F59E0B',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.3,
  },
});
