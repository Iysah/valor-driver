import React, { useState, useRef } from 'react';
import { View, ScrollView, Vibration, NativeSyntheticEvent, NativeScrollEvent, Dimensions, Pressable } from 'react-native';
import { GLOBALSTYLES } from '@/styles/global-styles';
import ThemeText from './ThemeText';
import * as Haptics from 'expo-haptics';

const meridiem = ["AM", "PM"];
const ITEM_HEIGHT = 40;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ThemeClock = ({timeData, selectedMinuteIndex, selectedHourIndex, setSelectedHourIndex, setSelectedMinuteIndex, selectedMeridiemIndex, setSelectedMeridiemIndex}:any) => {

  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);
  const meridiemScrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>, setSelectedIndex: (index: number) => void) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / ITEM_HEIGHT);
    setSelectedIndex(index);
  };

  const handleMomentumScrollEnd = (scrollRef: React.RefObject<ScrollView>, index: number) => {
    scrollRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
    Haptics.selectionAsync()
  };

  const renderPicker = (data: string[], selectedIndex: number, setSelectedIndex: (index: number) => void, scrollRef: React.RefObject<ScrollView>) => (
    <ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      onScroll={(event) => handleScroll(event, setSelectedIndex)}
      onMomentumScrollEnd={() => handleMomentumScrollEnd(scrollRef, selectedIndex)}
      scrollEventThrottle={16}
    >
      {data.map((item, index) => (
        <View key={index} style={[GLOBALSTYLES.center, {
          height: ITEM_HEIGHT,
          borderRadius: 6,
          backgroundColor: selectedIndex === index ? '#E7E9EE' : '#fff',
          opacity: selectedIndex === index ? 1 : 0.5,
        }]}>
          <ThemeText type='primaryNormalText'>{item}</ThemeText>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={{
      // position: 'absolute',
      width: '75%',
      zIndex: 100,
      // top: SCREEN_HEIGHT / 3,  // This centers the picker vertically
      backgroundColor: 'transparent',
      // left: 0,
      height: 100,  // Show 3 items at a time
      overflow: 'hidden',
      flexDirection: 'row',
      borderRadius: 12,
      // elevation: 5,
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 10,
      paddingVertical: 20
    }}>
      <View style={{ flex: 1 }}>
        {renderPicker(timeData.hours, selectedHourIndex, setSelectedHourIndex, hourScrollRef)}
      </View>
      <ThemeText type='header' style={{marginTop: -20}}>:</ThemeText>
      <View style={{ flex: 1 }}>
        {renderPicker(timeData.minutes, selectedMinuteIndex, setSelectedMinuteIndex, minuteScrollRef)}
      </View>
      <ThemeText type='header' style={{marginTop: -20}}>:</ThemeText>
      <View style={[GLOBALSTYLES.center, { marginLeft: 10, gap: 4, marginRight: 10 }]}>
        <Pressable onPress={() => {
          Haptics.selectionAsync() 
          setSelectedMeridiemIndex('AM')}
        } style={{paddingVertical: 4, paddingHorizontal: 20, borderRadius: 6, backgroundColor: selectedMeridiemIndex == "AM" ? "#E7E9EE" : "#fff"}}><ThemeText type='header' style={{fontSize: 12}}>AM</ThemeText></Pressable>
        <Pressable onPress={() => {
          Haptics.selectionAsync()
          setSelectedMeridiemIndex('PM')}
         } style={{paddingVertical: 4, paddingHorizontal: 20, borderRadius: 6, backgroundColor: selectedMeridiemIndex == "PM" ? "#E7E9EE" : "#fff"}}><ThemeText type='header' style={{fontSize: 12}}>PM</ThemeText></Pressable>
      </View>
    </View>
  );
};

export default ThemeClock;
