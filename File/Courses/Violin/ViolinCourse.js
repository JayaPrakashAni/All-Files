import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'https://my.bmusician.com';

const Violin = () => {
  const navigation = useNavigation();

  const [courseDetails, setCourseDetails] = useState({});
  const [otherCourses, setOtherCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const ViolinCourses = [
    { ID: 1, CourseName: "Beginner Violin", CourseImage: "/images/beginner-violin.jpg" },
    { ID: 2, CourseName: "Intermediate Violin", CourseImage: "/images/intermediate-violin.jpg" },
    { ID: 3, CourseName: "Advanced Violin", CourseImage: "/images/advanced-violin.jpg" },
  ];

  useEffect(() => {
    navigation.setOptions({ title: 'Violin Courses' });
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
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/app/getcoursedetails/29`);
        setCourseDetails(response.data.coursedetails);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOtherCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/app/getcourses/2`);
        setOtherCourses(response.data.CourseList);
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

    const items = cleanedDescription.split('.').filter((item) => item.trim() !== '');

    return (
      <View style={styles.dividedDescription}>
        {items.map((item, index) => (
          <Text key={index} style={styles.descriptionText}>
            {item.trim()}
          </Text>
        ))}
      </View>
    );
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
          <Image
            source={require('../../Assets/Instruments/Violin.jpg')}
            style={styles.cardImage}
          />

          <View style={styles.courseHeader}>
            <Text style={styles.otherCourseName}>{course.CourseName}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={styles.fee}>{getCourseFee(course.CourseName)}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}> / m</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={styles.durationText}>12-15 months approx.</Text>
            <TouchableOpacity onPress={() => UniqueId(course.ID, course.CourseName)}>
              <Text style={styles.viewButton}>View</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionContainer}>
            {renderDescription(course.CourseDescription)}
          </View>
        </View>
      ))}
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  courseHeader: {
    marginBottom: 10,
  },
  otherCourseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  fee: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
  durationText: {
    color: 'black',
    fontSize: 18,
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
  descriptionContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  dividedDescription: {
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
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

export default Violin;
