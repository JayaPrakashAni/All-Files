import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

const AboutUsPage = () => {
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
        <Image style={styles.featureHeaderImage} source={require('../Assets/Features/red.png')} />
        <Text style={styles.featureHeaderText}>
          ABOUT <Text style={styles.highlight}> BMUSICIAN</Text>
        </Text>
        <Image style={styles.mainImage} source={require('../Assets/MusicInstruments/B.png')} />
        <Text style={styles.textStyle}>
          BMusician is an innovative platform for conducting online music classes for students of all ages interested in different genres and instruments. They are trained in groups and individual sessions through live-streaming classes spanning over 200 courses, 50 specializations and 8 genres of music.
        </Text>
        <Text style={styles.textStyle}>
          Our faculty comprises trained singers and musicians coming from prominent gharanas/backgrounds, each well-versed in the Indian and Western classical, bringing years of experience as trainers and renowned performers.
        </Text>

        <Image style={styles.featureHeaderImage} source={require('../Assets/Features/red.png')} />
        <Text style={styles.featureHeaderText}>Overview</Text>


        <Text style={styles.textStyle}>
          BMusician is an innovative platform for young music aspirants looking for online education and convenient learning to upscale their knowledge and boost their careers in the industry. We have re-imagined music learning by curating course curricula and internationally recognized certifications to help your talent get acknowledged on every platform, within and outside our country. We bring a premier learning experience from certified teachers with prominent musical backgrounds.
        </Text>
        <Text style={styles.overviewStyle}>
          At BMusician, we are committed to delivering the highest quality music education for each student, whether at the beginning of your musical journey or having substantial knowledge about this art form.
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.background}>
            <Text style={styles.header}>OUR <Text style={styles.highlight}>VISION</Text></Text>
            <Text style={styles.content}>
              Our vision is to spread the beauty of musical art and help aspirants experience the magic through an integrated learning platform, harmonizing traditional principles with cutting-edge technology. Our goal is to advocate for Indian music among Residents and Non-Resident Indians (NRIs) and cultivate a worldwide community of music enthusiasts, ensuring that high-quality music education is within reach for all.
            </Text>
            <View style={styles.listItem}>
              <Image source={require('../Assets/Icon/musics.png')} style={styles.icon} />
              <Text style={styles.listContent}>We provide both standard and accelerated courses</Text>
            </View>
            <View style={styles.listItem}>
              <Image source={require('../Assets/Icon/musics.png')} style={styles.icon} />
              <Text style={styles.listContent}>We bring tutors from prominent musical gharanas</Text>
            </View>
            <View style={styles.listItem}>
              <Image source={require('../Assets/Icon/musics.png')} style={styles.icon} />
              <Text style={styles.listContent}>We provide ease and convenient learning for students of all ages</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionMission}>
          <View style={styles.background}>
            <Text style={styles.header}>OUR<Text style={styles.highlight}> MISSION</Text></Text>
            <Text style={styles.content}>
              At BMusician, our primary mission is to transform the online musical education landscape for students in alignment with the current market demands for remote learning. Our faculty strives to deliver effective and enjoyable learning experiences through curated curriculums and redefined methods.
            </Text>
            <View style={styles.listItem}>
              <Image source={require('../Assets/Icon/musics.png')} style={styles.icon} />
              <Text style={styles.listContent}>We prepare students for graded music exams</Text>
            </View>
            <View style={styles.listItem}>
              <Image source={require('../Assets/Icon/musics.png')} style={styles.icon} />
              <Text style={styles.listContent}>We integrate traditional and digital learning environments</Text>
            </View>
            <View style={styles.listItem}>
              <Image source={require('../Assets/Icon/musics.png')} style={styles.icon} />
              <Text style={styles.listContent}>We personalize one-on-one sessions</Text>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.featureSection}>
          <Image style={styles.featureHeaderImage} source={require('../Assets/Features/red.png')} />
          <Text style={styles.featureHeaderText}>
            OUR TOP <Text style={styles.highlight}>FEATURES</Text>
          </Text>
          <View style={styles.featureContainer}>
            <Image style={styles.featureImage} source={require('../Assets/Features/Inbuilt.png')} />
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>In-Built LIVE classroom</Text>
              <Text style={styles.featureDescription}>
                High quality, Smooth LIVE classes through a customized in-built video call classroom that works on any browser and phone via App!
              </Text>
            </View>
          </View>
          <View style={styles.featureContainer}>
            <Image style={styles.featureImage} source={require('../Assets/Features/Dashboard.png')} />
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>Powerful Dashboard</Text>
              <Text style={styles.featureDescription}>
                Track course progress, watch class recordings/assignments, view upcoming class schedule and much more on your sophisticated Bmusician Dashboard!
              </Text>
            </View>
          </View>
          <View style={styles.featureContainer}>
            <Image style={styles.featureImage} source={require('../Assets/Features/Assign.png')} />
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>Assignments, Recordings and more.</Text>
              <Text style={styles.featureDescription}>
                Video/MCQ based assignments, Easy Subscriptions, LIVE Class recording options, Class Reminders, and much more!
              </Text>
            </View>
          </View>
          <View style={styles.featureContainer}>
            <Image style={styles.featureImage} source={require('../Assets/Features/schedule.png')} />
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>Schedule/ Reschedule - Flexibility</Text>
              <Text style={styles.featureDescription}>
                One click subscribe to schedule your classes. Use inbuilt calendar to view/ reschedule/ cancel classes for maximum flexibilty!
              </Text>
            </View>
          </View>
          <View style={styles.featureContainer}>
            <Image style={styles.featureImage} source={require('../Assets/Features/Teacher.png')} />
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>Great for Teachers</Text>
              <Text style={styles.featureDescription}>
                Create Teacher Profile, Create Courses, Add Timeslots, Set Payscale, Upload Videos & View/Correct Assignments and various other features!
              </Text>
            </View>
          </View>
          <View style={styles.featureContainer}>
            <Image style={styles.featureImage} source={require('../Assets/Features/Support.png')} />
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>24/7 Quick Support</Text>
              <Text style={styles.featureDescription}>
                The Bmusician Customer support will be available assist and respond to the questions of Students and Teachers 24/7!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.socialMediaContainer}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/bmusicianofficial/")}>
            <Image source={require('../Assets/SocialMedia/fb.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.youtube.com/Bmusician/videos")}>
            <Image source={require('../Assets/SocialMedia/utub.png')} style={{ width: 90, height: 90, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/bmusicianofficial?igsh=MXJvMXh4eWVnbDcwaw==")}>
            <Image source={require('../Assets/SocialMedia/insta.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>

        <Text style={styles.ceoName}>Surendran Ravindran</Text>
        <Text style={styles.ceoTitle}> FOUNDER & CEO</Text>
        <View style={styles.separator} />

        <View>
          <Text style={styles.contactHeader}>Contact us!</Text>
          <View style={styles.contactContainer}>
            <Image source={require('../Assets/Icon/call.png')} style={styles.contact} />
            <Text style={styles.contactText}>(91) 9952912494 (India)</Text>
          </View>
          <View style={styles.contactContainer}>
            <Image source={require('../Assets/Icon/call.png')} style={styles.contact} />
            <Text style={styles.contactText}>(65) 90674634 (Singapore)</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <Text style={styles.contactHeader}>Contact Information</Text>
        <View style={styles.featureContainer}>
          <Image style={styles.locationIcon} source={require('../Assets/Icon/location.png')} />
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>BMUSICIAN (HQ)</Text>
            <Text style={styles.addressText}>
              22 Sin Ming Lane, #06-76 Midview City, Singapore 573969
            </Text>
          </View>
        </View>
        <View style={styles.featureContainer}>
          <Image style={styles.locationIcon} source={require('../Assets/Icon/location.png')} />
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>BMUSICIAN (India)</Text>
            <Text style={styles.addressText}>
              The Hive L3 VR Chennai, Anna Nagar West, Anna Nagar, Chennai, Tamil Nadu 600040
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUsPage;

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    marginLeft: 5,
    height: 130,
  },
  mainImage: {
    width: '100%',
    marginLeft: 5,
    height: 500,
  },
  textStyle: {
    padding: 15,
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    textAlign: 'justify',
    lineHeight: 22,
  },
  overviewImage: {
    width: 220,
    marginLeft: 5,
    height: 150,
  },
  overviewStyle: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    textAlign: 'justify',
    lineHeight: 22,
    marginTop: -20,
  },
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
  },
  sectionMission: {
    flex: 1,
    marginTop: 20,
  },
  background: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  highlight: {
    color: '#ED4D57',
  },
  content: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    textAlign: 'justify',
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  listContent: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    textAlign: 'justify',
    flex: 1,
    marginRight: 10,
  },
  separator: {
    marginTop: 40,
    height: 5,
    width: '100%',
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  contact: {
    marginTop: 25,
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  featureImage: {
    marginTop: 40,
    width: 50,
    height: 50,
    margin: 5,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingRight: 10,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    margin: 5,
  },
  featureDescription: {
    flex: 1,
    marginLeft: 5,
    fontSize: 17,
    lineHeight: 22,
    marginRight: 10,
    textAlign: 'justify',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: -10,
    marginHorizontal: 30,
  },
  socialIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  featureHeaderImage: {
    width: 100,
    height: 60,
    alignSelf: 'center',
  },
  featureHeaderText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '900',
    alignSelf: 'center',
  },
  ceoName: {
    padding: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: 'black',
    marginTop: -10,
  },
  ceoTitle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 20,
    marginTop: -35,
    marginBottom: -20,
    color: 'black',
  },
  contactHeader: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  contactContainer: {
    flexDirection: 'row',
  },
  contactText: {
    marginTop: 22,
    marginLeft: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  locationIcon: {
    width: 30,
    height: 30,
    marginTop: 30,
    marginLeft: 15,
  },
  addressContainer: {
    flex: 1,
    marginLeft: 17,
    marginTop: 20,
  },
  addressTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 17,
    marginTop: 5,
    color: 'black'
  },
});
