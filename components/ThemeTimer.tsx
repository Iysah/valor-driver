import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemeText from './ThemeText';

const ThemeTimer = ({ initialMinutes = 0, initialSeconds = 30 }) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [seconds]);
  return (
    <View>
        {
            seconds > 0 ? (
                <ThemeText type='secondaryNormalText' style={styles.timerText}>
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </ThemeText>
            ) : (
                <ThemeText type='header' style={{fontSize: 16}}>Resend</ThemeText>
            )
        }
    </View>
  )
}

export default ThemeTimer

const styles = StyleSheet.create({
    timerText: {
        fontSize: 16,
        // color: '#333',
      },
})