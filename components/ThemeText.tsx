import { StyleSheet, Text, TextProps, TextStyle, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from '@/utils/sizeCalculator'

export type ThemeIprops =  TextProps & {
    style?: TextStyle,
    type?: "default" | "header" | "titleHeader" | "primaryNormalText" | "subHeader" | "inputText" | "labelText" | "secondaryNormalText"
}
const ThemeText = ({type, style, ...rest}:ThemeIprops) => {
  return (
    <View>
      <Text allowFontScaling={false} style={[
        type == "default" ? styles.default : undefined,
        type == "header" ? styles.header : undefined,
        type == "titleHeader" ? styles.titleHeader : undefined,
        type == "inputText" ? styles.inputText : undefined,
        type == "labelText" ? styles.labelText : undefined,
        type == "subHeader" ? styles.subHeader : undefined,
        type == "primaryNormalText" ? styles.primaryNormalText : undefined,
        type == "secondaryNormalText" ? styles.secondaryNormalText : undefined,
        {includeFontPadding: false},
        style
      ]} {...rest}/>
    </View>
  )
}

export default ThemeText

const styles = StyleSheet.create({
    default: {

    },
    header: {
        fontWeight: '700',
        fontSize: responsiveWidth(24),
        lineHeight: responsiveWidth(28),
        fontFamily: "Open-Bold",
        color: '#000'
        // paddingTop: 10
    },
    titleHeader: {
        fontWeight: '500',
        fontSize: responsiveWidth(20),
        lineHeight: responsiveWidth(28),
        fontFamily: "Open-Bold",
        color: '#023047'
        // paddingTop: 10
    },
    primaryNormalText: {
        fontWeight: '400',
        fontSize: responsiveWidth(14),
        lineHeight: responsiveWidth(18),
        fontFamily: 'Open-Regular'
      },
      secondaryNormalText: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 18,
        color: '#888888',
        fontFamily: 'Open-Regular'
      },
      subHeader: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "Open-SemiBold"
      },
      inputText: {
        
      },
      labelText: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#000000',
        fontFamily: 'Open-Regular'
    }
})