import { StyleSheet, Text, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import React from 'react'
import ThemeText from './ThemeText'


const SingleSelectorInput = ({title, data, placeholder, setSelectedValue}: {title: string, data: {[key:string]: string}[], placeholder: string, setSelectedValue:any}) => {

  return (
    <View>
        <ThemeText type='labelText' style={{ marginBottom: 10}}>{title}</ThemeText>
      <SelectList 
            search={false}
            placeholder={placeholder}
            setSelected={(val:any) => setSelectedValue(val)} 
            data={data} 
            save="value"
            inputStyles={{color: "#494949", fontFamily: 'Open-Regular'}}
            boxStyles={{borderRadius: 12, borderColor: "#D8D8D8", height: 55, alignItems: 'center', marginBottom: 20}}
            // inputStyles={{color: 'red'}}
        />
    </View>
  )
}

export default SingleSelectorInput

const styles = StyleSheet.create({})