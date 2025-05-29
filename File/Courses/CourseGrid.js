import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';



const data = [
  { id: '1', course: 'GUITAR', image: require('../Assets/Instruments/filmGuitar.png'), screen: 'Guitar courses' },
  { id: '2', course: 'MRIDANGAM', image: require('../Assets/Instruments/mridangam.png'), screen: 'Mridangam' },
  { id: '3', course: 'VIOLIN', image: require('../Assets/Instruments/Violin.jpg'), screen: 'Violin' },
  { id: '4', course: 'CAJON', image: require('../Assets/Instruments/Cajon.jpg'), screen: 'Cajon' },
  { id: '5', course: 'BHARATANATYAM', image: require('../Assets/Instruments/Bharatanatyam.jpg'), screen: 'Bharatanatyam' },
  { id: '6', course: 'DJEMBE', image: require('../Assets/Instruments/Djembe.png'), screen: 'Djembe' },
  { id: '7', course: 'DRUMS', image: require('../Assets/Instruments/Drums.jpg'), screen: 'Drums' },
  { id: '8', course: 'FLUTE', image: require('../Assets/Instruments/Flute.jpg'), screen: 'Flute' },
  { id: '9', course: 'GHATAM', image: require('../Assets/Instruments/Ghatam.jpg'), screen: 'Ghatam' },
  { id: '10', course: 'HARMONIUM', image: require('../Assets/Instruments/Harmonium.png'), screen: 'Harmonium' },
  { id: '11', course: 'KONNAKOL', image: require('../Assets/Instruments/vocal.jpg'), screen: 'Konnakol' },
  { id: '12', course: 'KANJIRA', image: require('../Assets/Instruments/Kanjira.jpg'), screen: 'Kanjira' },
  { id: '13', course: 'KEYBOARD', image: require('../Assets/Instruments/Keyboard.png'), screen: 'Keyboard' },
  { id: '14', course: 'MORSING', image: require('../Assets/Instruments/Morsing.jpg'), screen: 'Morsing' },
  { id: '15', course: 'PIANO', image: require('../Assets/Instruments/Piano.jpg'), screen: 'Piano' },
  { id: '16', course: 'SAXOPHONE', image: require('../Assets/Instruments/Saxophone.jpg'), screen: 'Saxophone' },
  { id: '17', course: 'TABLA', image: require('../Assets/Instruments/Tabla.jpg'), screen: 'Tabla' },
  { id: '18', course: 'VEENAI', image: require('../Assets/Instruments/veena.png'), screen: 'Veena' },
  { id: '19', course: 'YOGA', image: require('../Assets/Instruments/Yoga.jpg'), screen: 'Yoga' },
  { id: '20', course: 'VOCAL', image: require('../Assets/Instruments/vocal.jpg'), screen: 'Vocal' },
  { id: '21', course: 'UKULELE', image: require('../Assets/Instruments/ukulele.png'), screen: 'Ukulele' },
  { id: '22', course: 'MANDOLIN', image: require('../Assets/Instruments/mandolin.jpg'), screen: 'Mandolin' },

];



const CourseList = () => {
 
  const navigation = useNavigation();

  const renderItem = ({ item }) => (

    <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.label}>{item.course}</Text>
    </TouchableOpacity>


  );
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
    />
  )
}

export default CourseList;

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 10,
   
  },

  label: {
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});