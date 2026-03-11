import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  currentStreak,
  longestStreak,
  totalWorkouts,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.fireContainer}>
        <View style={styles.fireIconBg}>
          <Ionicons name="flame" size={32} color="#F97316" />
        </View>
        <View style={styles.streakInfo}>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>Jours d'affilée</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Ionicons name="trophy" size={20} color="#FBBF24" />
          <Text style={styles.statValue}>{longestStreak}</Text>
          <Text style={styles.statLabel}>Record</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Ionicons name="barbell" size={20} color="#10B981" />
          <Text style={styles.statValue}>{totalWorkouts}</Text>
          <Text style={styles.statLabel}>Séances</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  fireContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  fireIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakInfo: {
    marginLeft: 16,
  },
  streakNumber: {
    color: '#F8FAFC',
    fontSize: 36,
    fontWeight: '700',
  },
  streakLabel: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#334155',
  },
});
