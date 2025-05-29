import React from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RemoveAccountScreen = () => {

  const handleRemoveAccount = () => {
    // Show confirmation alert
    Alert.alert(
      'Remove Account',
      'Are you sure want to remove your account Permanently ?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            // Open the URL in the browser if confirmed
            const url = 'http://my.bmusician.com/academy/accountsettings';
            Linking.openURL(url).catch((err) =>
              console.error('An error occurred while trying to open the URL:', err)
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Do you want to remove your account?</Text>
      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveAccount}>
        <Ionicons name="trash-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Remove Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RemoveAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  removeButton: {
    flexDirection: 'row',
    backgroundColor: '#ed4d57',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
