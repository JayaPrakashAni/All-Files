import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons for Home icon

const { width, height } = Dimensions.get("window");
const GetAllocationList = ({ navigation }) => {
  const [dataArray, setDataArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);


  const clockpic = require("../Assets/Icon/clock.png");

  const getUserData = async (userId) => {
    try {
      const response = await fetch(`https://my.bmusician.com/app/GetAllocationList/${userId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const myData = await response.json();
      if (myData.success) {
        const sortedData = myData.AllocationsList.sort((a, b) => {
          if (a.Status === "Active" && b.Status !== "Active") return -1;
          if (a.Status !== "Active" && b.Status === "Active") return 1;
          return 0;
        });

        setDataArray(sortedData);
        setSuccess(true);
      } else {
        setMessage(myData.message);
        setSuccess(false);
      }
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
      setMessage("Failed to fetch data: " + error.message);
      setSuccess(false);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = JSON.parse(await AsyncStorage.getItem("userInfo"));
      const id = userInfo?.userid;
      setUserId(id); // ✅ Store in state
      if (id) {
        getUserData(id);
      }
    };
    getUserInfo();
  }, []);
  
  const handleActivate = (allocid, courseName, levelID, isFeaturedPopularRare, baseAmountInr) => {
    try {
      console.log("Activating course...");
      console.log("🔑 userId:", userId);
      console.log("📦 allocid:", allocid);
  
      navigation.navigate("Subscription Plans", {
        userId,
        allocid,
        courseName,
        levelID,
        isFeaturedPopularRare,
        baseAmountInr,
      });
    } catch (error) {
      console.error("Error activating course", error);
    }
  };
  

  const handleStartClass = (slotID) => {
    console.log("Alloc ID:", slotID);  // Log the Slot ID to the console
    navigation.navigate("Start class", { slotID , });
  };
  
    React.useLayoutEffect(() => {
      // Setting the header with proper back button
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Back")} // Navigate to HomeScreen
          >
            <Icon name="arrow-back" size={24} color="#3399FF" style={styles.backIcon} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation]);

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
    <ScrollView contentContainerStyle={dataArray.length === 0 ? styles.noDataContainer : {}}>
        
      
      {dataArray.length > 0 ? (
        dataArray.map((item, index) => (
          <View
            key={item.ID}
            style={[
              styles.card,
              index === dataArray.length - 1 && { paddingBottom: 50 },
            ]}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseName}>{item.CourseName}</Text>

              {/* Replace Active/Inactive Buttons with colored dots */}
              <View style={styles.statusContainer}>
                {item.Status === "Active" ? (
                  <View style={styles.activeDot} />
                ) : (
                  <View style={styles.inactiveDot} />
                )}
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Guru :</Text>
              <Text style={styles.value}>{item.GuruName}</Text>
            </View>

            <View style={styles.row}>
              <Image style={styles.clockimage} source={clockpic} />
              <Text style={styles.CourseDay}>{item.CourseDay}</Text>
            </View>

            {/* For Active status only, display the "My Recordings" button and "Start Class" button */}
            {item.Status === "Active" && (
              <View style={styles.buttonRow}>
                <View style={styles.leftButton}>
                  <Button
                    icon="video"
                    mode="outlined"
                    onPress={() => {
                      navigation.navigate("My Recordings", {
                        itemId: item.ID,
                      });
                    }}
                    style={styles.recordButtonStyle}
                    labelStyle={styles.RecordbuttonText}
                  >
                    Recordings
                  </Button>
                </View>

                <View style={styles.rightButton}>
                  <Button
                    icon="play-circle"
                    mode="contained"
                    onPress={() => handleStartClass(item.ID)}
                    style={styles.startButtonStyle}
                    labelStyle={styles.buttonText}
                  >
                    Start Class
                  </Button>
                </View>
              </View>
            )}

            {/* Only show Activate button for Inactive status */}
            {(item.Status === "Inactive" || item.Status === null) &&  (
              <View style={styles.buttonRow}>
                <View style={styles.startButton}>

                  <TouchableOpacity
                    onPress={() => handleActivate(item.ID, item.CourseName, item.LevelID, item.IsFeaturedPopularRare, item.BaseAmountInr)}
                    style={styles.startButton}  // Keep the button's style for consistent design
                  >
                    <Button
                      icon="lock-open"
                      mode="contained"
                      style={styles.activateButtonStyle}  // Apply your button style
                      labelStyle={styles.ActivatebuttonText}
                    >
                      Activate
                    </Button>
                  </TouchableOpacity>

                </View>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No Classes Right Now</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 5,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ED4D57",
    flexWrap: 'wrap',
    overflow: 'visible',
    maxWidth: '80%',
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#28a745", // Green dot for Active
  },
  inactiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#d83714", // Red dot for Inactive
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "black",
    marginLeft: 10,
    fontWeight: "600",
  },
  clockimage: {
    width: 20,
    height: 20,
    marginLeft: -2,
    marginTop: -3,
  },
  CourseDay: {
    marginLeft: 15,
    fontSize: 16,
    color: "black",
    paddingVertical: 5,
    marginTop: -3,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leftButton: {
    flex: 1,
    marginTop: -5,
  },
  rightButton: {
    flex: 1,
    marginLeft: 5,
  },
  recordButtonStyle: {
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 20,
    height: 40,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },

  RecordbuttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "purple",
    marginLeft: 25,
    marginTop: 6,
  },

  startButtonStyle: {
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 25,
    justifyContent: "center",
    height: 40,
    backgroundColor: "#8E44AD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
  },
  activateButtonStyle: {
    backgroundColor: "#ED4D57",
    borderRadius: 20,
    paddingHorizontal: 80,
    justifyContent: "center",
    marginHorizontal: 7,
    paddingVertical: 2,  // Added to increase clickable area
    alignItems: "center",  // Ensures text is centered
    width: "100%", // Ensures button takes up the entire width of its container
  },

  ActivatebuttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    //textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 26,
    color: "red",
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
    marginTop: -5
  },
  backButtonText: {
    color: "#3399FF", 
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -5
  },
});

export default GetAllocationList;