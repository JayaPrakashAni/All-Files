import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const VocalGuruList = () => {
    const navigation = useNavigation();

    const [gurus, setGurus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGurus = async () => {
            try {
                const response = await fetch('https://my.bmusician.com/app/GetGurus/?faculty=vocal');
                const json = await response.json();
                if (json.success) {
                    setGurus(json.gurus);
                    //console.log('GuruID>>>>', json.gurus[0].ID)
                } else {
                    setError("Failed to fetch gurus");
                }
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchGurus();
    }, []);

    if (isLoading) {
        return <View style={styles.centered}><Text>Loading...</Text></View>;
    }

    if (error) {
        return <View style={styles.centered}><Text>Error: {error}</Text></View>;
    }

    const GuruDetail = (guruId) => {
        navigation.navigate('gurudetail', { guruId });
    }

    return (
        <FlatList
            data={gurus}
            keyExtractor={item => item.ID}
            key={`two-columns-flatlist`}
            numColumns={2}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => GuruDetail(item.ID)} style={styles.guruContainer}>

                    <Image
                        source={item.ProfilePicture ? { uri: `https://my.bmusician.com${item.ProfilePicture}` } : require('../Assets/Instruments/vocal.jpg')}
                        style={styles.guruImage}
                        resizeMode='cover'
                    />
                    <Text style={styles.guruName} numberOfLines={1} ellipsizeMode='tail'>
                        {item.Name}
                    </Text>
                    <Text style={styles.specialization}>{item.SpecializationNames.join(', ')}</Text>

                </TouchableOpacity>

            )}
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    guruContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
        margin: 5,
        width: (Dimensions.get('window').width / 2) - 10,
    },
    guruImage: {
        width: '100%',
        //width: 180,
        height: 180,
        borderRadius: 10,
        resizeMode: 'cover'

    },
    guruName: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Mulish-regular',
        color: 'black',

    },
    specialization: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'Mulish-regular',
    }
});

export default VocalGuruList;
