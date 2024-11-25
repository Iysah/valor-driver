import { StyleSheet, Text, TextProps, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemeText from './ThemeText'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { LinearGradient } from 'expo-linear-gradient'
import { responsiveHeight } from '@/utils/sizeCalculator'

export type btnIprops = TextProps & {
    title?:string,
    type?: "DEFAULT" | "OUTLINED" | "SECONDARY" | "PRIMARY" | "ASCENT" | "GRADIENT" | "TRANSPARENCY",  
    RightIcon?: any,
    height?: any
}

const ThemeButton = ({title, type, onPress, RightIcon, height, ...rest}:btnIprops) => {
  return (
    <View style={{}}>
      <TouchableOpacity onPress={onPress} style={[
            GLOBALSTYLES.row,
            GLOBALSTYLES.center,
            type == "OUTLINED" ? styles.outlined : undefined,
            type == "ASCENT" ? styles.ascent : undefined,
            type == "PRIMARY" ? styles.primary : undefined,
            type == "TRANSPARENCY" ? styles.transparency : undefined,
            type == "SECONDARY" ? styles.secondary : undefined,
            type == "DEFAULT" ? styles.default : undefined,
            type == "GRADIENT" ? styles.gradient : undefined,
            {height: height ? height : responsiveHeight(60)}
        ]}>
            {
                type == "GRADIENT" ? (
                    <LinearGradient 
                        colors={['#1D95D14D', '#023047']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0.2 }}
                        locations={[0.03, 0.3]}
                        style={{ flex: 1, justifyContent: 'center', height: '100%', alignItems: 'center', borderRadius: 30,}}
                    >
                        <Text style={[styles.btnText]} {...rest}/>
                    </LinearGradient>
                ) : (
                    <Text {...rest}/>
                )
            }
        {
            RightIcon && <RightIcon />
        }
      </TouchableOpacity>
    </View>
  )
}

export default ThemeButton

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontFamily: 'Open-Regular'
    },
    default: {
        borderRadius: responsiveHeight(30),
        height: responsiveHeight(60),
        backgroundColor: '#E7E9EE'
    },
    transparency: {
        borderRadius: responsiveHeight(30),
        height: responsiveHeight(60),
        backgroundColor: '#fff',
        fontFamily: 'Open-Regular'
    },
    outlined: {
        borderColor: '#000',
        borderRadius: responsiveHeight(50),
        borderWidth: 1,
        height: responsiveHeight(60)
    },
    secondary: {

    },
    primary: {

    },
    ascent: {
        borderWidth: 2,
        borderColor: '#023047',
        borderRadius: 30,
        height: responsiveHeight(60)
    },
    gradient: {
        height: responsiveHeight(60),
        backgroundColor: '#023047',
        borderRadius: responsiveHeight(30),
        fontFamily: 'Open-Regular'
    }

})