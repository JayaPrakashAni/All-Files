import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../File/Login/AuthContext';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { handlePayment } from '../File/Payment/Razor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Enrollment = () => {
  const [Coursedata, setCourseData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigation = useNavigation();
  const { userInfo, logout } = useAuth();

  // Time & Day
  const Days = [
    { Day: 'Sunday' },
    { Day: 'Monday' },
    { Day: 'Tuesday' },
    { Day: 'Wednesday' },
    { Day: 'Thursday' },
    { Day: 'Friday' },
    { Day: 'Saturday' },
  ];
  const [selectedDays, setSelectedDays] = useState('Select Day');
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(Days);
  const searchRef = useRef();

  // Start Time
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [startTime, setStartTime] = useState('Start Time');
  const [startTimeAPI, setStartTimeAPI] = useState('');
  const [startDateTime, setStartDateTime] = useState(null); // Store the start time as Date object

  // End Time
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [endTime, setEndTime] = useState('End Time');
  const [endTimeAPI, setEndTimeAPI] = useState('');
  const [endDateTime, setEndDateTime] = useState(null); // Store the end time as Date object

  // New textfield
  const [timePreferences, setTimePreferences] = useState([]);
  
  useEffect(() => {
    if (timePreferences.length > 0) {
        setIsButtonEnabled(true);
    }
}, [timePreferences]); // ✅ Only updates when `timePreferences` change


  const addTimeRange = () => {
    if (selectedDays !== 'Select Day' && startTime !== 'Start Time' && endTime !== 'End Time') {
      const newTimePref = {
        Day: selectedDays,
        StartTime: startTime.replace(':', ''),
        EndTime: endTime.replace(':', ''),
        StartTimeAPI: startTimeAPI,
        EndTimeAPI: endTimeAPI,
        formattedStartTime: startTime,
        formattedEndTime: endTime,
      };
      setTimePreferences(prev => [...prev, newTimePref]);

      // Reset selections after adding the time range
      setSelectedDays('Select Day');
      setStartTime('Start Time');
      setEndTime('End Time');
      setStartTimeAPI('');
      setEndTimeAPI('');
      setStartDateTime(null);
      setEndDateTime(null);
    } else {
      Alert.alert("Incomplete Selection", "Please select a day, start time, and end time.");
    }
  };

  const onSearch = txt => {
    if (txt !== '') {
      let tempData = data.filter(item => {
        return item.Day.toLowerCase().indexOf(txt.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(Days);
    }
  };

  // Start Time
  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  // End Time
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    const apiFormattedTime = `${hours < 10 ? '0' + hours : hours}${minutes < 10 ? '0' + minutes : minutes}`;
    return { formattedTime, apiFormattedTime };
  };

  const handleStartTimeConfirm = (date) => {
    console.warn("A Start Time has been picked:", date);
    const { formattedTime, apiFormattedTime } = formatTime(date);
    setStartTime(formattedTime);
    setStartTimeAPI(apiFormattedTime);
    setStartDateTime(date);
    hideStartTimePicker();
  };

  const handleEndTimeConfirm = (date) => {
    console.warn("An End Time has been picked:", date);
    if (startDateTime && date <= startDateTime) {
      Alert.alert("Invalid Time", "End time must be after the start time.");
      hideEndTimePicker();
      return;
    }
    const { formattedTime, apiFormattedTime } = formatTime(date);
    setEndTime(formattedTime);
    setEndTimeAPI(apiFormattedTime);
    setEndDateTime(date);
    hideEndTimePicker();
  };

  const enrollData = async (courseId, userId) => {
    try {
      const url = `https://my.bmusician.com/app/enroll/?userid=${userId}&courseid=${courseId}`;
      const response = await fetch(url);
      const myData = await response.json();
      setCourseData(myData);
      await AsyncStorage.setItem('myData', JSON.stringify(myData));

      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const CompleteEnrollmentFunction = async () => {

    if (Coursedata?.isEnrolled) { 
      Alert.alert("You have already Enrolled in this course! Thank You.");
      return;
    }
  
    const enrollID = Coursedata?.enrollmentid;
    console.log('Enrollment Id Here>>>> ', enrollID)
    
    if (!enrollID || !timePreferences.length) {
      console.log("Missing enrollment ID or time preferences");
      console.log('EnrollmentId >>>>', enrollID )
      return;
    }

    handlePayment(navigation, enrollID);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseId = await AsyncStorage.getItem('courseId');

        if (userInfo.userid && courseId) {
          enrollData(courseId, userInfo.userid);
        } else {
          console.log('UserID or CourseID is missing');
        }
      } catch (error) {
        console.log('Error fetching data from AsyncStorage', error);
      }
    };
    fetchData();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Coursedata && (
        <>
          <FlatList
            data={timePreferences}
            ListHeaderComponent={
              <>
                <Text style={styles.heading}>Select Time preferences</Text>
                <TouchableOpacity
                  style={styles.dropdownSelector}
                  onPress={() => setIsClicked(!isClicked)}>
                  <Text style={styles.dropdownText}>{selectedDays}</Text>
                  <Icon name={isClicked ? "chevron-up" : "chevron-down"} size={20} color="#000" />
                </TouchableOpacity>
                {isClicked && (
                  <View style={styles.dropdownArea}>
                    <TextInput
                      ref={searchRef}
                      placeholder="Search"
                      style={styles.searchInput}
                      onChangeText={onSearch} />
                    <FlatList
                      data={data}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.dayItem}
                          onPress={() => {
                            setSelectedDays(item.Day);
                            onSearch('');
                            setIsClicked(false);
                            searchRef.current.clear();
                          }}>
                          <Text style={styles.dayItemText}>{item.Day}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={showStartTimePicker}>
                  <Text style={styles.timeButtonText}>{startTime}</Text>
                  <Icon name="clock-outline" size={20} color="#000" />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isStartTimePickerVisible}
                  mode="time"
                  minuteInterval ={15}
                  onConfirm={handleStartTimeConfirm}
                  onCancel={hideStartTimePicker}
                />
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={showEndTimePicker}>
                  <Text style={styles.timeButtonText}>{endTime}</Text>
                  <Icon name="clock-outline" size={20} color="#000" />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isEndTimePickerVisible}
                  mode="time"
                  minuteInterval ={15}
                  onConfirm={handleEndTimeConfirm}
                  onCancel={hideEndTimePicker}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTimeRange}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
                {timePreferences.length > 0 && (
                  <Text style={styles.selectedTimeSlotsText}>Selected Time Slot(s)</Text>
                )}
              </>
            }
            renderItem={({ item, index }) => (
              <View style={styles.selectedTime}>
                <TextInput
                  style={[styles.timeTextField, styles.boldBlackText]}
                  value={item.Day}
                  editable={false}
                />
                <TextInput
                  style={[styles.timeTextField, styles.boldBlackText]}
                  value={item.formattedStartTime}
                  editable={false}
                />
                <TextInput
                  style={[styles.timeTextField, styles.boldBlackText]}
                  value={item.formattedEndTime}
                  editable={false}
                />
                <TouchableOpacity onPress={() => {
                  setTimePreferences(timePreferences.filter((_, i) => i !== index));
                }}>
                  <Icon name="delete-outline" size={20} color="#ED4D57" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.contentContainer}
          />
          <TouchableOpacity
            style={[
              styles.completeButton,
              { opacity: isButtonEnabled ? 1 : 0.5 } // Adjust button visibility
            ]}
            onPress={CompleteEnrollmentFunction}
            disabled={!isButtonEnabled} // Disable button if conditions not met
          >
            <Text style={styles.completeButtonText}>Complete Enrollment</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black'
  },
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 20,
  },
  dropdownText: {
    flex: 1,
  },
  dropdownArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dayItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  dayItemText: {
    fontSize: 16,
  },
  timeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 20,
  },
  timeButtonText: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  selectedTimeSlotsText: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
    textAlign: 'center',
    color: 'black'
  },
  completeButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#ED4D57',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
   elevation: 3,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  selectedTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  timeTextField: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginRight: 10,
    textAlign: 'center',
    flex: 1,
  },
  boldBlackText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Enrollment;
