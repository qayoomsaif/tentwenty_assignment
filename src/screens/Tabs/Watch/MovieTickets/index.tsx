import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@constants/index';
import {BACK} from '@assets/svg';
import {Button, Header, Text} from '@components/index';
import SeatingChart from '../../../../components/SeatingChart';
import {ScrollView} from 'react-native-gesture-handler';
import {
  NativeStackScreenProps,
  RootStackParamList,
  SCREENS,
} from '@navigation/index';
import {memo} from 'react';
import {width} from '@utils/resizeUtils';

interface Showtime {
  time: string;
  hall: string;
  price: string;
  bonus: string;
}

const showtimes: Showtime[] = [
  {time: '12:30', hall: 'Cinetch + Hall 1', price: '50$', bonus: '2500'},
  {time: '13:30', hall: 'Cinetch + Hall 2', price: '75$', bonus: '3000'},
];

const dates = ['5 Mar', '6 Mar', '7 Mar', '8 Mar', '9 Mar'];

const CARD_WIDTH = width * 0.8;

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'MovieTickets'>;

const MovieTickets: React.FC<ScreenProps> = ({route, navigation}) => {
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedShowtime, setSelectedShowtime] = useState(0);

  const handleDateSelection = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const handleShowtimeSelection = useCallback((index: number) => {
    setSelectedShowtime(index);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        heading="The King's Man"
        leftIcon={BACK}
        onPressLeft={navigation.goBack}
        subHeading="In Theaters December 22, 2021"
      />

      <View>
        {/* Date Selection */}
        <Text style={styles.sectionTitle}>Date</Text>
        <ScrollView
          horizontal
          style={{height: 50}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateContainer}>
          {dates.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.dateButton,
                selectedDate === item && styles.selectedDate,
              ]}
              onPress={() => handleDateSelection(item)}>
              <Text
                style={[
                  styles.dateText,
                  selectedDate === item && styles.selectedDateText,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Showtime Selection */}
        <FlatList
          data={showtimes}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={2}
          getItemLayout={(_, index) => ({
            length: CARD_WIDTH,
            offset: CARD_WIDTH * index,
            index,
          })}
          contentContainerStyle={{...styles.showtimeContainer, flexGrow: 1}}
          renderItem={({item, index}) => (
            <View style={[styles.Card, {width: CARD_WIDTH}]}>
              <Text style={styles.showtimeText}>
                {item.time} <Text style={styles.hallText}>{item.hall}</Text>
              </Text>

              <TouchableOpacity
                style={[
                  styles.showtimeCard,
                  {
                    borderColor:
                      selectedShowtime === index
                        ? Colors.blueAccent
                        : Colors.borderGrey,
                  },
                ]}
                onPress={() => handleShowtimeSelection(index)}>
                <View style={styles.seatingChartContainer}>
                  <MemoizedSeatingChart />
                </View>
              </TouchableOpacity>
              <Text style={styles.priceText}>
                From <Text style={styles.hallText}>{item.price}</Text> or{' '}
                <Text style={styles.hallText}>{item.bonus}</Text> bonus
              </Text>
            </View>
          )}
        />
      </View>

      <Button
        style={styles.selectButton}
        title="Select Seats"
        onPress={() => navigation.navigate(SCREENS.TicketBuying)}
      />
    </SafeAreaView>
  );
};

const MemoizedSeatingChart = memo(SeatingChart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 50,
    fontWeight: 'bold',
    padding: 16,
  },
  dateContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    height: 50,
  },
  dateButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.backgroundGreyLight,
  },
  selectedDate: {backgroundColor: Colors.blueAccent},
  dateText: {
    fontSize: 14,
  },
  selectedDateText: {
    color: Colors.textWhite,
  },
  showtimeContainer: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  Card: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingLeft: 20,
    height: 240,
    marginTop: 50,
  },
  showtimeCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  showtimeText: {
    fontSize: 16,
    marginBottom: 6,
  },
  hallText: {
    fontSize: 14,
    color: Colors.textDark,
  },
  priceText: {
    fontSize: 14,
    marginTop: 6,
  },
  seatingChartContainer: {
    height: 120,
    justifyContent: 'center',
  },
  selectButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '90%',
    marginHorizontal: 20,
    borderRadius: 8,
  },
});

export default MovieTickets;
