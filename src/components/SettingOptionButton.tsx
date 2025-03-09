import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from './index';

interface SettingOptionButtonProps {
  text?: string;
  Icon?: any;
  textColor?: string;
  onPress?: () => void;
}

const SettingOptionButton = ({
  text,
  Icon,
  textColor,
  onPress,
}: SettingOptionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={textColor === 'disabled'}
      style={styles.main}>
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              {
                color:
                  textColor === 'black'
                    ? '#000000'
                    : textColor === 'disabled'
                    ? '#CCCCCC'
                    : '#FF0000',
              },
            ]}>
            {text}
          </Text>
        </View>
        <View
          style={[
            styles.iconContainer,
            {opacity: textColor === 'disabled' ? 0.5 : 1},
          ]}>
          {Icon}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingOptionButton;

const styles = StyleSheet.create({
  main: {
    marginTop: 16,
  },
  container: {
    flexDirection: 'row',
    
    height: 64,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 5,
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    fontSize: 13,
    fontWeight: '400',
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
