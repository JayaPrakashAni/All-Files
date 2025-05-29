import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'


const CoursesPage = ({ navigation }) => {

  const guitar = () => {
    navigation.navigate('GuitarType');
  };
  const mridangam = () => {
    navigation.navigate('Mridangam');
  };
  const cajon = () => {
    navigation.navigate('Cajon');
  };

  const bharatanatyam = () => {
    navigation.navigate('Bharatanatyam');
  };
  const djembe = () => {
    navigation.navigate('Djembe');
  };

  const violin = () => {
    navigation.navigate('Violin');
  };
 
  const drums = () => {
    navigation.navigate('Drums');
  };
 
  const piano = () => {
    navigation.navigate('Piano');
  };
  const keyboard = () => {
    navigation.navigate('Keyboard');
  };
  const vocal = () => {
    navigation.navigate('Vocal');
  };
  const yoga = () => {
    navigation.navigate('Yoga');
  };
  const flute = () => {
    navigation.navigate('Flute');
  };
  const morsing = () => {
    navigation.navigate('Morsing');
  };
  const kanjira = () => {
    navigation.navigate('Kanjira');
  };
  const ghatam = () => {
    navigation.navigate('Ghatam');
  };
  const Saxophone = () => {
    navigation.navigate('Saxophone');
  };
  const Tabla = () => {
    navigation.navigate('Tabla');
  };
  const harmonium = () => {
    navigation.navigate('Harmonium');
  };
  const konnakol = () => {
    navigation.navigate('Konnakol');
  };
  const veena= () => {
    navigation.navigate('Veena');
  };

  const ukulele = () => {
    navigation.navigate('Ukulele');
  };

  const mandolin  = () => {
    navigation.navigate('Mandolin');
  };


  return (
    <ScrollView>
    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={guitar}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Guitar.jpg')} />
        <Text style={styles.textStyle}>GUITAR</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={mridangam}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/mridangam.png')} />
        <Text style={styles.textStyle}>MRIDANGAM</Text>
      </TouchableOpacity>
    </View>
 
    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={cajon}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Cajon.jpg')} />
        <Text style={styles.textStyle}>CAJON</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      {/* <TouchableOpacity style={styles.imgContainer} onPress={guitar}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Clarinet.jpg')} />
        <Text style={styles.textStyle}>CLARINET</Text>
      </TouchableOpacity> */}
    </View>

    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={bharatanatyam}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Bharatanatyam.jpg')} />
        <Text style={styles.textStyle}>BHARATANATYAM</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={djembe}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Djembe.png')} />
        <Text style={styles.textStyle}>DJEMBE</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={drums}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Drums.jpg')} />
        <Text style={styles.textStyle}>DRUMS</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={flute}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Flute.jpg')} />
        <Text style={styles.textStyle}>FLUTE</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={ghatam}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Ghatam.jpg')} />
        <Text style={styles.textStyle}>GHATAM</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={harmonium}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Harmonium.png')} />
        <Text style={styles.textStyle}>HARMONIUM</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={konnakol}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/vocal.jpg')} />
        <Text style={styles.textStyle}>KONNAKOL</Text>
      </TouchableOpacity>

    </View>

    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={kanjira}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Kanjira.jpg')} />
        <Text style={styles.textStyle}>KANJIRA</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={keyboard}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Keyboard.png')} />
        <Text style={styles.textStyle}>KEYBOARD</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={morsing}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Morsing.jpg')} />
        <Text style={styles.textStyle}>MORSING</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={piano}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Piano.jpg')} />
        <Text style={styles.textStyle}>PIANO</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={Saxophone}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Saxophone.jpg')} />
        <Text style={styles.textStyle}>SAXOPHONE</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={Tabla}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Tabla.jpg')} />
        <Text style={styles.textStyle}>TABLA</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={veena}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Veenai.jpg')} />
        <Text style={styles.textStyle}>VEENAI</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={yoga}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Yoga.jpg')} />
        <Text style={styles.textStyle}>YOGA</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.flatListContainer}>
      <TouchableOpacity style={styles.imgContainer} onPress={violin}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/Violin.jpg')} />
        <Text style={styles.textStyle}>VIOLIN</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={vocal}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/vocal.jpg')} />
        <Text style={styles.textStyle}>VOCAL</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={ukulele}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/ukulele.png')} />
        <Text style={styles.textStyle}>UKULELE</Text>
      </TouchableOpacity>

      <View style={styles.separator} /> 

      <TouchableOpacity style={styles.imgContainer} onPress={mandolin}>
        <Image style={styles.imgStyle} source={require('../Assets/Instruments/mandolin.jpg')} />
        <Text style={styles.textStyle}>MANDOLIN</Text>
      </TouchableOpacity>
    </View>


  </ScrollView>

  )
}

export default CoursesPage;

const styles = StyleSheet.create({
  imgContainer: {
    padding: 20,
    alignItems: 'center',
  },

  imgStyle: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  flatListContainer: {
    backgroundColor: "black",
    marginVertical: 10,
    marginHorizontal: 16,
    paddingBottom: 2,
    
 
  },
  separator: {
    height: 20,
    backgroundColor: "#f1f2f6",
    
  }
})