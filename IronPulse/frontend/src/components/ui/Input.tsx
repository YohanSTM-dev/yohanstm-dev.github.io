import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && (
          <Ionicons name={icon} size={20} color="#64748B" style={styles.icon} />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor="#64748B"
          secureTextEntry={isSecure}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Ionicons
              name={isSecure ? 'eye-off' : 'eye'}
              size={20}
              color="#64748B"
            />
          </TouchableOpacity>
        )}
        {rightIcon && onRightIconPress && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons name={rightIcon} size={20} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    minHeight: 52,
  },
  inputError: {
    borderColor: '#F43F5E',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 16,
    paddingVertical: 14,
  },
  errorText: {
    color: '#F43F5E',
    fontSize: 12,
    marginTop: 4,
  },
});
