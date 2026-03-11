import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSocialStore } from '../../src/store/socialStore';
import { useAuthStore } from '../../src/store/authStore';
import { LeaderboardItem } from '../../src/components/social/LeaderboardItem';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';

export default function SocialScreen() {
  const {
    leaderboard,
    groups,
    fetchLeaderboard,
    fetchGroups,
    createGroup,
    joinGroup,
    loading,
  } = useSocialStore();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'leaderboard' | 'groups'>(
    'leaderboard'
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([fetchLeaderboard(), fetchGroups()]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    const group = await createGroup(groupName.trim(), groupDescription.trim());
    if (group) {
      Alert.alert(
        'Group Created!',
        `Share this invite code with friends: ${group.invite_code}`
      );
      setShowCreateModal(false);
      setGroupName('');
      setGroupDescription('');
    }
  };

  const handleJoinGroup = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }

    const { error } = await joinGroup(inviteCode.trim());
    if (error) {
      Alert.alert('Error', error);
    } else {
      Alert.alert('Success', 'You have joined the group!');
      setShowJoinModal(false);
      setInviteCode('');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Social</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'leaderboard' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Ionicons
            name="trophy"
            size={18}
            color={activeTab === 'leaderboard' ? '#10B981' : '#64748B'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'leaderboard' && styles.tabTextActive,
            ]}
          >
            Leaderboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groups' && styles.tabActive]}
          onPress={() => setActiveTab('groups')}
        >
          <Ionicons
            name="people"
            size={18}
            color={activeTab === 'groups' ? '#10B981' : '#64748B'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'groups' && styles.tabTextActive,
            ]}
          >
            Groups
          </Text>
        </TouchableOpacity>
      </View>

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
        {activeTab === 'leaderboard' ? (
          <>
            {/* Leaderboard Info */}
            <Card style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <Text style={styles.infoText}>
                  Ranking based on consistency score. Keep your streak going!
                </Text>
              </View>
            </Card>

            {/* Leaderboard List */}
            {leaderboard.length === 0 ? (
              <Card>
                <View style={styles.emptyState}>
                  <Ionicons name="trophy-outline" size={48} color="#334155" />
                  <Text style={styles.emptyText}>
                    No leaderboard data yet. Complete workouts to rank up!
                  </Text>
                </View>
              </Card>
            ) : (
              leaderboard.map((entry) => (
                <LeaderboardItem
                  key={entry.id}
                  rank={entry.rank}
                  username={entry.username || 'Anonymous'}
                  consistencyScore={entry.consistency_score}
                  streakCount={entry.streak_count}
                  totalWorkouts={entry.total_workouts}
                  isCurrentUser={entry.id === user?.id}
                />
              ))
            )}
          </>
        ) : (
          <>
            {/* Group Actions */}
            <View style={styles.groupActions}>
              <Button
                title="Create Group"
                onPress={() => setShowCreateModal(true)}
                style={styles.groupActionBtn}
                icon={<Ionicons name="add" size={20} color="#fff" />}
              />
              <Button
                title="Join Group"
                onPress={() => setShowJoinModal(true)}
                variant="outline"
                style={styles.groupActionBtn}
                icon={<Ionicons name="enter-outline" size={20} color="#10B981" />}
              />
            </View>

            {/* Groups List */}
            {groups.length === 0 ? (
              <Card>
                <View style={styles.emptyState}>
                  <Ionicons name="people-outline" size={48} color="#334155" />
                  <Text style={styles.emptyText}>
                    You're not in any groups yet. Create one or join with an
                    invite code!
                  </Text>
                </View>
              </Card>
            ) : (
              groups.map((group) => (
                <Card key={group.id} style={styles.groupCard}>
                  <View style={styles.groupHeader}>
                    <View style={styles.groupIcon}>
                      <Ionicons name="people" size={24} color="#3B82F6" />
                    </View>
                    <View style={styles.groupInfo}>
                      <Text style={styles.groupName}>{group.name}</Text>
                      {group.description && (
                        <Text style={styles.groupDescription}>
                          {group.description}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.groupFooter}>
                    <View style={styles.inviteCodeContainer}>
                      <Text style={styles.inviteCodeLabel}>Invite Code:</Text>
                      <Text style={styles.inviteCode}>{group.invite_code}</Text>
                    </View>
                  </View>
                </Card>
              ))
            )}
          </>
        )}
      </ScrollView>

      {/* Create Group Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Group</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Ionicons name="close" size={24} color="#F8FAFC" />
              </TouchableOpacity>
            </View>

            <Input
              label="Group Name"
              placeholder="Enter group name"
              value={groupName}
              onChangeText={setGroupName}
              icon="people-outline"
            />

            <Input
              label="Description (Optional)"
              placeholder="What's this group about?"
              value={groupDescription}
              onChangeText={setGroupDescription}
              icon="document-text-outline"
            />

            <Button
              title="Create Group"
              onPress={handleCreateGroup}
              loading={loading}
              style={styles.modalButton}
            />
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Join Group Modal */}
      <Modal
        visible={showJoinModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowJoinModal(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Join Group</Text>
              <TouchableOpacity onPress={() => setShowJoinModal(false)}>
                <Ionicons name="close" size={24} color="#F8FAFC" />
              </TouchableOpacity>
            </View>

            <Input
              label="Invite Code"
              placeholder="Enter invite code"
              value={inviteCode}
              onChangeText={setInviteCode}
              autoCapitalize="characters"
              icon="key-outline"
            />

            <Button
              title="Join Group"
              onPress={handleJoinGroup}
              loading={loading}
              style={styles.modalButton}
            />
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
  header: {
    padding: 16,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    gap: 8,
  },
  tabActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  tabText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#10B981',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  infoCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: '#3B82F6',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    flex: 1,
    color: '#94A3B8',
    fontSize: 14,
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
  groupActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  groupActionBtn: {
    flex: 1,
  },
  groupCard: {
    marginBottom: 12,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupInfo: {
    flex: 1,
    marginLeft: 12,
  },
  groupName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
  },
  groupDescription: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 2,
  },
  groupFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  inviteCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteCodeLabel: {
    color: '#64748B',
    fontSize: 12,
  },
  inviteCode: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: 1,
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
});
