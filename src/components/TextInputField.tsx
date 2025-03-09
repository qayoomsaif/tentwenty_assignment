import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {activeTick, eye, inactiveTick} from '../assets/svg/index';
import {Colors, Fonts} from '@constants/index';
import {Text} from '@components/index';

interface TextInputFieldProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValueValid = value.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, isFocused && styles.focused]}>
        <RNTextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={Colors.textPlaceholder}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <SvgXml width={22} height={15} xml={eye} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <SvgXml
            width={22}
            height={15}
            xml={isValueValid ? activeTick : inactiveTick}
            style={styles.icon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.textBlack,
    marginBottom: 5,
    fontFamily: Fonts.one.Regular,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 56,
    backgroundColor: Colors.backgroundGreyLight,
  },
  focused: {
    borderColor: Colors.primaryColor,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textBlack,
    fontFamily: Fonts.one.Regular,
  },
  icon: {
    marginLeft: 10,
  },
});

export default TextInputField;
