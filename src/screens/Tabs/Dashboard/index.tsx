import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {globalStyles} from '@constants/index';
import LinearGradient from 'react-native-linear-gradient';
import {
  NativeStackScreenProps,
  RootStackParamList,
  SCREENS,
} from '@navigation/index';
type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard: React.FC<ScreenProps> = ({route, navigation}) => {
  return (
    <View style={globalStyles.container}>
      <LinearGradient
        colors={['#0A0A0A', '#1A1A1A']}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default Dashboard;
