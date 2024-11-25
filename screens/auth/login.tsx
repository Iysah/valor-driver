import { Dimensions, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import ThemeBackBtn from '@/components/ThemeBackBtn'
import ThemeText from '@/components/ThemeText'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { showToast } from '@/utils/toast'
import Constants from 'expo-constants';
import { GLOBALSTYLES } from '@/styles/global-styles'
import ThemeInput from '@/components/ThemeInput'
import { ArrowForward } from '@/assets/icons/icon'
import { ENDPOINTS } from '@/constants/api';
import axios from 'axios';

const {width} = Dimensions.get('screen')

const Login:FC<any> = ({navigation}) => {
    const [ loading, setLoading ] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showNotification, setShowNotification] = useState(false)
    const initialTime = 60; // 30 seconds for countdown
    const [timeLeft, setTimeLeft] = useState(initialTime);
  
    useEffect(() => {
      if (timeLeft === 0) return; // Stop countdown at 0
  
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
  
      // Cleanup timer on component unmount or reset
      return () => clearInterval(timerId);
    }, [timeLeft]);
  
    const resetTimer = () => {
      setTimeLeft(initialTime); // Restart the timer
    };
    
    async function handleSubmit() {
      try {
        setLoading(true);
        const formattedPhone = '234' + phoneNumber
          .replace(/[^0-9]/g, '');
        
        const response = await axios.post(ENDPOINTS.SEND_LOGIN_OTP, {
          to: formattedPhone
        });

        console.log('Phone number sent:', formattedPhone); // Log the formatted number

        console.log('API Response:', {
          fullResponse: response.data
        });

        if (response.data.status) {
          setShowNotification(true);
          // showToast('success', 'OTP sent successfully');6785
          
          setTimeout(() => {
            setShowNotification(false);
            navigation.navigate('Verify', {
              phoneNumber,
              pinId: response.data.data.pinId
            });
          }, 3000);
          
          resetTimer();
        } else {
          showToast('error', 'Failed to send OTP');
        }
      } catch (error: unknown) {
        console.log('Phone number sent:', phoneNumber); 
        console.error('Login error:', error);
        if (error instanceof Error && 'response' in error) {
          const axiosError = error as { response?: { data: unknown } };
          console.log('Error response:', axiosError.response?.data);
        }
        showToast('error', 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

  return (
    <SafeAreaProvider style={{ backgroundColor: '#fff', position: 'relative', paddingTop: Constants.statusBarHeight }}>
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={10} style={[GLOBALSTYLES.container]}>
        <ScrollView showsVerticalScrollIndicator={false} style={[GLOBALSTYLES.wrapper]}>

          {showNotification && (
            <View style={[styles.notification]}>
                <ThemeText type='primaryNormalText' style={{fontSize: 12}}>A new code has been sent to your Phone number</ThemeText>
            </View>
          )}
            <ThemeBackBtn navigation={navigation} />
            
            <View style={{gap: 4}}>
                <ThemeText type='header'>Login</ThemeText>
                <ThemeText type='primaryNormalText'>Kindly input your details to Login</ThemeText>
            </View>

            <View style={[{marginTop: 40 }]}>
              <ThemeInput value={phoneNumber} setValue={setPhoneNumber} type='tel' label='Phone number' placeholder='80-11x-xxxxx' />
            </View>

            <TouchableOpacity 
              onPress={handleSubmit} 
              disabled={loading || !phoneNumber}
              style={[
                styles.submitBtn, 
                GLOBALSTYLES.row, 
                {
                  backgroundColor: loading || !phoneNumber ? '#ccc' : '#023047', 
                  marginTop: 40
                }
              ]}
            >
                <ThemeText style={{color: '#fff'}}>{loading ? 'Sending...' : 'Verify'}</ThemeText>
                <ArrowForward />
            </TouchableOpacity>

            {/* <View style={styles.timerContainer}>
              <Text onPress={resetTimer} style={styles.timerBtn} >Send code again </Text>
              <Text style={styles.timer}> 00:{timeLeft}s</Text>
            </View> */}
          </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default Login

const styles = StyleSheet.create({    
  notification: {
    backgroundColor: '#FB8500',
    paddingVertical: 12,
    alignItems: 'center',
    width,
    left: -24,
    marginBottom: 10
  },
    submitBtn: {
      height: 60,
      borderRadius: 30,
      width: '100%',
      justifyContent: 'center',
      gap: 10
    },
    timerContainer: {
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    timerBtn: {
      fontWeight: '600',
      fontSize: 16,
    },
    timer: {
      fontWeight: '400',
      fontSize: 14,
    }
  })