import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import {Text} from '@components/index';
import {Colors, Fonts} from '@constants/index';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  isPrimary?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isPrimary = true,
  disabled = false,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabledButton,
      ]}
      disabled={disabled}
      onPress={onPress}
      {...rest}>
      <Text style={isPrimary ? styles.primaryText : styles.secondaryText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 8,
  },
  primary: {
    backgroundColor: Colors.primary, // Assuming Colors.primary is defined in @constants/index
  },
  secondary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  primaryText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.one.bold, // Assuming Fonts.One.Bold is defined
  },
  secondaryText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: Fonts.one.SemiBold, // Assuming Fonts.One.SemiBold is defined
  },
  disabledButton: {
    backgroundColor: Colors.buttonDisabled, // Add this to your Colors constants
    borderColor: Colors.borderDisabled, // Add this to your Colors constants
  },
});

export default CustomButton;
