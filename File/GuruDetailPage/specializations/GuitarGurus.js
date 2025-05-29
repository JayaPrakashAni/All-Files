import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import defaultImage from '../../Assets/Instruments/filmGuitar.png'
import { useNavigation } from '@react-navigation/native'; 

const GuitarGurus = () => {
    const navigation = useNavigation();
    const [gurus, setGurus] = useState([]);

    useEffect(() => {
        fetch('https://my.bmusician.com/app/GetGurus/?faculty=string')
            .then(response => response.json())
            .then(data => {
                const guitarGurus = data.gurus.filter(guru =>
                    guru.SpecializationNames.includes('guitar')
                );
                setGurus(guitarGurus);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);
    
    const GuruDetail = (guruId) => {
        navigation.navigate('gurudetail', { guruId });
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={gurus}
                numColumns={2}
                keyExtractor={item => item.ID}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => GuruDetail(item.ID)} style={styles.guruItem}>
                        <Image
                            source={item.ProfilePicture ? { uri: `https://my.bmusician.com${item.ProfilePicture}` } : defaultImage}
                            style={styles.guruImage}
                        />
                        <Text style={styles.guruName}>{item.Name}</Text>
                        <Text style={styles.guruSpecialization}>{item.SpecializationNames.join(', ')}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    guruItem: {
        flex: 1/2,
        alignItems: 'center',
        margin: 5,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    guruImage: {
        width: 180,
        height: 180,
        borderRadius: 10,
        marginBottom:10,
    },
    guruName: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: 'black'
    },
    guruSpecialization: {
        fontSize: 14,
        color: 'gray',
         textAlign: 'center',

    }
});

export default GuitarGurus;
