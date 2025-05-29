import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StringGuruList = () => {
    const navigation = useNavigation();
    const [gurus, setGurus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGurus = async () => {
            try {
                const response = await fetch('https://my.bmusician.com/app/GetGurus/?faculty=string');
                const json = await response.json();
                if (json.success) {
                    setGurus(json.gurus);
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
    };

    const numColumns = 2;
    return (
        <FlatList
            data={gurus}
            keyExtractor={(item) => item.ID}
            numColumns={numColumns}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item, index }) => (
                <View style={[
                    styles.itemWrapper,
                    index % numColumns === 0 ? styles.rowStart : styles.rowEnd, // Adjust alignment for first and second item in row
                ]}>
                    <TouchableOpacity
                        onPress={() => GuruDetail(item.ID)}
                        style={[
                            styles.guruContainer,
                            index === gurus.length - 1 && gurus.length % numColumns !== 0 && styles.lastItemContainer
                        ]}
                    >
                        <Image
                            source={item.ProfilePicture ? { uri: `https://my.bmusician.com${item.ProfilePicture}` } : require('../Assets/Instruments/filmGuitar.png')}
                            style={styles.guruImage}
                            resizeMode="cover"
                        />
                        <Text style={styles.guruName} numberOfLines={1} ellipsizeMode="tail">
                            {item.Name}
                        </Text>
                        <Text style={styles.specialization}>{item.SpecializationNames.join(', ')}</Text>
                    </TouchableOpacity>
                </View>
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
    flatListContent: {
        paddingHorizontal: 5,
    },
    itemWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    rowStart: {
        justifyContent: 'flex-start',
    },
    rowEnd: {
        justifyContent: 'flex-end',
    },
    guruContainer: {
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
        margin: 5,
        width: (Dimensions.get('window').width / 2) - 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    lastItemContainer: {
        alignSelf: 'center', // Center the last item if it’s alone in the row
        width: (Dimensions.get('window').width / 2) - 15, // Keep it square like other items
    },
    guruImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
    guruName: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Mulish-regular',
        color: 'black',
        marginTop: 8,
    },
    specialization: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'Mulish-regular',
    },
});

export default StringGuruList;
