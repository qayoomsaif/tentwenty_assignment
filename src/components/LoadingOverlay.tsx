import React from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'


const LoadingOverlay = () => {
  return (
  <View style={{
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    alignItems: 'center'
    }} >
      <ActivityIndicator />
  </View>)
}


export default LoadingOverlay
