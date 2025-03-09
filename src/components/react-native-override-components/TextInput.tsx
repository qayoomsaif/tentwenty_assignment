import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import {Colors} from '@constants/Colors';

// Define the type for custom props if needed, extending from TextProps
interface CustomTextProps extends TextInputProps {
  style?: StyleProp<TextStyle>; // Ensure styles can be merged
}

// Custom Text component
const TextInput: React.FC<CustomTextProps> = ({style, ...rest}) => {
  // Flatten the style to extract fontWeight, fontStyle, and fontFamily
  const flattenedStyle = StyleSheet.flatten(style) as TextStyle | undefined;

  // Default values
  const defaultFontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 'ultralight'
    | 'thin'
    | 'light'
    | 'medium'
    | 'regular'
    | 'semibold'
    | 'condensedBold'
    | 'condensed'
    | 'heavy'
    | 'black' = '400';
  // const defaultFontStyle: 'normal' | 'italic' = 'normal'; // Normal style

  // Extract or default to values
  const fontFamily = flattenedStyle?.fontFamily ?? 'Poppins-Regular'; // Use fontFamily from style if provided
  const fontWeight = flattenedStyle?.fontWeight ?? defaultFontWeight;

  // Merge styles with custom fontFamily and the provided style
  return (
    <RNTextInput
      {...rest}
      style={[
        {
          fontFamily: flattenedStyle?.fontFamily ?? fontFamily,
          fontWeight: flattenedStyle?.fontWeight ?? fontWeight,
          lineHeight: flattenedStyle?.lineHeight ?? 18,
          color: flattenedStyle?.color ?? Colors.textDefault,
          fontSize: flattenedStyle?.fontSize ?? 14,
        },
        style, // Ensure custom styles override default ones
      ]}
    />
  );
};

export default React.memo(TextInput);
