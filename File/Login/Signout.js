import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AuthContext } from '../Login/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const SignOut = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.footerButtonText}>Are you sure you want to log out?</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8, // Adjust width of content for better UI
    textAlign: 'center', // Ensure text is centered
  },
  footerButtonText: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#ed4d57',  // Text color set to #ed4d57
    marginBottom: 20,  // Space between text and button
  },
  signOutButton: {
    backgroundColor: '#ed4d57',  // Set background color for the button
    paddingVertical: 10,  // Vertical padding for the button
    paddingHorizontal: 30,  // Horizontal padding for the button
    borderRadius: 25,  // Rounded corners for the button
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButtonText: {
    color: 'white',  // White text for the Sign Out button
    fontSize: 16,  // Font size for the button text
    fontWeight: 'bold',  // Button text in bold
  },
});

export default SignOut;
