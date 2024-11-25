import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import ThemeText from './ThemeText';
import { GLOBALSTYLES } from '@/styles/global-styles';

type Iprops = {
   placeholder?: string,
   value?: any,
   label?: string,
   setValue: (text: string) => void,
}
const CurrencyInput = ({placeholder, label, value, setValue}:Iprops) => {
//   const [value, setValue] = useState<string>('');

const formatCurrency = (text: string) => {
   // Remove all existing commas first
   let cleaned = text.replace(/,/g, '');

   // Format number with commas
   let formattedValue = '';
   if (cleaned) {
      formattedValue = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }

   return formattedValue;
};


  const handleChangeText = (text: string) => {
    setValue(text);
  };

  return (
   <View style={{gap: 10, marginBottom: 20}}>
      <ThemeText type='labelText'>{label}</ThemeText>
      <View style={[styles.container, GLOBALSTYLES.row]}>
         <View style={{borderRightWidth: 1, borderRightColor: '#D8D8D8', height: '100%', justifyContent: 'center', paddingRight: 10}}><ThemeText type='labelText'>₦ (NGN)</ThemeText></View>
         <TextInput
         style={styles.input}
         value={formatCurrency(value)}
         inputMode='numeric'
         keyboardType="numeric"
         onChangeText={handleChangeText}
         placeholder={placeholder}
         />
      </View>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
   //  backgroundColor: 'red'
      borderColor: '#D8D8D8',
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16
  },
  input: {
    height: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default CurrencyInput;
