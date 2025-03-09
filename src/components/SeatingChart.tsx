import {SEATS_AVAILABLE, SEATS_UNAVAILABLE} from '@assets/svg';
import {Colors} from '@constants/Colors';
import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {SvgXml} from 'react-native-svg';
interface Seat {
  key: 'seat' | 'empty';
  status?: 'available' | 'selected' | 'sell';
}

interface Column {
  id: string;
  seats: Seat[][];
}

interface SeatingChartProps {
  style?: ViewStyle;
}

const cinemaSeats: Column[] = [
  {
    id: 'left',
    seats: [...Array(10)].map((_, row) =>
      Array(5)
        .fill(null)
        .map((_, i) =>
          (row == 0 && i < 3) ||
          ((row == 1 || row == 2 || row == 3 || row == 4) && i < 1)
            ? {key: 'empty'}
            : {key: 'seat', status: 'available'},
        ),
    ),
  },
  {
    id: 'center',
    seats: [...Array(10)].map((_, row) =>
      Array(20)
        .fill(null)
        .map((_, i) => ({
          key: 'seat',
          status: i % 2 == 0 ? 'sell' : 'available',
        })),
    ),
  },
  {
    id: 'right',
    seats: [...Array(10)].map((_, row) =>
      Array(5)
        .fill(null)
        .map((_, i) =>
          (row == 0 && i > 1) ||
          ((row == 1 || row == 2 || row == 3 || row == 4) && i > 3)
            ? {key: 'empty'}
            : {key: 'seat', status: 'available'},
        ),
    ),
  },
];

const SeatingChart: React.FC<SeatingChartProps> = ({style}) => {
  const [seats, setSeats] = useState(cinemaSeats);

  const toggleSeatSelection = (
    columnIndex: number,
    rowIndex: number,
    seatIndex: number,
  ) => {
    setSeats(prevSeats =>
      prevSeats.map((column, colIdx) =>
        colIdx !== columnIndex
          ? column
          : {
              ...column,
              seats: column.seats.map((row, rIdx) =>
                rIdx !== rowIndex
                  ? row
                  : row.map((seat, sIdx) =>
                      sIdx !== seatIndex ||
                      seat.key === 'empty' ||
                      seat.status === 'sell'
                        ? seat
                        : {
                            ...seat,
                            status:
                              seat.status === 'selected'
                                ? 'available'
                                : 'selected',
                          },
                    ),
              ),
            },
      ),
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.seatingContainer}>
        {seats.map((column, columnIndex) => (
          <View key={column.id} style={styles.column}>
            {column.seats.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((seat, seatIndex) => (
                  <TouchableOpacity
                    key={seatIndex}
                    style={[styles.seat, styles[seat.status || ''], style]}
                    onPress={() =>
                      toggleSeatSelection(columnIndex, rowIndex, seatIndex)
                    }
                    disabled={seat.status === 'sell' || seat.key === 'empty'}>
                    {seat.key !== 'empty' && (
                      <SvgXml
                        xml={
                          seat.status === 'sell'
                            ? SEATS_UNAVAILABLE
                            : SEATS_AVAILABLE
                        }
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: 10,
  },
  screenText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  seatingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  seat: {
    width: 2,
    height: 5,
    margin: 3,
    borderRadius: 4,
  },
  available: {
    // backgroundColor: '#ADD8E6',
  },
  selected: {
    // backgroundColor: '#FFD700',
  },
  sell: {
    // backgroundColor: '#FF0000',
  },
  empty: {
    // backgroundColor: 'transparent',
  },
});

export default SeatingChart;
