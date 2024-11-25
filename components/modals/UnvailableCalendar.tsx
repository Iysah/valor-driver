import { generateCalendar } from '@/utils/calendar';
import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import ThemeText from '../ThemeText';
import { GLOBALSTYLES } from '@/styles/global-styles';
import { ArrowRight, ArrowleftIcon, CalendarIcon, CalendarOutlineIcon, DarkArrowRight } from '@/assets/icons/icon';

interface IProps {
    unAvailableDates: string[];
}

const UnavailableCalendar: FC<IProps> = ({ unAvailableDates }) => {
    const [dates, setCalendarDates] = useState<number[][]>([[]]);
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [showMonths, setShowMonths] = useState(false); // Dropdown toggle

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const sortedDates:any = unAvailableDates?.length > 0 && [...unAvailableDates];
    const firstUnavailableDate = sortedDates[0];
    const lastUnavailableDate = sortedDates[sortedDates.length - 1];

    // Format dates as 'Thur, 1 July'
    const formatDate = (dateStr: string = "2024-01-03") => {
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        setCalendarDates(generateCalendar(month, year));
    }, [month, year]);

    const isUnavailable = (dayStr: string) => {
        return unAvailableDates?.includes(dayStr);
    };

    const handleMonthSelect = (selectedMonth: number) => {
        setMonth(selectedMonth);
        setShowMonths(false); // Close dropdown after selecting a month
    };


    return (
        <View style={styles.calendarContainer}>
            <View style={[GLOBALSTYLES.row, { paddingHorizontal: 30, paddingVertical: 8, justifyContent: 'space-between', backgroundColor: '#F4F4F4'}]}>
                <View style={[GLOBALSTYLES.row, {gap: 10}]}>
                    <CalendarOutlineIcon />
                    {unAvailableDates?.length > 0 && <ThemeText type='primaryNormalText'>{`${formatDate(firstUnavailableDate)} - ${formatDate(lastUnavailableDate)}`}</ThemeText>}
                </View>

                <View style={[GLOBALSTYLES.row, {gap: 10}]}>
                    <Pressable style={[GLOBALSTYLES.center, styles.picker, styles.nxtprevBtn]} onPress={() => {
                        if (month === 0) {
                            setMonth(11);
                            setYear(year - 1);
                        } else {
                            setMonth(month - 1);
                        }
                    }}>
                        <ArrowleftIcon />
                    </Pressable>
                    <Pressable style={[GLOBALSTYLES.center, styles.picker, styles.nxtprevBtn]} onPress={() => {
                        if (month === 11) {
                            setMonth(0);
                            setYear(year + 1);
                        } else {
                            setMonth(month + 1);
                        }
                    }}>
                        <DarkArrowRight color={'#FB8500'} />
                    </Pressable>
                </View>
                
            </View>
            <View style={styles.calendarControl}>
                <Pressable style={styles.picker} onPress={() => setShowMonths(!showMonths)}>
                    <ThemeText type='primaryNormalText' style={styles.pickerTxt}>{months[month]}</ThemeText>
                </Pressable>
            </View>

            {showMonths && (
                <View style={styles.dropdown}>
                    <ScrollView style={{ height: 200 }}>
                        {months.map((monthItem, index) => (
                            <Pressable key={index} onPress={() => handleMonthSelect(index)}>
                                <Text style={styles.dropdownItem}>{monthItem}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )}

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
                                const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                const isUnavailableDate = isUnavailable(dayStr);

                                return (
                                    <View key={j} style={styles.day}>
                                        <View
                                            style={[
                                                GLOBALSTYLES.center,
                                                styles.dateText,
                                                {
                                                    backgroundColor: "transparent",
                                                    borderRadius: 40,
                                                }
                                            ]}
                                        >
                                          <ThemeText type='primaryNormalText' style={[{color: isUnavailableDate ? "#D8D8D8" : "#023047", fontSize: 12, textDecorationLine: isUnavailableDate ? 'line-through' : 'none'}]}>
                                            {day ? day : ""}
                                          </ThemeText>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default UnavailableCalendar;

const styles = StyleSheet.create({
   calendarContainer: {
       backgroundColor: "#fff",
       borderRadius: 10,
       paddingVertical: 15,
    //    paddingHorizontal: 15,
   },
   calendarControl: {
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems: "center",
       marginBottom: 10,
   },
   nxtprevBtn: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: '#fff'
   },
   picker: {
       paddingVertical: 3,
       paddingHorizontal: 10,
   },
   pickerTxt: {
       fontSize: 14,
       marginTop: 10
   },
   calendarContent: {},
   dayWrapper: {
       flexDirection: "row",
       height: 45,
       alignItems: "center",
       marginTop: 0,
   },
   dayText: {
       flex: 1,
       textAlign: "center",
       fontSize: 14,
       color: "#969696",
       fontFamily: "Open-Medium",
   },
   days: {},
   week: {
       height: 45,
       flexDirection: "row",
   },
   day: {
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
       borderRadius: 30
   },
   dateText: {
       textAlign: "center",
       color: "#000",
       fontFamily: "Open-Regular",
       height: 41,
       width: 41,
       borderRadius: 20.5,
       lineHeight: 45,
   },
   dropdown: {
       backgroundColor: "#fff",
       borderWidth: 1,
       borderColor: "#E0E0E0",
       borderRadius: 5,
       paddingVertical: 5,
   },
   dropdownItem: {
       paddingVertical: 10,
       paddingHorizontal: 15,
       fontSize: 14,
       fontFamily: "Open-Regular",
       color: "#023047",
   },
});
