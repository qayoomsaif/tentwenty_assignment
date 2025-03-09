import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  TouchableOpacityProps,
} from 'react-native';

import {Colors} from '@constants/index';
import {Text} from '@components/index';
import {SvgXml} from 'react-native-svg';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: string;
  rightIcon?: string;
  onPressLeftIcon?: (event: GestureResponderEvent) => void;
  onPressRightIcon?: (event: GestureResponderEvent) => void;
  iconStyle?: StyleProp<ViewStyle>;
  loadingColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress = () => null,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  onPressLeftIcon,
  onPressRightIcon,
  iconStyle,
  loadingColor = Colors.white,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled || isLoading ? styles.disabled : styles.enabled,
        style,
      ]}
      disabled={disabled || isLoading}
      onPress={onPress}
      activeOpacity={0.9}
      {...rest}>
      {leftIcon && (
        <View style={[styles.iconContainer, iconStyle]}>
          <TouchableOpacity
            disabled={!onPressLeftIcon}
            onPress={onPressLeftIcon}>
            <SvgXml xml={leftIcon} />
          </TouchableOpacity>
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator color={loadingColor} size="small" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}

      {rightIcon && (
        <View style={[styles.iconContainer, iconStyle]}>
          <TouchableOpacity
            disabled={!onPressRightIcon}
            onPress={onPressRightIcon}>
            <SvgXml xml={rightIcon} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  enabled: {
    backgroundColor: Colors.button,
  },
  disabled: {
    backgroundColor: Colors.buttonDisabled,
  },
  buttonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    marginHorizontal: 8,
  },
});
