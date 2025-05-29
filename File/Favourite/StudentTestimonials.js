import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Testimonial = () => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const gurus = [
    {
      Description: "The Carnatic Guitar course has been an incredible journey! The lessons cover everything from basic ragas to complex improvisations, and the teacher’s approach has really helped me master the intricate fingerwork.",
      StudentName: 'Aditya Venkataraman (Germany)',
      Title: 'Carnatic Guitar',
      GuruName: 'Guru: Guitar Shylu Ravindran',
      StudentImage: require('../Favourite/Img/Ad.png'),
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "The Advanced Konnakol course has taken my understanding of rhythmic patterns to a whole new level. The lessons are designed to refine my skills in complex rhythmic cycles and enhance my ability to perform intricate vocal percussion.",
      StudentName: 'Darshana (USA)',
      Title: 'Advanced Konnakol',
      GuruName: 'Guru: Surendran Ravindran',
      StudentImage: require('../Favourite/Img/Darsha.png'),
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "The Intermediate Vocal course has truly sharpened my vocal skills. It has provided me with a solid foundation in classical techniques while challenging me to improve my breath control, pitch accuracy, and vocal range.",
      StudentName: 'Sridar Sairam (Brussels, Belgium)',
      Title: 'Intermediate Vocal',
      GuruName: 'Guru: Tanjore V Prema',
      StudentImage: require('../Favourite/Img/ss.png'),
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "Great guru, thoroughly enjoyed learning the lessons from him. He is very knowledgeable and very patient in teaching and does not rush up which is very helpful for slow learners like me… ",
      StudentName: 'Anatharamakrishnan (USA)',
      Title: 'Carnatic Guitar',
      GuruName: 'Guru: Guitar Shylu Ravindran',
      StudentImage: require('../Favourite/Img/ana.png'),
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "The Beginner Carnatic Saxophone course has been an incredible starting point for my musical journey. It has provided me with a strong grasp of the basics, from learning proper breath control to mastering the fundamental notes and scales.",
      StudentName: 'Guru Prasanna (USA)',
      Title: 'Beginner Carnatic Saxophone',
      GuruName: 'Guru: Saxophone Ramanathan',
      StudentImage: require('../Favourite/Img/gp.png'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "The Intermediate Mridangam course has helped me refine my skills and deepen my understanding of rhythm and tala in Carnatic music. The lessons have introduced me to more complex patterns and techniques that challenge me while enhancing my timing and coordination.",
      StudentName: 'Mathew McGraw (USA)',
      Title: 'Intermediate Mridangam',
      GuruName: 'Guru: Surendran Ravindran',
      StudentImage: require('../Favourite/Img/mm.png'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "The class was really great! My teacher really helped me understand the piece that I am learning, and if I had any questions, she would answer them gladly. Overall, I had a really great experience!",
      StudentName: 'Seshagiri Yarojanna (USA)',
      Title: 'Carnatic Guitar',
      GuruName: 'Guru: Vijay Krishnan',
      StudentImage: require('../Favourite/Img/sy.png'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "The Advanced Mridangam course took my playing to a whole new level. The intricate rhythms, complex strokes, and in-depth understanding of advanced talas have expanded my musical expression.",
      StudentName: 'Shreya Suryanarayanan (Mumbai)',
      Title: 'Advanced Mridangam',
      GuruName: 'Guru: Surendran Ravindran',
      StudentImage: require('../Favourite/Img/sh.png'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "The Beginner Film Vocal course was a fantastic introduction to the world of film music! The course covered everything from vocal techniques to understanding how to adapt my voice for different genres of film songs",
      StudentName: 'Swathi V (Singapore)',
      Title: 'Beginner Film Vocal',
      GuruName: 'Guru: Ananya Thirumalai',
      StudentImage: require('../Favourite/Img/sw.png'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "The Super-advanced Carnatic Guitar course took my skills to the next level! The in-depth lessons on intricate ragas, advanced improvisations, and complex rhythms helped me master the nuances of Carnatic music." ,
      StudentName: 'Venky Srinivasan (Singapore)',
      Title: 'Super-advanced Carnatic Guitar',
      GuruName: 'Guru: Guitar Shylu Ravindran ',
      StudentImage: require('../Favourite/Img/ven.png'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "We have been so fortunate to have Guru Smt Bhooma Sriram teaching violin to our son Sameth Sitaram. She goes the extra mile to ensure that Sameth understands the theory behind raagas and thalas during the violin sessions. She usually sings the varnams or kritis and encourages Sameth to follow on violin." ,
      StudentName: 'Sreedhar Bala (Edison, New Jersey)',
      Title: 'Intermediate Violin',
      GuruName: 'Guru : Smt Bhooma Sriram',
      StudentImage: require('../Favourite/Img/SreedharBala.jpg'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "Gurus have always have had a special place in my life. Imparting knowledge is not easy and the gurus in BMUSICIAN/Bmusician are by far the most dedicated that I have seen...Very approachable and always ready to guide and help out with questions.." ,
      StudentName: 'Narayan Sreenivasan (Seattle, USA)',
      Title: 'Advanced Mridangam',
      GuruName: 'Guru: Surendran Ravindran',
      StudentImage: require('../Favourite/Img/narayan.jpg'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "Great teachers and wonderful platform to learn and teach anything and everything in the world. A great education platform. Kudos to team..." ,
      StudentName: 'Venki Ravi (Chennai, India)',
      Title: 'Intermediate Mridangam',
      GuruName: 'Guru: Surendran Ravindran',
      StudentImage: require('../Favourite/Img/Venki.jpg'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },
    {
      Description: "The teachers here are extremely talented and the way of teaching is exceptionally good. Also the 1 on 1 classes help to improve learning pace and reduces the mistakes while learning. Also I am getting a lot of time to practice what is taught in a class. I would like to thank my guru.." ,
      StudentName: 'Suhas Ramesh Naga (Delhi, India)',
      Title: 'Beginner Carnatic Keyboard',
      GuruName: 'Mr. Surya Kamal',
      StudentImage: require('../Favourite/Img/Suhas.jpg'), // Replace with actual student image path
      backgroundColor: '#f9f9f9',
    },

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === gurus.length - 1 ? 0 : prevIndex + 1;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        snapToAlignment="center"
        snapToInterval={screenWidth}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
        scrollEnabled={false}
      >
        {gurus.map((guru, index) => (
          <View key={index} style={[styles.guruView, { backgroundColor: guru.backgroundColor }]}>
            <View style={styles.textContainer}>
              {/* Displaying Student Image as a Round Shape */}
              <Image source={guru.StudentImage} style={styles.studentImage} />

              {/* Center aligned student name */}
              <Text style={styles.studentName}>{guru.StudentName}</Text>

              {/* Title */}
              <Text style={styles.title}>{guru.Title}</Text>

              {/* Guru Name at the bottom */}
              <Text style={styles.guruName}>{guru.GuruName}</Text>

              {/* Description */}
              <Text style={styles.description}>{guru.Description}</Text>
            </View>
            <Image source={require('../Assets/Icon/qu.png')} style={styles.quotation} />
            <Image source={require('../Assets/Icon/qu2.png')} style={styles.quotations} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guruView: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 15,
    height: 400, // Increased height of the card for better layout
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 15, // Adjusted padding
  },
  studentImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Round shape
    marginTop: 20,
    marginBottom: 10,
  },
  quotation: {
    width: 20, // Reduced size for quotation marks
    height: 20,
    position: 'absolute',
    top: 10,
    left: 20,
  },
  quotations: {
    width: 20, // Reduced size for quotation marks
    height: 20,
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  title: {
    fontSize: 14, // Adjusted font size for title
    color: 'black',
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 22,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  guruName: {
    fontSize: 12, // Smaller font size for guru name
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    textAlign: 'center', // Ensuring it is center-aligned
  },
});

export default Testimonial;
