import {StyleSheet, Dimensions} from 'react-native';
import {width, wps} from '@utils/resizeUtils';
import {Colors} from '@constants/Colors';
import {Fonts} from './Fonts';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    marginVertical: 5,
  },
  multiSelectContainer: {
    flexDirection: 'row',
    // marginTop: 16,
    flexWrap: 'wrap',
  },
  multiSelectItem: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 5,
    marginRight: 8,
  },
  multiSelectItemText: {
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
  },
  secondaryText: {
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
  },
  subHeadingText: {
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  selectedItem: {
    backgroundColor: '#FFF7EE',
  },
  _button: {
    borderRadius: 8,
    width: width - 32,
    paddingVertical: 16,
  },
});

export const flexContainerStyles = StyleSheet.create({
  dFlexRowCC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dFlexColCC: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export const globalTextStyles = StyleSheet.create({
  h5Bold: {
    fontFamily: Fonts.one.bold,
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 32,
  },
  body2Regular: {
    fontFamily: Fonts.one.Regular,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 20,
  },
  body2Bold: {
    fontFamily: Fonts.one.bold,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,
  },
  body2Medium: {
    fontFamily: Fonts.one.medium,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
  },
  footNoteMedium: {
    fontFamily: Fonts.one.medium,
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 500,
  },
  captionMedium: {
    fontFamily: Fonts.one.medium,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 18,
  },
});
