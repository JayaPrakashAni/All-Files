import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const BASE_URL = 'https://my.bmusician.com';

const DetailPage = ({ route }) => {
  const { courseId, courseName } = route.params;
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/app/getcoursedetails/${courseId}`);
        setCourseDetails(response.data.coursedetails);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.courseName}>{courseName}</Text>
      <Image
        source={{ uri: `${BASE_URL}${courseDetails.CourseImage}` }}
        style={styles.courseImage}
      />
      <Text style={styles.courseDescription}>{courseDetails.CourseDescription}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 16,
    textAlign: 'justify',
  },
});

export default DetailPage;
