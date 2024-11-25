import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ThemeText from './ThemeText'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { NigeriaFlag, VisibleEye } from '@/assets/icons/icon'
import { responsiveHeight } from '@/utils/sizeCalculator'

export type inputIprops = {
    label: string,
    LeftIcon?: any,
    placeholder: string,
    type: "number" | "text" | "email" | "password" | "tel" | "acc"
    RightIcon?: any,
    value?:string,
    setValue?: any
}

const ThemeInput = ({label, LeftIcon, RightIcon, placeholder, value, setValue, type, ...rest}: inputIprops ) => {
    const [visibility, setVisibility] = useState(true)
    const changeVisibility = () => {
        setVisibility(!visibility)
    }
  return (
    <View style={{gap: 10, marginBottom: responsiveHeight(20)}}>
        <ThemeText type='labelText'>{label}</ThemeText>
        <View style={[GLOBALSTYLES.row, styles.inputWrapper]}>
            {LeftIcon && <LeftIcon />}
            {type == "tel" && 
                <View style={[GLOBALSTYLES.row, {gap: 5, borderRightWidth: 1, borderRightColor: '#D8D8D8', height: '100%', paddingRight: 7, marginRight: 7}]}>
                    <NigeriaFlag />
                    <ThemeText type='secondaryNormalText'>+234</ThemeText>
                </View>}
            <TextInput allowFontScaling={false} maxLength={(type == "tel" || type == "acc") ? 10 : 100 } value={value} onChangeText={setValue} style={[styles.inputField]} secureTextEntry={type == "password" && visibility} keyboardType={type == "email" ? "email-address" : (type == "tel" || type == "acc") ? "phone-pad" : "default"}  placeholder={placeholder} {...rest}/>
            {type == "password" && <Pressable onPress={changeVisibility}><VisibleEye /></Pressable>}
            { RightIcon &&  <RightIcon />}
        </View>
    </View>
  )
}

export default ThemeInput

const styles = StyleSheet.create({
    inputWrapper: {
        width: '100%',
        height: responsiveHeight(50),
        borderRadius: 12,
        borderColor: '#D8D8D8',
        borderWidth: 1,
        paddingHorizontal: 10
    },
    inputField: {
        flex: 1,
        height: '100%',
        fontSize: responsiveHeight(14),
        fontFamily: 'Open-Regular'
    }
})