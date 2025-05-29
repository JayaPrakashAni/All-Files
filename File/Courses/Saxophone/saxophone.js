import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

// Import your local image
const localCourseImage = require('../../Assets/Instruments/Saxophone.jpg'); // Update the path to your local image

const Saxophone = () => {
  const navigation = useNavigation();

  const [otherCourses, setOtherCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: 'Saxophone Courses' });
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
        const response = await fetch('https://my.bmusician.com/app/getcourses/18');
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

    const sentences = description
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split('.')
      .filter((item) => item.trim() !== '');

    return sentences.slice(0, 3).map((sentence, index) => (
      <Text key={index} style={styles.descriptionText}>
        {sentence.trim()}
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
          {/* Use the local image */}
          <Image source={localCourseImage} style={styles.courseImage} />

          <View style={styles.courseHeader}>
            <Text style={styles.otherCourseName}>{course.CourseName}</Text>
          </View>

          <View style={styles.feeContainer}>
            <Text style={styles.fee}>{getCourseFee(course.CourseName)}</Text>
            <Text style={styles.perMonthText}> / m</Text>
          </View>

          <View style={styles.durationContainer}>
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseHeader: {
    marginBottom: 10,
  },
  otherCourseName: {
    fontSize: 24,
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
  descriptionContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
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

export default Saxophone;
