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
      {/* Left Icon */}
      {leftIcon ? (
        <TouchableOpacity
          style={[styles.iconButton, {alignItems: 'flex-start'}]}
          onPress={onPressLeft}>
          <SvgXml width={20} height={20} xml={leftIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      {/* Centered Title & Subtitle */}
      <View style={styles.textContainer}>
        {heading ? <Text style={styles.title}>{heading}</Text> : null}
        {subHeading ? <Text style={styles.subTitle}>{subHeading}</Text> : null}
      </View>

      {/* Right Icon */}
      {rightIcon ? (
        <TouchableOpacity style={styles.iconButton} onPress={onPressRight}>
          <SvgXml width={24} height={24} xml={rightIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 15,
    height: 60,
  },
  tabletContainer: {
    paddingHorizontal: 32,
  },
  textContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
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
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
  },
});

export default Header;
