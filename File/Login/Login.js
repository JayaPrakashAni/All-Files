import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "./AuthContext";
import Icon from 'react-native-vector-icons/Feather';

const LoginScreen = ({ navigation }) => {
  const { login, errorMessage, isLoading } = useContext(AuthContext);
  const signInLogo = require('../Assets/Icon/cmpylogo.png');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Missing Credentials", "Please enter both username and password.");
      return;
    }

    // Login process
    const result = await login(username, password); // Await login here

    if (errorMessage) {
      // If login fails, show an alert and stay on the login screen
      Alert.alert('Login Failed', errorMessage);  // Ensure errorMessage is properly set
    } else if (result.success) {
      // If login is successful, navigate to the Home screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      // Handle cases where login returns an unsuccessful response
      Alert.alert(
        "Login Failed",
        "The username or password you entered is incorrect! Please try again."
      );
    }
  };

  const Separator = () => (
    <View style={styles.separatorContainer}>
      <View style={styles.line} />
      <Text style={styles.separatorText}>or</Text>
      <View style={styles.line} />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={styles.background}>
        <Image style={styles.logo} source={signInLogo} />
        <View style={styles.container}>
          <View style={styles.wrapper}>

            <TextInput
              style={styles.uinput}
              placeholder="Enter Username"
              placeholderTextColor="gray"
              value={username}
              onChangeText={setUsername}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter Password"
                placeholderTextColor="gray"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Icon
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.signInButton, (!username || !password) && { opacity: 0.5 }]}
              onPress={handleLogin}
              disabled={!username || !password}
            >
              <Text style={styles.signInButtonText}>Login</Text>
            </TouchableOpacity>

            <Separator />

            <View style={styles.accountContainer}>
              <Text style={styles.account}>Don't have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUPlink}> Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.skipContainer}>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => navigation.navigate('Back')}
              >
                <Icon name="home" size={20} color="#183151" />
                <Text style={styles.skipText}>Browse Courses</Text>
                <Icon name="chevron-right" size={20} color="#183151" />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  uinput: {
    width: '100%',
    height: 50,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 30,
    width: '100%',
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 20,
    height: 50,
    fontSize: 16,
    color: 'black',
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#183151',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  account: {
    fontSize: 16,
    color: 'black',
  },
  signUPlink: {
    color: '#1A73E8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#183151',
  },
  skipText: {
    fontSize: 16,
    color: '#183151',
    marginHorizontal: 10,
    fontWeight: '500',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D3D3D3',
  },
  separatorText: {
    marginHorizontal: 10,
    color: 'grey',
    fontSize: 18,
  },
});

export default LoginScreen;
