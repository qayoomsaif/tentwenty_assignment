import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {SEATS_AVAILABLE, SEATS_UNAVAILABLE, SEATS_VIP} from '@assets/svg';
import {Colors} from '@constants/Colors';
import {Button, Text} from '@components/index';

const REGULAR_SEAT_PRICE = 50;
const MAX_SEATS = 3;

const SeatSelection: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<number>(1);
  const totalPrice = selectedSeats * REGULAR_SEAT_PRICE;

  return (
    <View style={styles.container}>
      {/* Seat Legend */}
      <View style={styles.legendContainer}>
        <LegendItem label="Selected" />
        <LegendItem label="Not available" />
        <LegendItem label="VIP ($150)" />
        <LegendItem label="Regular ($50)" />
      </View>

      {/* Seat Selection Info */}
      <View style={styles.selectionRow}>
        <Text style={styles.selectionText}>
          {selectedSeats} / <Text style={styles.rowText}>{MAX_SEATS} row</Text>
        </Text>
        <TouchableOpacity
          onPress={() => setSelectedSeats(0)}
          style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        {/* Total Price Box */}
        <View style={styles.bottomButton}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>

        {/* Proceed to Pay Button */}
        <Button
          style={[styles.bottomButton, styles.payButton]}
          title="Proceed to pay"
          onPress={() => console.log('Proceed to pay')}
        />
      </View>
    </View>
  );
};

interface LegendItemProps {
  label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({label}) => (
  <View style={styles.legendItem}>
    <SvgXml
      xml={
        label == 'Selected'
          ? SEATS_AVAILABLE
          : label == 'Not available'
          ? SEATS_UNAVAILABLE
          : label == 'VIP ($150)'
          ? SEATS_VIP
          : SEATS_AVAILABLE
      }
      height={18}
      width={18}
    />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '45%',
  },
  legendText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
    color: Colors.textDark,
  },
  selectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundGreyLight,
    width: 120,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  selectionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textDefault,
  },
  rowText: {
    fontSize: 10,
  },
  closeButton: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  closeText: {
    fontSize: 16,
    color: '#333',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    backgroundColor: Colors.backgroundGreyLight,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
  },
  payButton: {
    backgroundColor: Colors.blueAccent,
    width: '65%',
  },
  totalLabel: {
    fontSize: 10,
    color: Colors.textDefault,
  },
  totalPrice: {
    fontSize: 15,
    color: Colors.textDefault,
  },
  payButtonText: {
    fontSize: 16,
    color: Colors.white,
  },
});

export default SeatSelection;
