import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';



const data = [
  { id: '1', course: 'Vocal Gurus', image: require('../Assets/Explore/vo.jpg'), screen: 'Vocal Gurus' },
  { id: '2', course: 'String Gurus', image: require('../Assets/Explore/str.jpg'), screen: 'String Gurus' },
  { id: '3', course: 'Percussion Gurus', image: require('../Assets/Explore/per.jpg'), screen: 'Percussion Gurus' },
  { id: '4', course: 'Keyboard Gurus', image: require('../Assets/Explore/arr.png'), screen: 'Keys Gurus' },
  { id: '5', course: 'Wind Gurus', image: require('../Assets/Explore/fl.jpg'), screen: 'Wind Gurus' },
  { id: '6', course: 'Bharatanatyam Gurus', image: require('../Assets/Explore/oth.jpg'), screen: 'Yoga Gurus' },
];



const GuruList = () => {

  const navigation = useNavigation();

  const renderItem = ({ item }) => (

    <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.label}>{item.course}</Text>
      <View style={{
        height: 4,
        width: "100%",
        backgroundColor: "#E0E0E0",
        marginTop: 10,
        marginBottom: 20,
      }} />
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

export default GuruList;

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
    height: 300,
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