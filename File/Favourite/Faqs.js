import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FAQScreen = () => {
    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await fetch('https://my.bmusician.com/app/faqs');
                const json = await response.json();
                if (json.success) {
                    setFaqs([...json.data1, ...json.data2, ...json.data3, ...json.data4]); // Combine all FAQ sections if needed
                } else {
                    setError("Failed to fetch FAQs");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.questionContainer}>
                <Ionicons name="help-circle-outline" size={24} color="#ED4D57" />
                <Text style={styles.question}>{item.Question}</Text>
            </View>
            <Text style={styles.answer}>{item.Answer}</Text>
        </View>
    );

    if (isLoading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#ED4D57" /></View>;
    }

    if (error) {
        return <View style={styles.centered}><Text>{error}</Text></View>;
    }

    return (
        <FlatList
            data={faqs}
            renderItem={renderItem}
            keyExtractor={item => item.ID.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    listContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    itemContainer: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    questionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        flexWrap: 'wrap', // Allow text to wrap properly
    },
    question: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ED4D57',
        marginLeft: 10,
        flex: 1,
    },
    answer: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        textAlign: 'justify',
    }
});

export default FAQScreen;
