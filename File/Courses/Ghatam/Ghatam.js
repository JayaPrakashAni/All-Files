import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

// Import your local image
const localImage = require('../../Assets/Instruments/Ghatam.jpg'); // Replace with the correct path to your image

const Ghatam = () => {
  const navigation = useNavigation();

  const [otherCourses, setOtherCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: 'Ghatam Courses',
    });
  }, [navigation]);

  const UniqueId = async (id, name) => {
    await AsyncStorage.setItem('courseId', JSON.stringify(id));
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
    const fetchOtherCourses = async () => {
      try {
        const response = await axios.get(`https://my.bmusician.com/app/getcourses/17`);
        setOtherCourses(response.data.CourseList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOtherCourses();
  }, []);

  const renderDescription = (description) => {
    if (!description) return <Text style={styles.noDescriptionText}>Description not available.</Text>;

    const sentences = description
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split('.') // Split by sentences
      .filter((item) => item.trim() !== ''); // Remove empty strings

    return sentences.map((sentence, index) => (
      <Text key={index} style={styles.descriptionText}>
        {sentence.trim()} {/* Removed bullet points */}
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
      {otherCourses.map((course) => (
        <View key={course.ID} style={styles.cardContainer}>
          {/* Display local image */}
          <Image
            source={localImage} // Use the local image
            style={styles.courseImage}
          />

          {/* Course Name */}
          <View style={styles.courseHeader}>
            <Text style={styles.otherCourseName}>{course.CourseName}</Text>
          </View>

          {/* Course Fee */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={styles.fee}>{getCourseFee(course.CourseName)}</Text>
            <Text style={styles.perMonthText}> / m</Text>
          </View>

          {/* Approximate Duration */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={styles.durationText}>12-15 months approx.</Text>
            <TouchableOpacity onPress={() => UniqueId(course.ID, course.CourseName)}>
              <Text style={styles.viewButton}>View</Text>
            </TouchableOpacity>
          </View>

          {/* Course Description */}
          <View style={styles.descriptionCard}>
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
    backgroundColor: '#f9f9f9',
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  courseHeader: {
    marginBottom: 10,
  },
  otherCourseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  fee: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  perMonthText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 5,
    fontWeight: '700',
  },
  durationText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  viewButton: {
    marginLeft: 20,
    fontSize: 16,
    color: 'purple',
    backgroundColor: 'white',
    paddingVertical: 5,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  descriptionCard: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 5,
  },
  noDescriptionText: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
});

export default Ghatam;
