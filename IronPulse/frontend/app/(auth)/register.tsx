import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { useAuthStore } from '../../src/store/authStore';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, loading } = useAuthStore();

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert('Erreur', 'Remplis tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit faire au moins 6 caractères');
      return;
    }

    const { error } = await signUp(email, password, username);
    if (error) {
      Alert.alert('Échec de l’inscription', error);
    } else {
      Alert.alert(
        'Compte créé',
        'Un e-mail de vérification vient de vous être envoyé Par mail. Merci de valider votre compte.',
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
              Rejoins IronPulse et démarre ton parcours forme
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Nom d’utilisateur"
              placeholder="Choisis un pseudo"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              icon="person-outline"
            />

            <Input
              label="E-mail"
              placeholder="Entrez votre e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />

            <Input
              label="Mot de passe"
              placeholder="Crée un mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            <Input
              label="Confirme le mot de passe"
              placeholder="Confirme ton mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            <Button
              title="Créer le compte"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />
          </View>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Déjà un compte ?</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.loginLink}> Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  form: {
    marginBottom: 32,
  },
  registerButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#64748B',
    fontSize: 14,
  },
  loginLink: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
});
