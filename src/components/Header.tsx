import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {tablet} from '../utils/resizeUtils';
import {SvgXml} from 'react-native-svg';
import {Colors} from '@constants/index';
import {Text} from '@components/index';

interface HeaderProps {
  leftIcon?: string;
  onPressLeft?: () => void;
  rightIcon?: string;
  onPressRight?: () => void;
  heading?: string;
  subHeading?: string;
}

const Header: React.FC<HeaderProps> = ({
  leftIcon,
  onPressLeft,
  rightIcon,
  onPressRight,
  heading,
  subHeading,
}) => {
  const isTablet = tablet();

  return (
    <View style={[styles.container, isTablet && styles.tabletContainer]}>
      {leftIcon ? (
        <TouchableOpacity style={styles.initialsButton} onPress={onPressLeft}>
          <SvgXml width={20} height={20} xml={leftIcon} />
        </TouchableOpacity>
      ) : null}

      <View style={styles.textContainer}>
        {heading ? <Text style={styles.title}>{heading}</Text> : null}
        {subHeading ? <Text style={styles.subTitle}>{subHeading}</Text> : null}
      </View>

      {rightIcon ? (
        <TouchableOpacity style={styles.addButton} onPress={onPressRight}>
          <SvgXml width={'24'} height={'24'} xml={rightIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    paddingHorizontal: Platform.OS === 'ios' ? 20 : 20, // Adjust padding for iOS and Android
    paddingBottom: Platform.OS === 'ios' ? 20 : 15, // Adjust bottom padding for iOS and Android
    // shadowColor: Colors.shadowDark, // iOS shadow color
    // shadowOffset: {width: 0, height: 2}, // iOS shadow offset
    // shadowOpacity: 0.2, // iOS shadow opacity
    // shadowRadius: 5, // iOS shadow radius
    // elevation: Platform.OS === 'android' ? 4 : 0, // Android shadow (elevation)
  },
  tabletContainer: {
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textBlack,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.textBlueQuaternary,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsButton: {
    // backgroundColor: Colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    // alignItems: 'center',
    width: 48,
    height: 48,
  },
});

export default Header;
