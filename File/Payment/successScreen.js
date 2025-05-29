import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentSuccessScreen = () => {
  const [message, setMessage] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const enrollID = route?.params?.enrollID; // Get the enrollID from route params

  const updateEnrollment = async () => {
    try {
      const response = await fetch(`https://my.bmusician.com/app/UpdateEnroll?enrollid=${enrollID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setMessage(jsonResponse.message);
          Alert.alert('Success', jsonResponse.message);
        } else {
          console.error('Failed to update enrollment:', jsonResponse.message);
          Alert.alert('Error', jsonResponse.message);
        }
      } else {
        console.error('Failed to update enrollment:', response.status);
        Alert.alert('Error', `Failed to update enrollment: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.toString());
    }
  };

  useEffect(() => {
    if (enrollID) {
      updateEnrollment();
    }
  }, [enrollID]);

  return (
    <View style={styles.container}>
      <Image source={require('../Assets/Icon/success.png')} style={styles.successImage} />
      {message ? (
        <>
          <Text style={styles.successText}><Icon name="check-circle" size={24} color="green" /> {message}</Text>
          <View style={styles.card}>
            <Icon name="account-check-outline" size={30} color="green" />
            <Text style={styles.cardText}>Teacher Allocation Process has been Initiated.</Text>
          </View>
          <View style={styles.card}>
            <Icon name="phone-in-talk" size={30} color="purple" />
            <Text style={styles.cardText}>We will contact you shortly.</Text>
          </View>
          <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  enrollmentdone: {
    fontSize: 18,
    color: 'purple',
    marginTop: 20, 
    textAlign: 'center',
  },
  enrollment: {
    fontSize: 18,
    color: 'purple',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default PaymentSuccessScreen;
