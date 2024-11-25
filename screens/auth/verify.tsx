import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { GLOBALSTYLES } from '@/styles/global-styles'
import ThemeBackBtn from '@/components/ThemeBackBtn'
import ThemeText from '@/components/ThemeText'
import ThemeOTPInput from '@/components/ThemeOtpInput'
import ThemeTimer from '@/components/ThemeTimer'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Constants from 'expo-constants';
// import { validateCustomerInfo, validateHostInfo } from '@/api/auth'
import ThemeLoadeerScreen from '@/components/ThemeLoadeerScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from '@/utils/toast'
import { ENDPOINTS } from '@/constants/api';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const {width} = Dimensions.get('screen')
const Verification:FC<any> = ({navigation, route}) => {
    const { phoneNumber, pinId, accInfo} = route.params || ""
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '']);
    const [accType, setAccType] = useState<any>("")
    const { login } = useAuth();
    const [otpError, setOtpError] = useState(false);

    const initialTime = 30; // 30 seconds for countdown
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

    const handleVerification = async () => {
        try {
            setLoading(true);
            
            // Combine OTP array into a single string
            const pinCode = otp.join('');
            
            // Make API call to verify OTP
            const response = await axios.post(
                `${ENDPOINTS.VALIDATE_LOGIN_OTP}?pinId=${pinId}&pin=${pinCode}`
            );

            console.log('Verification Response:', response.data);

            if (response.data.status) {
                setOtpError(false);
                // Extract user token from the response
                const userToken = response.data?.token; // Adjust key based on API response

                // Store the token in AsyncStorage
                await AsyncStorage.setItem('userToken', userToken);
                // Store user data in auth context
                await login(response.data.result);
                showToast('success', 'Verification successful');
                navigation.navigate('Home');
            } else {
                setOtpError(true);
                setOtp(['', '', '', '']);
                showToast('error','Incorrect OTP. Please try again.');
            }
        } catch (error: unknown) {
            console.error('Verification error:', error);
            if (error instanceof Error && 'response' in error) {
                const axiosError = error as { response?: { data: unknown } };
                console.log('Error response:', axiosError.response?.data);
                // Clear the OTP input when there's an error
                setOtp(['', '', '', '']);
            }
            showToast('error', 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    }

    if(loading) return <ThemeLoadeerScreen />
  return (
    <SafeAreaProvider style={{ backgroundColor: '#fff', position: 'relative', paddingTop: Constants.statusBarHeight}}>
        <View style={[GLOBALSTYLES.container]}>
            <View style={[GLOBALSTYLES.wrapper]}>
                
                <ThemeBackBtn navigation={navigation}/>
                <View style={[{gap: 8}]}>
                    <ThemeText type='header'>Please Check your Phone number</ThemeText>
                    <ThemeText type='primaryNormalText'>We’ve sent a code to phoneNumber</ThemeText>
                </View>

                <ThemeOTPInput otp={otp} setOtp={setOtp} error={otpError} />

                <TouchableOpacity onPress={handleVerification} style={styles.submitBtn}>
                    <ThemeText style={{color: '#fff'}}>Verify</ThemeText>
                </TouchableOpacity>
                <View style={[{marginTop: 40, alignItems: 'center'}]}>
                    <ThemeText type='subHeader' style={{fontSize: 14}}>Send code again <ThemeTimer /></ThemeText>
                </View>
                
            </View>
        </View>
    </SafeAreaProvider>
  )
}

export default Verification

const styles = StyleSheet.create({
    submitBtn: {
        height: 60,
        borderRadius: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#023047'
    },
    btnText: {
        color: '#fff'
    },
   
})