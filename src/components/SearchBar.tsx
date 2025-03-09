import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {SEARCH, CLOSE_ICON} from '@assets/svg'; // Ensure you have these SVGs
import {Colors} from '@constants/Colors';
import TextInput from './react-native-override-components/TextInput';

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  customStyle?: {
    TextInputStyle?: StyleProp<TextStyle>;
    container?: StyleProp<ViewStyle>;
  };
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onClear,
  customStyle,
  ...rest
}) => {
  return (
    <View style={[styles.container, customStyle?.container]}>
      <SvgXml xml={SEARCH} width={18} height={18} style={styles.icon} />
      <TextInput
        {...rest}
        style={[styles.input, customStyle?.TextInputStyle]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textPlaceholder}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onClear} style={styles.clearButton}>
        <SvgXml xml={CLOSE_ICON} width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 30,
    paddingHorizontal: 12,
    height: 52,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 14,
    color: Colors.textDefault,
  },
  clearButton: {
    marginLeft: 8,
  },
});

export default SearchBar;
