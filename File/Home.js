import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, Dimensions, ScrollView } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import AutoScrollingGurus from './GuruDetailPage/AutoScrollingGuru';
import { useNavigation } from '@react-navigation/native';
import Testimonials from '../File/Favourite/StudentTestimonials';




const courseScreenMap = {
  GUITAR: 'Guitar courses',
  VIOLIN: 'Violin',
  MRIDANGAM: 'Mridangam',
  DRUMS: 'Drums',
  CAJON: 'Cajon',
  PIANO: 'Piano',
  KEYBOARD: 'Keyboard',
  VOCAL: 'Vocal',
  YOGA: 'Yoga',
  FLUTE: 'Flute',
  MORSING: 'Morsing',
  KANJIRA: 'Kanjira',
  GHATAM: 'Ghatam',
  SAXOPHONE: 'Saxophone',
  TABLA: 'Tabla',
  HARMONIUM: 'Harmonium',
  KONNAKOL: 'Konnakol',
  VEENA: 'Veena',
  BHARATANATYAM: 'Bharatanatyam',
  UKULELE: 'Ukulele',
  MANDOLIN: 'Mandolin',
  DJEMBE: 'Djembe',
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const BmusCourses = [
    { key: '1', value: 'GUITAR' },
    { key: '2', value: 'MRIDANGAM' },
    { key: '3', value: 'VIOLIN' },
    { key: '4', value: 'KEYBOARD' },
    { key: '5', value: 'SAXOPHONE' },
    { key: '6', value: 'YOGA' },
    { key: '7', value: 'DRUMS' },
    { key: '8', value: 'PIANO' },
    { key: '9', value: 'VOCAL' },
    { key: '10', value: 'SITAR' },
    { key: '11', value: 'UKULELE' },
    { key: '12', value: 'BHARATANATYAM' },
    { key: '13', value: 'VEENA' },
    { key: '14', value: 'KONNAKOL' },
    { key: '15', value: 'TABLA' },
    { key: '16', value: 'MANDOLIN' },
    { key: '17', value: 'HARMONIUM' },
    { key: '18', value: 'GHATAM' },
    { key: '19', value: 'KANJIRA' },
    { key: '20', value: 'MORSING' },
    { key: '21', value: 'CAJON' },
    { key: '22', value: 'DJEMBE' },
    { key: '23', value: 'CLARINET' },
    { key: '24', value: 'FLUTE' },
  ];

  const screenWidth = Dimensions.get("window").width;
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const searchRef = useRef();
  const verticalData = [{}];

  const onSearch = (text) => {
    setSearchText(text);
    if (text) {
      const courseKey = text.toUpperCase();
      if (courseScreenMap[courseKey]) {
        navigateToCourseDetail(courseKey);
        setSearchText(''); // Clear the search text
        setData([]);
      } else {
        const filteredData = BmusCourses.filter(item =>
          item.value.toUpperCase().includes(courseKey)
        );
        setData(filteredData);
      }
    } else {
      setData([]);
    }
  };

  const Guitar = () => {
    navigation.navigate('Guitar courses');
  };
  const Violin = () => {
    navigation.navigate('Violin');
  };
  const piano = () => {
    navigation.navigate('Piano');
  };
  const mridangam = () => {
    navigation.navigate('Mridangam');
  };

  const RaviGuru = () => {
    navigation.navigate('Ravindran');
  };

  const PremaGuru = () => {
    navigation.navigate('Prema');
  };

  const SandipGuru = () => {
    navigation.navigate('Sandip');
  };

  const shyluGuru = () => {
    navigation.navigate('shylu');
  };

  const ramaGuru = () => {
    navigation.navigate('Rama');
  };

  const suruGuru = () => {
    navigation.navigate('suru');
  };



  const navigateToCourseDetail = (courseValue) => {
    const screenName = courseScreenMap[courseValue.toUpperCase()];
    if (screenName) {
      navigation.navigate(screenName);
    } else {
      console.warn("No screen found for", courseValue);
    }
  };

  const services = [
    { title: "Guitar", icon: require('../File/Assets/Grid/guitar.png') },
    { title: "Mridangam", icon: require('../File/Assets/Grid/mri.png') },
    { title: "Drums", icon: require('../File/Assets/Grid/drums.png') },
    { title: "Vocal", icon: require('../File/Assets/Grid/vocal.png') },
    { title: "Tabla", icon: require('../File/Assets/Grid/Tabla.png') },
    { title: "Piano", icon: require('../File/Assets/Grid/piano.png') },
    { title: "Violin", icon: require('../File/Assets/Grid/violin.png') },
    { title: "Djembe", icon: require('../File/Assets/Grid/djembe.png') }
  ];

  const MusicGrid = () => {
    const specificItems = services.filter(service => service.title === "Violin" || service.title === "Djembe");
    const navigationMap = {
      "Guitar": "Guitar courses",
      "Mridangam": "Mridangam",
      "Drums": "Drums",
      "Vocal": "Vocal",
      "Tabla": "Tabla",
      "Piano": "Piano",
      "Violin": "Violin",
      "Djembe": "Djembe",
    };

    const handlePress = (serviceTitle) => {
      const screenName = navigationMap[serviceTitle];
      if (screenName) {
        navigation.navigate(screenName);
      } else {
        console.warn("No screen found for", serviceTitle);
      }
    };

    return (
      <ScrollView contentContainerStyle={styles.containers}>
        {services.slice(0, 6).map((service, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handlePress(service.title)}>
            <Image source={service.icon} style={styles.icon} resizeMode="cover" />
            <Text style={styles.titles}>{service.title}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.specificGridContainer}>
          {specificItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.specificCard} onPress={() => handlePress(item.title)}>
              <Image source={item.icon} style={styles.specificIcon} resizeMode="cover" />
              <Text style={styles.titles}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderVertialItem = () => (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.searchBarContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../File/Assets/Icon/searchIcon.png')}
            style={{ width: 20, height: 20 }}
          />
        </View>

        <TextInput
          style={styles.searchInput}
          onChangeText={onSearch}
          value={searchText}
          placeholder='Search For Courses'
          returnKeyType="search"
          onSubmitEditing={() => navigateToCourseDetail(searchText)}
        />
      </View>

      {searchText && data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToCourseDetail(item.value)}>
              <Text style={styles.courseText}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={{ height: 200, width: screenWidth }}>
        <Image source={require('../File/Assets/Slider/ravi.png')} style={{ height: 300, width: screenWidth, resizeMode: 'cover' }} />
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
          <Text style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '100%',
            padding: 10,
            marginTop: 10,
          }}>
            ONE-TO-ONE, {' '}
            <Text style={{ color: '#ED4D57' }}>ONLINE MUSIC CLASSES</Text>
            {' '} FROM TOP MUSICIANS
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <MusicGrid />
      </View>

      <View style={{
        height: 8,
        width: "100%",
        backgroundColor: "#E0E0E0",
        marginVertical: 20,
      }} />

      <View style={{ padding: -10 }}>
        <Text style={{ color: '#ED4D57', fontSize: 24, fontWeight: '700', padding: 5,marginLeft: 10 }}>Celebrated Gurus</Text>
        {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: '300', paddingLeft: 7, marginTop: -6 }}>
          Real lives, real impact
        </Text> */}
      </View>

      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>

          <TouchableOpacity onPress={RaviGuru}>
            <Image style={styles.guiimg} source={require('./Assets/Guru/ravi.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }} onPress={PremaGuru}>
            <Image style={styles.guiimg} source={require('./Assets/Guru/prema.png')} />
          </TouchableOpacity>

       

          <TouchableOpacity style={{ flex: 1 }} onPress={shyluGuru}>
            <Image style={styles.guiimg} source={require('./Assets/Guru/shy.jpg')} />
            <View style={{
              position: 'absolute',
              bottom: 10,
              left: 20,
              padding: 5
            }}>
              <Text style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'Mulish-Regular',
              }}>

              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }} onPress={ramaGuru}>
            <Image style={styles.guiimg} source={require('./Assets/Guru/rama.png')} />
            <View style={{
              position: 'absolute',
              bottom: 10,
              left: 20,
              padding: 5
            }}>
              <Text style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'Mulish-Regular',
              }}>

              </Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={{ flex: 1 }} onPress={suruGuru}>
            <Image style={styles.guiimg} source={require('../File/Assets/Guru/special/sure.png')} />
            <View style={{
              position: 'absolute',
              bottom: 10,
              left: 20,
              padding: 5
            }}>
              <Text style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'Mulish-Regular',
              }}>

              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1, }} onPress={SandipGuru}>
            <Image style={styles.guiimg} source={require('../File/Assets/Guru/sandip.png')} />
          </TouchableOpacity>


        </ScrollView>
      </View>

      <View style={{
        height: 8,
        width: "100%",
        backgroundColor: "#E0E0E0",
        marginVertical: 20,
      }} />

      <View>
        <AutoScrollingGurus />
      </View>

      <View style={{
        height: 8,
        width: "100%",
        backgroundColor: "#E0E0E0",
        marginVertical: 20,
      }} />

      <View style={styles.container}>
        <Text style={styles.heading}>Our Popular Courses</Text>
        <View style={styles.textContainer}>
          <Text style={styles.subHeading}>
            Taught by world 's
          </Text>
          <Image
            source={require('../File/Assets/Icon/finest.png')}
            style={styles.image}
          />
          <Text style={styles.subHeading}>
            Gurus
          </Text>
        </View>
      </View>

      <View >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>

          <TouchableOpacity onPress={Guitar}>
            <Image style={styles.guiimg} source={require('./Assets/popularCourses/gpc.png')} />
            <Text style={{ fontSize: 18, marginLeft: 25, fontWeight: 'bold', marginTop: -40, color: 'white' }}>Guitar Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }} onPress={mridangam}>
            <Image style={styles.guiimg} source={require('./Assets/Slider/ravi.png')} />
            <Text style={{ fontSize: 18, marginLeft: 40, fontFamily: 'Mulish-Regular', fontWeight: 'bold', marginTop: -60, color: 'white' }}>Mridangam</Text>
            <Text style={{ fontSize: 18, marginLeft: 50, fontFamily: 'Mulish-Regular', fontWeight: 'bold', marginTop: -5, color: 'white' }}>Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1, }} onPress={Violin}>
            <Image style={styles.guiimg} source={require('../File/Assets/popularCourses/vpc.jpg')} />
            <Text style={{ fontSize: 18, marginLeft: 25, fontFamily: 'Mulish-Regular', fontWeight: 'bold', marginTop: -40, color: 'white' }}>Violin Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }} onPress={piano}>
            <Image style={styles.guiimg} source={require('./Assets/popularCourses/ppc.png')} />
            <View style={{
              position: 'absolute',
              bottom: 10,
              left: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 5
            }}>
              <Text style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'Mulish-Regular',
              }}>
                Piano Courses
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>


      <View style={{
        height: 8,
        width: "100%",
        backgroundColor: "#E0E0E0",
        marginVertical: 30,
      }} />

      

      <View>
        <Testimonials />
      </View>

    </View>
  );

  return (
    <FlatList
      data={verticalData}
      renderItem={renderVertialItem}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  Paybtn:
  {
    textAlign: 'center',
    padding: 20,
    fontSize: 24
  },
  container: {
    padding: 10,
    marginTop: -15,
  },
  heading: {
    color: '#ED4D57',
    fontSize: 24,
    fontWeight: '700',
    padding: 5,
  },
  headings: {
    color: '#ED4D57',
    fontSize: 24,
    fontWeight: '600',
    padding: 10,
    marginTop: -20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
  },
  subHeading: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 7,
  },
  image: {
    width: 50,
    height: 40,
    marginLeft: 10,
    marginTop: 10,
  },
  searchBarContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  courseText: {
    fontSize: 18,
    padding: 10,
  },
  guiimg: {
    margin: 6,
    width: 160,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  containers: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
  },
  card: {
    width: '30%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
    margin: '1%',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  specificGridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  specificCard: {
    width: '48%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: '1%',
    padding: 5,
  },
  specificIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});
