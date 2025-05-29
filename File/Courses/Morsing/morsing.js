import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

// Local Image Import (if required, replace with the appropriate image)
const localImage = require('../../Assets/Instruments/Morsing.jpg'); // Update path as needed

const BASE_URL = 'https://my.bmusician.com';

const Morsing = () => {
  const navigation = useNavigation();

  const [otherCourses, setOtherCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: 'Morsing Courses' });
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
        const response = await fetch(`${BASE_URL}/app/getcourses/14`);
        const data = await response.json();
        setOtherCourses(data.CourseList || []);
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

    const points = description
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split('.')
      .filter((item) => item.trim() !== '');

    return points.slice(0, 3).map((point, index) => (
      <Text key={index} style={styles.descriptionText}>
        {point.trim()}.
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
          {/* Local Image */}
          <Image
            source={localImage} // Use the local image
            style={styles.courseImage}
          />

          {/* Course Name */}
          <View style={styles.courseHeader}>
            <Text style={styles.otherCourseName}>{course.CourseName}</Text>
          </View>

          {/* Course Fee */}
          <View style={styles.feeContainer}>
            <Text style={styles.fee}>{getCourseFee(course.CourseName)}</Text>
            <Text style={styles.perMonthText}>/ m</Text>
          </View>

          {/* Duration and View Button */}
          <View style={styles.durationContainer}>
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
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  feeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fee: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  perMonthText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
    marginLeft: 5,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  durationText: {
    fontSize: 18,
    color: 'black',
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
    color: 'black',
    lineHeight: 22,
    marginBottom: 5,
    textAlign: 'justify',
  },
  noDescriptionText: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
});

export default Morsing;
