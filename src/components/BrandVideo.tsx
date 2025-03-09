import { useFocusEffect } from '@react-navigation/native'
import React, { useRef, useState, useEffect } from 'react'
import { AppState, StyleSheet } from 'react-native'
import { Video, VideoRef } from 'react-native-video'



const BrandVideo = () => {
  const videoRef = useRef<VideoRef>(null)
  const background = require("../assets/videos/sorav1loop.mp4")
  const [isPaused, setIsPaused] = useState(false)

  useFocusEffect(React.useCallback(() => {
    setIsPaused(false);
    return () => {
      setIsPaused(true)
    }
  }, []))

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        setIsPaused(false);
      } else {
        setIsPaused(true);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <Video
      source={background}
      ref={videoRef}
      style={styles.backgroundVideo}
      paused={isPaused}
      repeat={true}
      onReadyForDisplay={() => setIsPaused(false)}
    />
  )
}


// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
});


export default BrandVideo
