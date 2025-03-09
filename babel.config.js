module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@config': './src/config',
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@schemas': './src/schemas',
          '@screens': './src/screens',
          '@services': './src/services',
          '@theme': './src/theme',
          '@redux': './src/redux',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
