import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons for Home icon

const { width, height } = Dimensions.get("window");

const GuruDashboard = ({ navigation }) => {
  const [dataArray, setDataArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");

  const getUpcomingClasses = async (userId) => {
    try {
      const response = await fetch(
        `https://my.bmusician.com/guruapp/getupcomingclasses?id=${userId}`
      );
      console.log("API response:", response);  // Debugging API response

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const myData = await response.json();
      console.log("API Data:", myData);  // Debugging the actual response

      if (myData.success) {
        setDataArray(myData.AllocationsList);
        setSuccess(true);
      } else {
        setMessage(myData.message);
        setSuccess(false);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Failed to fetch data: " + error.message);
      setSuccess(false);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = JSON.parse(await AsyncStorage.getItem("userInfo"));
      if (userInfo && userInfo.userid) {
        getUpcomingClasses(userInfo.userid);
      } else {
        console.error("User Info is missing.");
        setIsLoaded(true);
      }
    };
    getUserInfo();
  }, []);

  // Back Button in Header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Back")} // Navigate to HomeScreen
        >
          <Icon name="arrow-back" size={24} color="black" style={styles.backIcon} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (!isLoaded) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (!success) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorMessage}>{message}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={
        Array.isArray(dataArray) && dataArray.length === 0 ? styles.noDataContainer : null
      }
    >
      {Array.isArray(dataArray) && dataArray.length > 0 ? (
        dataArray.map((item, index) => (
          <View key={item.ID} style={styles.card}>
            <Text style={styles.courseName}>{item.CourseName}</Text>
            <Text style={styles.studentName}>Student: {item.StudentName}</Text>
            <Text style={styles.dateTime}>{item.SlotStartDateString}</Text>
            <Text style={styles.dateTime}>{item.SlotStartTimeString}</Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                navigation.navigate("Start class", {
                  slotID: item.AllocationID, // Pass the AllocationID dynamically
                });
              }}
            >
              <Text style={styles.startButtonText}>Start Class</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No classes right now</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 30,
  },
  courseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  studentName: {
    fontSize: 18,
    color: "black",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  startButton: {
    backgroundColor: "#ED4D57",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 350,
    color: "#ED4D57",
  },
  errorMessage: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  // Back button styling
  backButton: {
    flexDirection: "row",
    backgroundColor: "transparent",  // Removed background color to make it look better
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "flex-start",  // Align to the left
    marginTop: 5,
  },
  backIcon: {
    marginRight: 10, // Adjust spacing between icon and text
    marginTop: -5,
  },
  backButtonText: {
    color: "#3399FF", 
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -5,
  },
});

export default GuruDashboard;
