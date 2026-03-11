import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';

export default function ProfileScreen() {
  const { profile, user, signOut, updateProfile, loading } = useAuthStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [username, setUsername] = useState(profile?.username || '');
  const [fullName, setFullName] = useState(profile?.full_name || '');

  const[joursConsecutifs,setJoursConsecutifs] = useState(0);


  const incrementerJoursConsecutifs = () => {
    setJoursConsecutifs(prev => prev + 1);
  }

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const handleUpdateProfile = async () => {
    const { error } = await updateProfile({
      username: username.trim() || undefined,
      full_name: fullName.trim() || undefined,
    });

    if (error) {
      Alert.alert('Error', error);
    } else {
      setShowEditModal(false);
      Alert.alert('Success', 'Profile updated!');
    }
  };

  const stats = [
    {
      icon: 'flame',
      color: '#F97316',
      value: profile?.streak_count || 0,
      label: 'Current Streak',
    },
    {
      icon: 'trophy',
      color: '#FBBF24',
      value: profile?.longest_streak || 0,
      label: 'Best Streak',
    },
    {
      icon: 'barbell',
      color: '#10B981',
      value: profile?.total_workouts || 0,
      label: 'Total Workouts',
    },
    {
      icon: 'star',
      color: '#3B82F6',
      value: Math.round(profile?.consistency_score || 0),
      label: 'Consistency',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => setShowEditModal(true)}
          >
            <Ionicons name="settings-outline" size={24} color="#F8FAFC" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(profile?.username || user?.email || '?')
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editAvatarBtn}
              onPress={() => setShowEditModal(true)}
            >
              <Ionicons name="pencil" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>
            {profile?.full_name || profile?.username || 'Athlete'}
          </Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>

          {profile?.username && (
            <View style={styles.usernameTag}>
              <Text style={styles.usernameText}>@{profile.username}</Text>
            </View>
          )}
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <View
                style={[
                  styles.statIconBg,
                  { backgroundColor: `${stat.color}20` },
                ]}
              >
                <Ionicons
                  name={stat.icon as any}
                  size={24}
                  color={stat.color}
                />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="bar-chart" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.menuText}>Workout History</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="notifications" size={20} color="#F97316" />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="help-circle" size={20} color="#10B981" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBg}>
              <Ionicons name="shield-checkmark" size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <Button
          title="Sign Out"
          onPress={handleSignOut}
          variant="danger"
          style={styles.signOutBtn}
          icon={<Ionicons name="log-out-outline" size={20} color="#fff" />}
        />

        {/* Version */}
        <Text style={styles.version}>IronPulse v1.0.0</Text>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Ionicons name="close" size={24} color="#F8FAFC" />
              </TouchableOpacity>
            </View>

            <Input
              label="Username"
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              icon="at"
            />

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              icon="person-outline"
            />

            <Button
              title="Save Changes"
              onPress={handleUpdateProfile}
              loading={loading}
              style={styles.modalButton}
            />


          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Incrementer les jours consécutifs pour tester */}
      <Button
        title =" Cliquer ici pour incrementer les jours"
        onPress={incrementerJoursConsecutifs}
      />

      <Input
        label="Jours consécutifs"
        value={joursConsecutifs.toString()}
        editable={false}
      />
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
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#1E293B',
  },
  profileName: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
  },
  profileEmail: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 4,
  },
  usernameTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  usernameText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  statIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 16,
    marginLeft: 12,
  },
  signOutBtn: {
    marginBottom: 16,
  },
  version: {
    color: '#475569',
    fontSize: 12,
    textAlign: 'center',
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
