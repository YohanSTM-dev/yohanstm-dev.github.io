import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${size}`]];
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.buttonPrimary];
      case 'secondary':
        return [...baseStyle, styles.buttonSecondary];
      case 'outline':
        return [...baseStyle, styles.buttonOutline];
      case 'danger':
        return [...baseStyle, styles.buttonDanger];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`text_${size}`]];
    
    if (variant === 'outline') {
      return [...baseStyle, styles.textOutline];
    }
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[
        ...getButtonStyle(),
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <>
          {icon}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    gap: 8,
  },
  button_sm: {
    height: 36,
    paddingHorizontal: 12,
  },
  button_md: {
    height: 48,
    paddingHorizontal: 20,
  },
  button_lg: {
    height: 56,
    paddingHorizontal: 24,
  },
  buttonPrimary: {
    backgroundColor: '#10B981',
  },
  buttonSecondary: {
    backgroundColor: '#3B82F6',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#10B981',
  },
  buttonDanger: {
    backgroundColor: '#F43F5E',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
  textOutline: {
    color: '#10B981',
  },
});
