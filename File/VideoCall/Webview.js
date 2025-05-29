import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from "react-native";
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


// const slotID = 4055;
const backgroundImage = require("../Assets/Instruments/filmGuitar.png");

const TestVideoCall = () => {

    const route = useRoute();
    const { slotID } = route.params;  // Get the slotID passed from GetAllocationList

  const [dataArray, setDataArray] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [showWebView, setShowWebView] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`https://my.bmusician.com/app/GetClassroomID/${slotID}`);
        const myData = await response.json();
        setDataArray(myData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Fetch error:", error);
        setIsLoaded(true);
      }
    };

    getUserData();
  }, [slotID]);

  const handleCallNow = () => {
    if (dataArray?.success === false) {
      Alert.alert("Class Not Scheduled", "Please contact Admin.");
      return;
    }

    const id = dataArray?.message?.toString();
    if (!id) {
      Alert.alert("Error", "Room ID not available.");
      return;
    }

    setRoomId(id);
    setShowWebView(true);
  };

  if (!isLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} color="#FFD700" />
      </View>
    );
  }

  if (showWebView && roomId) {
    // const callUrl = `https://www.gruveo.com/${roomId}`;
    const callUrl = `https://my.bmusician.com/GuruAcademe/guruclassroom?slotid=164521`;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: callUrl }}
            style={{ flex: 1 }}
            javaScriptEnabled
            allowsInlineMediaPlayback1
            mediaPlaybackRequiresUserAction={false}
          />

          {/* Top-left back button */}
          {/* <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setShowWebView(false);
              setRoomId(null);
            }}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={backgroundImage}>
      <View style={styles.overlayContainer}>
        <Text style={styles.title}>🎥 Start Class</Text>
        <TouchableOpacity style={styles.callButton} onPress={handleCallNow}>
          <Text style={styles.buttonText}>Call Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: "50%",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  callButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    zIndex: 1000,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  
  },
});

export default TestVideoCall;