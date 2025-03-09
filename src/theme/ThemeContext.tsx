// src/theme/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';
import {ColorValue, useColorScheme} from 'react-native';

export interface Theme {
  shadow: ColorValue | undefined;
  subText: ColorValue | undefined;
  background: ColorValue | undefined;
  text: ColorValue | undefined;
  textSecondary: ColorValue | undefined;
  primary: ColorValue | undefined;
  card: ColorValue | undefined;
  border: ColorValue | undefined;
  primaryBtn: ColorValue | undefined;
  SecondaryBtn: ColorValue | undefined;
  primaryText: ColorValue | undefined;
  primaryLightText: ColorValue | undefined;
  disable: ColorValue | undefined;
  white: ColorValue | undefined;
  light: ColorValue | undefined;
  error: ColorValue | undefined;
  buttonBackground: ColorValue | undefined;
  buttonBackgroundDisabled: ColorValue | undefined;
  placeHolder: ColorValue | undefined;
  headerBackBackground: ColorValue | undefined;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const LightTheme: Theme = {
  background: '#FFFFFF',
  text: '#FFFFFF',
  primaryText: '#000000',
  primaryLightText: '#FFF7EE',
  primary: '#FF8000',
  primaryBtn: '#133761',
  SecondaryBtn: '#FFF7EE',
  card: '#ffffff',
  border: '#DDDDDD',
  textSecondary: '#7C7D89',
  light: '#CCCDD3',
  disable: '#F6F6F6',
  white: '#fff',
  subText: '#000000',
  shadow: '#8e8e93',
  error: '#FF4D4F',
  buttonBackground: '#133761',
  placeHolder: '#CCCCCC',
  buttonBackgroundDisabled: '#13376199',
  headerBackBackground: '#E9E6E6',
};

// const DarkTheme: Theme = {
//   background: '#000000',
//   text: '#000000',
//   primaryText: '#FFFFFF',
//   primaryLightText: '#333333',
//   primary: '#FF8000',
//   primaryBtn: '#FF8000',
//   SecondaryBtn: '#FFF7EE',
//   card: '#1F1F1F',
//   border: '#333333',
//   textSecondary: '#A1A1A1',
//   light: '#EBEBEB',
//   disable: '#3C3C3C',
//   white: '#FFFFFF',
//   subText: '#8e8e93',
//   shadow: '#8e8e93',
//   error: '#FF4D4F',
// };

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'light');

  // const theme = useMemo(
  //   () => (isDarkMode ? DarkTheme : LightTheme),
  //   [isDarkMode],
  // );

  const theme = LightTheme;

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
