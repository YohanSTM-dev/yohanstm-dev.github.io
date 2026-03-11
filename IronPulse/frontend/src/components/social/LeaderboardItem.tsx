import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LeaderboardItemProps {
  rank: number;
  username: string;
  consistencyScore: number;
  streakCount: number;
  totalWorkouts: number;
  isCurrentUser?: boolean;
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  rank,
  username,
  consistencyScore,
  streakCount,
  totalWorkouts,
  isCurrentUser = false,
}) => {
  const getRankColor = () => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#64748B';
    }
  };

  const getRankIcon = () => {
    if (rank <= 3) {
      return <Ionicons name="trophy" size={18} color={getRankColor()} />;
    }
    return <Text style={styles.rankNumber}>{rank}</Text>;
  };

  return (
    <View style={[styles.container, isCurrentUser && styles.currentUser]}>
      <View style={styles.rankContainer}>{getRankIcon()}</View>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {username?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.username, isCurrentUser && styles.currentUserText]}>
          {username || 'Anonymous'}
          {isCurrentUser && ' (You)'}
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={12} color="#F97316" />
            <Text style={styles.statText}>{streakCount}d</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="barbell" size={12} color="#10B981" />
            <Text style={styles.statText}>{totalWorkouts}</Text>
          </View>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreValue}>{Math.round(consistencyScore)}</Text>
        <Text style={styles.scoreLabel}>pts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  currentUser: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
  },
  rankNumber: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '600',
  },
  currentUserText: {
    color: '#10B981',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    color: '#10B981',
    fontSize: 20,
    fontWeight: '700',
  },
  scoreLabel: {
    color: '#64748B',
    fontSize: 11,
  },
});
