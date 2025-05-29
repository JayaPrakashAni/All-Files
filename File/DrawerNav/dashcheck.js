import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Login/AuthContext";
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect

const { width, height } = Dimensions.get('window');

const Mydash = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [dataArray, setDataArray] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [success, setSuccess] = useState(true);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(null);
    //   const [showDashboardButton, setShowDashboardButton] = useState(true); // Track visibility of button

    // Get user info and fetch the data accordingly
    useEffect(() => {
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
            }
        };
        getUserInfo();
    }, [userInfo]);

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

    const navigateToDashboard = () => {
        if (userInfo?.isStudent) {
            navigation.navigate("GetAllocationList");
        } else {
            navigation.navigate("GuruDashboard");
        }
        // setShowDashboardButton(false);
    };

    // Handle going back to the screen
    //   useFocusEffect(() => {
    //     setShowDashboardButton(true);  // Show the button when coming back to this screen
    //   });

    if (!isLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    if (!success) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>{message}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={dataArray?.length === 0 ? styles.noDataContainer : {}}>
            {dataArray?.length > 0 ? (
                dataArray.map((item, index) => (
                    <View key={item.ID} style={[styles.card, index === dataArray.length - 1 && { paddingBottom: 50 }]}>
                        {/* Render content here */}
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}></Text>
            )}

            {/* {showDashboardButton && (
        <TouchableOpacity onPress={navigateToDashboard} style={userInfo?.isStudent ? styles.studentNavigateButton : styles.guruNavigateButton}>
          <Text style={styles.navigateText}>Click Here</Text>
        </TouchableOpacity>
      )} */}

            {/* Direct navigation based on user type */}
            <TouchableOpacity onPress={navigateToDashboard} style={userInfo?.isStudent ? styles.studentNavigateButton : styles.guruNavigateButton}>
                <Text style={styles.navigateText}>Click Here</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    studentNavigateButton: {
        backgroundColor: "#ED4D57",
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 70,
        width: width * 0.8,  // Adjust width for student
        alignSelf: 'center',
    },
    guruNavigateButton: {
        backgroundColor: "#ED4D57",
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 70,
        width: width * 0.9,  // Adjust width for guru
        alignSelf: 'center',
    },
    navigateText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
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
});

export default Mydash;
