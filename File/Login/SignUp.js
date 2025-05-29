import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUp = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Back',
        });
    }, [navigation]);

    // Hardcoded values
    const [age] = useState('31');
    const [gender] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber] = useState('');

    const TIMEZONE = 'India Standard Time';
    const DEVICE_ID = 'jayg-hayati';
    const IP = '127.0.0.1';
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const isValidPassword = (pwd) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        return regex.test(pwd);
    };

    useEffect(() => {
        if (
            username &&
            isValidPassword(password) &&
            firstName &&
            lastName &&
            email
        ) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [username, password, firstName, lastName, email]);

    const handleSignUp = async () => {
        if (!isValidPassword(password)) {
            Alert.alert(
                'Invalid Password',
                'Password must include one uppercase, one number, and one special character.'
            );
            return;
        }

        const requestData = {
            username,
            password,
            age,
            gender,
            firstname: firstName,
            lastname: lastName,
            email,
            contactnumber: phoneNumber,
            timezone: TIMEZONE,
            deviceid: DEVICE_ID,
            ip: IP,
        };

        try {
            const response = await fetch(
                'https://my.bmusician.com/account/mobilesignup',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(requestData).toString(),
                }
            );

            const jsonResponse = await response.json();

            if (jsonResponse.success) {
                Alert.alert(
                    'Account Created Successfully',
                    'Continue to Login',
                    [
                        { text: 'OK', onPress: () => navigation.navigate('Login') },
                    ]
                );
            } else {
                Alert.alert('Failed', 'Try again');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>CREATE YOUR BMUSICIAN ACCOUNT!</Text>

                {/* Username */}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                />

                {/* Password with Visibility Toggle */}
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Icon
                            name={isPasswordVisible ? 'eye' : 'eye-off'}
                            size={24}
                            color="#999"
                        />
                    </TouchableOpacity>
                </View>
                {/* Password Requirements Text */}
                <Text style={styles.passwordRequirements}>
                    Password must contain one upper case, one special character, and one numeric character must be present.
                </Text>


                {/* Email */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                {/* First Name */}
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#999"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                {/* Last Name */}
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#999"
                    value={lastName}
                    onChangeText={setLastName}
                />

                {/* SignUp Button */}
                <TouchableOpacity
                    style={[styles.button, { opacity: isButtonEnabled ? 1 : 0.5 }]}
                    onPress={handleSignUp}
                    disabled={!isButtonEnabled}
                >
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, backgroundColor: '#fff' },
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 18, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
    input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingLeft: 15, fontSize: 16 },
    passwordContainer: { flexDirection: 'row', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15 },
    passwordInput: { flex: 1, height: 50, paddingLeft: 15, fontSize: 16 },
    eyeIcon: { padding: 10 },
    button: { backgroundColor: '#ED4D57', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
    passwordRequirements: {
        fontSize: 12,
        color: '#555', // A muted gray color for better readability
        marginBottom: 15,
        lineHeight: 16,
    },
    
});
