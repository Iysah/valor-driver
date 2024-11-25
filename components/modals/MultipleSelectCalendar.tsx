import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text, ScrollView } from 'react-native';
import { generateCalendar } from '@/utils/calendar';
import { COLORS } from '@/styles/colors';
import { ArrowDownIcon } from '@/assets/icons/icon';

interface IProps {
    initialDates: number[],
    month: number,
    year: number,
    setDates: (val: number[]) => void,
    setMonth: (val: number) => void,
    setYear: (val: number) => void,
    setShow: (val: boolean) => void
}

const DatePicker: FC<IProps> = ({ initialDates, month, year, setDates, setMonth, setYear, setShow }) => {
    const height = Dimensions.get("screen").height;
    const width = Dimensions.get("screen").width;
    const [selectedDates, setSelectedDates] = useState<number[]>(initialDates);
    const [dates, setCalendarDates] = useState<number[][]>([[]]);
    const [years, setYears] = useState<number[]>([]);
    const [showMonths, setShowMonths] = useState(false);
    const [showYears, setShowYears] = useState(false);
    
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        setCalendarDates(generateCalendar(month, year));
        setYears((prev) => {
            const yearList: number[] = [];
            for (let i = 1940; i <= new Date().getFullYear(); i++) {
                yearList.push(i);
            }
            return yearList;
        });
    }, [month, year]);
    
    const handleDateSelect = (day: number) => {
      if (!day) return;
      
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      setSelectedDates((prevDates:any) => {
          if (prevDates.includes(formattedDate)) {
              // Remove the date if it's already selected
              return prevDates.filter((date:any) => date !== formattedDate);
          } else {
              // Add the new date
              return [...prevDates, formattedDate];
          }
      });
  }

    const handleClose = () => {
        setDates(selectedDates);
        setMonth(month);
        setYear(year);
        setShow(false);
    };

    const handleNextMonth = () => {
        if (month < 11) {
            setMonth(month + 1);
        } else {
            if (year < new Date().getFullYear()) {
                setMonth(0);
                setYear(year + 1);
            }
        }
    };

    const handlePrevMonth = () => {
        if (month > 0) {
            setMonth(month - 1);
        } else {
            if (year > 1940) {
                setMonth(11);
                setYear(year - 1);
            }
        }
    };

    return (
        <Pressable onPress={() => setShow(false)} style={[styles.container, { height, width }]}>
            <Pressable onPress={(e) => e.stopPropagation()} style={[styles.calendar, { width: width - 32 }]}>
                <View style={styles.calendarControl}>
                    <Pressable style={styles.picker} onPress={() => {
                        setShowMonths(!showMonths);
                        setShowYears(false);
                    }}>
                        <Text style={styles.pickerTxt}>{months[month]}</Text>
                        <ArrowDownIcon />
                    </Pressable>
                    <Pressable style={styles.picker} onPress={() => {
                        setShowMonths(false);
                        setShowYears(!showYears);
                    }}>
                        <Text style={styles.pickerTxt}>{year}</Text>
                        <ArrowDownIcon />
                    </Pressable>
                </View>
                <View style={styles.calendarContent}>
                    <View style={styles.dayWrapper}>
                        <Text style={styles.dayText}>Sun</Text>
                        <Text style={styles.dayText}>Mon</Text>
                        <Text style={styles.dayText}>Tue</Text>
                        <Text style={styles.dayText}>Wed</Text>
                        <Text style={styles.dayText}>Thu</Text>
                        <Text style={styles.dayText}>Fri</Text>
                        <Text style={styles.dayText}>Sat</Text>
                    </View>
                    <View style={styles.days}>
                        {dates.map((week, i) => (
                           <View key={i} style={styles.week}>
                                 {week.map((day, j) => {
                                    const dayStr:any = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                    const isSelected = selectedDates.includes(dayStr);

                                    return (
                                       <Pressable key={j} style={styles.day} onPress={() => handleDateSelect(day)}>
                                             <Text style={[styles.dateText, {
                                                backgroundColor: isSelected ? "#023047" : "transparent",
                                                color: isSelected ? "#fff" : "#023047"
                                             }]}>
                                                {day ? day : ""}
                                             </Text>
                                       </Pressable>
                                    );
                                 })}
                           </View>
                        ))}
                     </View>
                </View>
                <View style={styles.btnContainer}>
                    <Pressable onPress={handleClose} style={styles.btn}>
                        <Text style={styles.btnTxt}>Save</Text>
                    </Pressable>
                </View>
                {showMonths && <View style={styles.dropdown}>
                    <ScrollView style={{ height: 200, paddingHorizontal: 15 }}>
                        {months.map((month, i) => (
                            <Pressable key={i} onPress={() => {
                                setMonth(i);
                                setShowMonths(false);
                            }}>
                                <Text style={styles.monTxt}>{month}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>}
                {showYears && <View style={styles.dropdown}>
                    <ScrollView style={{ height: 200, paddingHorizontal: 15 }}>
                        {years.map((yearVal, i) => (
                            <Pressable key={i} onPress={() => {
                                setYear(yearVal);
                                setShowYears(false);
                            }}>
                                <Text style={styles.monTxt}>{yearVal}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>}
            </Pressable>
        </Pressable>
    )
};

export default DatePicker;


const styles = StyleSheet.create({
   container: {
       alignItems: "center",
       justifyContent: "center",
       backgroundColor: "rgba(0,0,0,0.45)",
       position: "absolute",
       top: 0,
       left: 0,
       zIndex: 1000
   },
   calendar: {
       backgroundColor: "#fff",
       borderRadius: 10,
       paddingVertical: 15,
       paddingHorizontal: 15,
   },
   calendarControl: {
       flexDirection: "row",
       width: "100%",
       alignItems: "center",
       gap: 21,
       zIndex: 5
   },
   arrow: {
       padding: 5
   },
   picker: {
     //   flex: 1,
       flexDirection: "row",
       justifyContent: "center",
       alignItems: "center",
       columnGap: 8,
       position: "relative",
       paddingVertical: 5
   },
   pickerTxt: {
       fontSize: 14,
       fontFamily: "Open-Regular"
   },
   calendarContent: {
   },
   dayWrapper: {
       flexDirection: "row",
       height: 45,
       alignItems: "center",
       marginTop: 10
   },
   dayText: {
       flex: 1,
       textAlign: "center",
       fontSize: 14,
       color: "#969696",
       fontFamily: "Open-Medium"
   },
   days: {

   },
   week: {
       height: 45,
       flexDirection: "row"
   },
   day: {
       flex: 1
   },
   dateText: {
       flex: 1,
       textAlign: "center",
       color: "#000",
       fontFamily: "Open-Regular",
       height: 41,
       maxHeight: 41,
       maxWidth: 41,
       width: 41,
       borderRadius: 20.5,
       lineHeight: 45
   },
   btnContainer: {
       paddingVertical: 10,
       flexDirection: "row",
       justifyContent: "flex-end",
   },
   btn: {
       height: 50,
       width: '100%',
       backgroundColor: COLORS.light.primary,
       justifyContent: "center",
       alignItems: "center",
       borderRadius: 8
   },
   btnTxt: {
       textAlign: "center",
       color: "#fff",
       fontSize: 16,
       fontFamily: "Open-Regular"
   },
   dropdown: {
       position: "absolute",
       width: 150,
       height: 300,
       backgroundColor: "#fff",
       top: 50,
       left: 40,
       padding: 10,
       paddingBottom: 0,
       zIndex: 200,
       borderRadius: 8,
       shadowColor: 'rgba(0,0,0,0.3)', // For iOS shadow
       shadowOffset: { width: 4, height: 5 },
       shadowOpacity: 0.3,
       shadowRadius: 8,

   },
   monTxt: {
       fontSize: 14,
       fontFamily: "Open-Regular",
       paddingVertical: 10,
       flex: 1
   }
})
