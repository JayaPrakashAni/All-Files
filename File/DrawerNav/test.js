import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const sidePadding = -5; // Adjust this value for desired padding

const TestimonialsCarousel = () => {
  const scrollViewRef = useRef();
  const intervalRef = useRef();

  const data = [
    { id: '1', description: 'The class was really great! My teacher really helped me understand the piece that I am learning, and if I had any questions, she would answer them gladly. Overall, I had a really great experience!', guruName: 'Guru: Lakshmikanya', studentName: 'Amoolya Yathiraj' },
    { id: '2', description: 'Varnams notes are explained in a very simple way and easy to understand. Thank you for being very patient during the entire class. Appreciated!!', guruName: 'Durga Prasad', studentName: 'Arivazhagan' },
    { id: '3', description: 'The way of approaching by the team was excellent! Keep up the good work. The tutor has taught every lesson is clearly.', guruName: 'Guitar Shylu Ravindran', studentName: 'Seshagiri Yarrajonna' },
  ];

  useEffect(() => {
    function scrollNext() {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: screenWidth * ((intervalRef.current.index + 1) % data.length),
          animated: true
        });
        intervalRef.current.index = (intervalRef.current.index + 1) % data.length;
      }
    }

    intervalRef.current = {
      interval: setInterval(scrollNext, 3000),
      index: 0
    };

    return () => clearInterval(intervalRef.current.interval);
  }, []);

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      ref={scrollViewRef}
      contentContainerStyle={{ alignItems: 'center' }}
      style={{ paddingHorizontal: sidePadding }}
    >
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.cardContainer,
            { width: screenWidth - (2 * sidePadding), marginLeft: index === 0 ? sidePadding : 0, marginRight: index === data.length - 1 ? sidePadding : 0 }
          ]}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>{item.description}</Text>
            <Text style={styles.guruName}>{item.guruName}</Text>
            <Text style={styles.studentName}>{item.studentName}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: 'grey',
  },
  guruName: {
    fontSize: 24,
    color: '#ED4D57',
  },
  studentName: {
    fontSize: 22,
    color: 'black',
  }
});

export default TestimonialsCarousel;
