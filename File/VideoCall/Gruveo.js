import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Gruveo from 'react-native-gruveo';
import CryptoJS from 'crypto-js';

const GetClassId = ({ navigation, route }) => {
  const [dataArray, setDataArray] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [classMessage, setClassMessage] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const imagebackground = require("../Assets/Instruments/filmGuitar.png");
  const { slotID, classCompleted } = route.params || {};
  const secret = "DqFxRyc27P5pG3xePtG4wYsS";
  const [slotss, setSlotss] = useState(null);

  const startRecording = () => {
    Gruveo.toggleRecording(true, 1); // start recording with default layout 1
    setIsRecording(true);
    Alert.alert("Recording started");
    console.log("Recording started");
  };

  const stopRecording = () => {
    Gruveo.toggleRecording(false, 1); // stop recording
    setIsRecording(false);
    Alert.alert("Recording stopped");
    console.log("Recording stopped");
  };

  useEffect(() => {
    if (!slotID) {
      Alert.alert("Error", "Missing Slot ID. Navigating back.");
      navigation.goBack();
    } else {
      console.log("Slot ID >>> :", slotID);
      if (classCompleted) {
        Alert.alert("Success", "You have successfully completed the class!");
      }
    }
  }, [slotID, classCompleted]);

  const getUserData = async () => {
    try {
      const response = await fetch(`https://my.bmusician.com/app/GetClassroomID/${slotID}`);
      if (!response.ok) {
        const errorText = await response.text();
        setClassMessage(errorText || "An error occurred.");
        setIsLoaded(true);
        return;
      }
      const myData = await response.json();
      setDataArray(myData);
      setIsLoaded(true);

      if (myData.slotID) {
        setSlotss(myData.slotID);
      }

      if (myData.success) {
        setClassMessage("All the best. Have a great lesson!!");
      } else {
        setClassMessage(myData.message || "No class scheduled");
      }

      console.log("Result>>>", myData);
    } catch (error) {
      console.error("Fetch error:", error);
      setClassMessage("There was an error fetching the data.");
      setIsLoaded(true);
    }
  };

  const updateStatusBeforeCall = async () => {
    if (!slotss) {
      console.warn("Slot ID (slotss) not set yet.");
      return;
    }
    try {
      const studentStatusUrl = `https://my.bmusician.com/app/updatestatus/${slotss}?status=0&isguru=0`;
      await fetch(studentStatusUrl, { method: "GET" });
      console.log("Updated status before call.");
    } catch (error) {
      console.error("Failed to update status before call:", error);
    }
  };

  const handleCallEstablished = async () => {
    if (!slotss) {
      console.warn("Slot ID (slotss) not set yet.");
      return;
    }
    const updateStatusUrl = `https://my.bmusician.com/app/updateslotfields/${slotss}?status=0`;
    try {
      await fetch(updateStatusUrl, { method: "GET" });
      console.log("Call established and status updated.");
    } catch (error) {
      console.error("Failed to update established status:", error);
    }
  };

  const onCallEnd = async () => {
    if (!slotss) {
      console.warn("Slot ID (slotss) not set yet.");
      return;
    }
    const endUrls = [
      `https://my.bmusician.com/app/updateslotfields/${slotss}?status=1`,
      `https://my.bmusician.com/app/updatestatus/${slotss}?status=1&isguru=0`,
      `https://my.bmusician.com/app/updatestatus/${slotss}?status=1&isguru=1`,
    ];

    try {
      for (const url of endUrls) {
        await fetch(url, { method: "GET" });
      }
      console.log("Call ended and status updated.");
    } catch (error) {
      console.error("Failed to update end statuses:", error);
    }
  };

  const handleCallNow = async () => {
    if (dataArray?.success === false) {
      Alert.alert(
        "Class Not Scheduled",
        "The class is not yet scheduled! Please contact Admin. Thank you."
      );
      return;
    }

    const roomId = dataArray?.message?.toString() ?? "";
    if (!roomId) {
      Alert.alert("Error", "Room ID not available.");
      return;
    }

    await updateStatusBeforeCall();
    Gruveo.initialize("fWawTqa6gPhS");

    Gruveo.call(roomId, true, true, async (status, payload) => {
      console.log(`Call status >>>: ${status}, Payload >>> :`, payload);
      switch (status) {
        case Gruveo.CallStatus.initFailed:
          Alert.alert("Error", "Call initialization failed.");
          break;
        case Gruveo.CallStatus.requestToSignApiAuthToken:
          try {
            const hmac = CryptoJS.HmacSHA256(payload, secret);
            const base64String = CryptoJS.enc.Base64.stringify(hmac);
            Gruveo.authorize(base64String);
          } catch (error) {
            console.error("Authorization error:", error);
          }
          break;
        case Gruveo.CallStatus.callEstablished:
          await handleCallEstablished();
          break;
        case Gruveo.CallStatus.callEnd:
          await onCallEnd();
          break;
        default:
          console.log("Unhandled Gruveo status:", status);
      }
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={imagebackground}>
      <View style={styles.overlayContainer}>
        {dataArray.success ? (
          <>
            <Text style={styles.courseTitle}>{classTitle}</Text>
            <Text style={styles.messageText}>{String(classMessage)}</Text>
            <TouchableOpacity style={styles.startButton} onPress={handleCallNow}>
              <Text style={styles.buttonText}>Start Class</Text>
            </TouchableOpacity>

            {/* Record Button only after call established */}
            {isRecording ? (
              <TouchableOpacity style={styles.recordButton} onPress={stopRecording}>
                <Text style={styles.buttonText}>End Recording</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
                <Text style={styles.buttonText}>Start Recording</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={styles.errorText}>{String(classMessage) || "Loading..."}</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlayContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: "50%",
  },
  courseTitle: {
    fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 10, textAlign: "center",
  },
  messageText: {
    fontSize: 16, color: "white", marginBottom: 30, textAlign: "center",
  },
  startButton: {
    backgroundColor: "#FF3B30", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8,
  },
  buttonText: {
    fontSize: 18, color: "white", fontWeight: "bold",
  },
  errorText: {
    fontSize: 18, color: "white", textAlign: "center",
  },
  recordButton: {
    backgroundColor: "#007AFF", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, marginTop: 15,
  },
});

export default GetClassId;
