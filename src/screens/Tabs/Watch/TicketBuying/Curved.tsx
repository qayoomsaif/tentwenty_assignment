import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path, Text, Defs, LinearGradient, Stop} from 'react-native-svg';
import {Colors} from '@constants/Colors';
import {Fonts} from '@constants/Fonts';
import {width} from '@utils/resizeUtils';

const CURVE_HEIGHT = 60;
const PADDING_HORIZONTAL = 40;
const svgWidth = width - PADDING_HORIZONTAL;

const Curved: React.FC = () => {
  const pathD = `M 0 ${CURVE_HEIGHT} Q ${
    svgWidth / 2
  } 0 ${svgWidth} ${CURVE_HEIGHT} V 100 H 0 Z`;

  return (
    <View style={styles.container}>
      <Svg width={svgWidth} height={CURVE_HEIGHT + 20}>
        {/* Gradient Definition */}
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={Colors.blueAccent} stopOpacity={0.2} />
            <Stop offset="100%" stopColor="#F8F9FA" stopOpacity={0.2} />
          </LinearGradient>
        </Defs>

        {/* Curved Path */}
        <Path
          d={pathD}
          fill="url(#gradient)"
          stroke={Colors.blueAccent}
          strokeWidth={1}
        />

        {/* Screen Label */}
        <Text
          x={svgWidth / 2}
          y={CURVE_HEIGHT - 5}
          fontSize={10}
          fontFamily={Fonts.one.Regular}
          fontWeight="500"
          textAnchor="middle"
          fill={Colors.textDark}>
          SCREEN
        </Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    paddingTop: 20,
  },
});

export default Curved;
