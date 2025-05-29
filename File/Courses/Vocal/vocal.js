import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'https://my.bmusician.com';

const Vocal = () => {
  const navigation = useNavigation();

  const [courseDetails, setCourseDetails] = useState({});
  const [otherCourses, setOtherCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set the navigation title to 'Vocal courses'
  useEffect(() => {
    navigation.setOptions({ title: 'Vocal Courses' });
  }, [navigation]);

  const UniqueId = async (id, name) => {
    await AsyncStorage.setItem('courseId', JSON.stringify(id));
    console.log('CourseId @ ------>', id);
    navigation.navigate('DetailPage', { courseId: id, courseName: name });
  };

  const getCourseFee = (courseName) => {
    if (!courseName) return 'N/A';

    const name = courseName.trim().toLowerCase();

    if (name.includes('super-advanced')) return '₹ 6000';
    if (name.includes('beginner')) return '₹ 2000';
    if (name.includes('intermediate')) return '₹ 3000';
    if (name.includes('advanced')) return '₹ 5000';

    return 'N/A';
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/app/getcoursedetails/49`);
        setCourseDetails(response.data.coursedetails);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchOtherCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/app/getcourses/8`);
    
        // Log Course Names to debug
        console.log('Course Names:', response.data.CourseList.map((course) => course.CourseName));
    
        // Filter out the unwanted courses
        const filteredCourses = response.data.CourseList.filter(
          (course) =>
            course.CourseName.trim() !== 'Classical Voice and Music Therapy' &&
            course.CourseName.trim() !== 'Hindustani Classical Music Vocal'
        );
        setOtherCourses(filteredCourses);
      } catch (error) {
        console.error(error);
      }
    };
    

    const fetchData = async () => {
      await fetchCourseDetails();
      await fetchOtherCourses();
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderDescription = (description) => {
    if (!description) return <Text style={styles.noDescriptionText}>Description not available.</Text>;

    const cleanedDescription = description
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const sentences = cleanedDescription.split('.').filter((sentence) => sentence.trim() !== '');

    return sentences.map((sentence, index) => (
      <Text key={index} style={styles.descriptionText}>
        {sentence.trim()}.
      </Text>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
   
  
      {/* Render the other courses with the same image */}
      {otherCourses.map((course) => (
        <View key={course.ID} style={styles.cardContainer}>
          {/* Use the same image for all cards */}
          <Image
            source={{ uri: `${BASE_URL}${courseDetails.CourseImage}` }}
            style={styles.courseImage}
          />
  
          {/* Course Name */}
          <View style={styles.courseHeader}>
            <Text style={styles.otherCourseName}>{course.CourseName}</Text>
          </View>
  
          {/* Course Fee */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.fee}>{getCourseFee(course.CourseName)}</Text>
            <Text style={{ fontWeight: 'bold', marginTop: 1, fontSize: 20, color: 'black' }}> / m</Text>
          </View>
  
          {/* Approximate Duration */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>12-15 months approx.</Text>
            <TouchableOpacity onPress={() => UniqueId(course.ID, course.CourseName)}>
              <Text style={styles.Viewbutton}>View</Text>
            </TouchableOpacity>
          </View>
  
          {/* Course Description */}
          <View style={styles.descriptionContainer}>
            {renderDescription(course.CourseDescription)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
  



};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  courseHeader: {
    marginBottom: 10,
  },
  otherCourseName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  fee: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  descriptionContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
    lineHeight: 22,
    textAlign: 'justify',
  },
  noDescriptionText: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
  Viewbutton: {
    marginTop: -20,
    marginLeft: 40,
    fontSize: 16,
    color: 'purple',
    backgroundColor: 'white',
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    fontWeight: 'bold',
    paddingHorizontal: 30,
  },
});

export default Vocal;
