import { Colors } from '@constants/Colors'
import React from 'react'
import { StyleSheet, View, Text, Modal } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'

const Progress: React.FC<{
  progress: number,
  progressText?: string
}> = ({
  progress = .25,
  progressText = "25%"
}) => {
    return (

      <View style={styles.container}>
        <ProgressCircle
          style={{
            width: 250,
            height: 250,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          progress={progress}
          progressColor={Colors.infoBlue}
          backgroundColor={Colors.neutralGrey}
          startAngle={ -Math.PI * 0.75 }
          endAngle={ Math.PI * 0.75 }
          strokeWidth={12}
        />
        <View>
          <Text style={styles.progressText}>{progressText}</Text>
        </View>
      </View>

    )
  }

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 250,
    width: 250
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textWhite,
    width: 125,
    textAlign: 'center'
  }

})

export default Progress
