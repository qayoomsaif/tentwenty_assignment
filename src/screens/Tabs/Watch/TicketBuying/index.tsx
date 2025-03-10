import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@constants/index';
import {BACK} from '@assets/svg';
import {Header} from '@components/index';
import SeatingChart from '../../../../components/SeatingChart';
import SeatSelection from './SeatSelection';
import {NativeStackScreenProps, RootStackParamList} from '@navigation/index';
import Curved from './Curved';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'TicketBuying'>;

const TicketBuying: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        heading="The King's Man"
        leftIcon={BACK}
        onPressLeft={navigation.goBack}
        subHeading="In Theaters December 22, 2021"
      />

      <View style={styles.seatingChartContainer}>
        <Curved />
        <SeatingChart style={styles.seatingChartStyle} />
      </View>
      <View style={{position: 'absolute', bottom: 10, left: 20, right: 30}}>
        <SeatSelection />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  seatingChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  seatingChartStyle: {
    width: 3.5,
    height: 14,
    margin: 3.7,
  },
});

export default TicketBuying;
