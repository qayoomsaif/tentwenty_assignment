import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {Colors} from '@constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {setAnimationIndex} from '@redux/slices/indefiniteLoader';

const statusMessages = [
  '🤔 Analyzing the image...',
  '🔍 Looking for details...',
  '📊 Almost done! Finalizing results...',
];

const lottieAnimations = [
  require('../assets/lottie/loadingAnim5.json'),
  require('../assets/lottie/loadingAnim6.json'),
  require('../assets/lottie/loadingAnim4.json'),
  require('../assets/lottie/loadingAnim3.json'),
  require('../assets/lottie/loadingAnim2.json'),
];

const IndefiniteLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  const {animationIndex} = useSelector(state => state.indefiniteLoader);
  const dispatch = useDispatch();

  const pulseAnim = useRef(new Animated.Value(1)).current; // ✅For pulsing effect

  // Cycle through messages every 3 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % statusMessages.length);
    }, 2500);

    return () => clearInterval(messageInterval);
  }, []);

  // Pulsing effect for the message
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    return () => {
      const ni = (animationIndex + 1) % lottieAnimations.length;
      console.log({animationIndex, ni, len: lottieAnimations.length});
      dispatch(setAnimationIndex(ni));
    };
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={lottieAnimations[animationIndex]}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Animated.Text style={[styles.text, {transform: [{scale: pulseAnim}]}]}>
        {statusMessages[messageIndex]}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lottie: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 15,
    color: Colors.textWhite,
  },
});

export default IndefiniteLoader;
