import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, ActivityIndicator, ScrollView, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";



const AllocationList = ({ navigation }) => {
  const [dataArray, setDataArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

 // const imagebackground = require('./Assets/Icon/bg0.jpg');
  const userpic = require('../File/Assets/userimg.png');
  const clockpic = require('../File/Assets/Icon/clock.png');



  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState('');

  const getUserData = async (userId) => {
    try {
      const response = await fetch("https://my.bmusician.com/app/GetUpcomingClassesAllocations/" + userId);
      const myData = await response.json();
      if (myData.success) {
        setDataArray(myData.AllocationsList);
        setSuccess(true);
      } else {
        setMessage(myData.message);  // Set the message from the response
        setSuccess(false);
      }
      setIsLoaded(true);
      console.log('Resultuuu>>>>', myData)
    } catch (error) {
      console.log(error);
      setMessage('Failed to fetch data');  
      setSuccess(false);
      setIsLoaded(true);
    }
  };


  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
      getUserData(userInfo.userid);
    }
    getUserInfo();
  }, []);

  //const { userId } = route.params;

  if (!isLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} />
    </View>
  }

  if (!success) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }

  return (

    <ImageBackground  style={{ width: '100%', height: '100%' }} >
      <ScrollView>
        {dataArray.map((item, index) => {
          //Course Title
          return <View key={item.AllocationID} style={{ marginTop: 5, backgroundColor: 'white' }}>

            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black",  padding: 20 }}>
              {item.CourseName} </Text>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Image style={styles.userimage} source={userpic} />
              <Text style={styles.StudentName}>
                {item.StudentName}
              </Text>

              <View >
                <Button style={{ backgroundColor: 'green', marginLeft: 25, marginTop: 6, width: 120, borderRadius: 20 }}
                  mode="contained"
                  onPress={() => {
                    console.log('slotIDTest ----->', item.slotID)
                  }}>
                  Active
                </Button>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Image style={styles.clockimage} source={clockpic} />
              <Text style={styles.StatusMessage}>
                {item.StatusMessage} </Text>
            </View>


            <View style={{ flexDirection: 'row', marginTop: 5 }}>

              <View style={styles.startButton}>

                <Button
                  style={{ backgroundColor: 'black', borderRadius: 20 }}
                  mode="contained"
                  onPress={() => {
                    console.log('slotIDTest ----->', item.slotID)
                    navigation.navigate('getclassid', {
                      slotID: item.AllocationID,
                    });
                  }}>
                  Start Class

                </Button>
              </View>


              <View style={styles.recordButton}>
                <Button
                style={{backgroundColor: 'black', borderRadius: 20, }}
                  mode="contained"
                  onPress={() => {
                    navigation.navigate('VideoPlayerScreen', {
                      itemId: item.AllocationID,
                    });
                  }}>
                  My Recordings
                </Button>
              </View>

            </View>

          </View>
        })}

      </ScrollView>
    </ImageBackground>

  );


};
const styles = StyleSheet.create({

  userimage: {
    width: 40,
    height: 40,
    marginStart: 10
  },

  StudentName: {
    marginLeft: 5,
    fontSize: 20,
    color: 'black',
    paddingVertical: 10,
  },

  Activebutton: {
    marginEnd: 20,
    paddingLeft: 15,
    paddingTop: 5,

  },

  clockimage: {
    width: 40,
    height: 40,
    marginStart: 11,
  },

  StatusMessage: {
    marginLeft: 5,
    fontSize: 20,
    color: 'black',
    paddingVertical: 10,
  },
  startButton: {
    padding: 10,
    marginLeft: 20,
    borderRadius: 20,
    marginHorizontal: 40,
    marginVertical: 15,
    borderRadius: 20,
  },

  recordButton: {
    padding: 10,
    marginLeft: 20,
    borderRadius: 20,
    marginVertical: 15,
    borderRadius: 20,

  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  message: {
    fontSize: 26,
    color: 'red',  
  },
});

export default AllocationList;

