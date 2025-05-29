import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Login/AuthContext';

const LoginLogout = ({ navigation }) => {
  const { userInfo, signOut, errorMessage } = useContext(AuthContext);

  const handleLogin = () => {
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  const handleLogout = () => {
    signOut(); // Call signOut function from context
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],  // After logout, redirect to the Login screen
    });
  };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text> // Display error message if there's an issue
      ) : null}

      {userInfo ? (
        // If user is logged in, show the Logout button
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Ionicons name="exit-outline" size={22} style={styles.icon} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      ) : (
        // If user is not logged in, show the Login button
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Ionicons name="log-in-outline" size={22} style={styles.icon} />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ED4D57',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LoginLogout;
