import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Login/AuthContext";
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Mydash = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [dataArray, setDataArray] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [success, setSuccess] = useState(true);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(null);

    // This will ensure that every time this screen is focused, the data is fetched again
    useFocusEffect(
        React.useCallback(() => {
            setIsLoaded(false);  // Reset loading state each time screen is focused
            const getUserInfo = async () => {
                const storedUserInfo = JSON.parse(await AsyncStorage.getItem("userInfo"));
                if (storedUserInfo) {
                    const id = storedUserInfo.userid;
                    setUserId(id);
                    if (id) {
                        if (userInfo?.isStudent) {
                            getStudentAllocationList(id);
                        } else {
                            getUpcomingClasses(id);
                        }
                    }
                } else {
                    setMessage("User not found in storage");
                    setIsLoaded(true);
                }
            };
            getUserInfo();
        }, [userInfo, navigation])  // Re-run this effect every time the screen is focused
    );

    // Fetch classes for a student
    const getStudentAllocationList = async (userId) => {
        try {
            const response = await fetch(`https://my.bmusician.com/app/GetAllocationList/${userId}`);
            const myData = await response.json();
            if (myData.success) {
                setDataArray(myData.AllocationsList || []);
                setSuccess(true);
            } else {
                setMessage(myData.message);
                setSuccess(false);
            }
            setIsLoaded(true);
        } catch (error) {
            setMessage("Failed to fetch data: " + error.message);
            setSuccess(false);
            setIsLoaded(true);
        }
    };

    // Fetch upcoming classes for a guru
    const getUpcomingClasses = async (userId) => {
        try {
            const response = await fetch(`https://my.bmusician.com/guruapp/getupcomingclasses?id=${userId}`);
            const myData = await response.json();
            if (myData.success) {
                setDataArray(myData.AllocationsList || []);
                setSuccess(true);
            } else {
                setMessage(myData.message);
                setSuccess(false);
            }
            setIsLoaded(true);
        } catch (error) {
            setMessage("Failed to fetch data: " + error.message);
            setSuccess(false);
            setIsLoaded(true);
        }
    };

    // Navigate based on user type (Student or Guru)
    useEffect(() => {
        if (isLoaded && userInfo) {
            if (userInfo?.isStudent && dataArray?.length > 0) {
                navigation.replace("GetAllocationList");  // Use replace to avoid navigating back to Mydash
            } else if (dataArray?.length > 0) {
                navigation.replace("Guru dashboard");  // Use replace for Guru navigation
            }
        }
    }, [isLoaded, userInfo, dataArray, navigation]);

    // Handle the loading state and show spinner
    if (!isLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    // Show error message if fetching data failed
    if (!success) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>{message}</Text>
            </View>
        );
    }

    // Render content when data is available
    return (
        <ScrollView contentContainerStyle={dataArray?.length === 0 ? styles.noDataContainer : {}}>
            {dataArray?.length > 0 ? (
                dataArray.map((item, index) => (
                    <View key={item.ID} style={[styles.card, index === dataArray.length - 1 && { paddingBottom: 50 }]}>
                        {/* Render your content here */}
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No classes right now!</Text>
            )}

      
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    message: {
        fontSize: 18,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
    },
    noDataContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noDataText: {
        fontSize: 18,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    backButton: {
        backgroundColor: "#ED4D57",
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 20,
        width: width * 0.8,  // Adjust width
        alignSelf: 'center',
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Mydash;
