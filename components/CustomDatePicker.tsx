import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ThemeText from './ThemeText';
import { responsiveHeight } from '@/utils/sizeCalculator';

const CustomDatePicker = ({ date, setDate }: any) => {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
        <ThemeText type='primaryNormalText' style={styles.inputText}>
          {date ? date.toLocaleDateString() : 'Select Date'}
        </ThemeText>
      </TouchableOpacity>
      {show && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={show}
          onRequestClose={() => setShow(false)}
        >
          <TouchableOpacity 
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => setShow(false)} // Close the modal when clicking outside the box
          >
            <TouchableOpacity 
              style={styles.pickerContainer}
              activeOpacity={1}
            >
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="spinner"
                onChange={onChange}
                style={styles.picker}
              />
              {/* <TouchableOpacity onPress={() => setShow(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity> */}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 20,
    height: responsiveHeight(55),
    justifyContent: 'center',
    paddingHorizontal: 10,

  },
  inputText: {
    color: '#333',
    fontSize: 12
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  picker: {
    width: '100%',
    height: responsiveHeight(150),
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#007BFF',
    fontSize: 18,
  },
});

export default CustomDatePicker;
