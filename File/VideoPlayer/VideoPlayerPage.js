import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Vimeo } from 'react-native-vimeo-iframe';

const VideoPlayerPage = ({ route }) => {
  const [videoData, setVideoData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { itemId } = route.params;

  useEffect(() => {
    const getVideoData = async () => {
      try {
        const response = await fetch(`https://my.bmusician.com/app/getvideos/${itemId}`);
        const VidData = await response.json();
        setVideoData(VidData);
        setIsLoaded(true);
        console.log('Resultuuu>>>>', VidData);
        console.log('value>>>', VidData.title);
      } catch (error) {
        console.log(error);
        setIsLoaded(true);
      }
    };

    getVideoData();
  }, [itemId]);

  if (!isLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
if (videoData.length === 0) {
  return (
    <View style={styles.centered}>
      <Text style={styles.noVideoText}>No class recordings yet!</Text>
    </View>
  );
}
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {videoData.map((item, index) => (
        <View key={item.ID.toString()  || `item-${index}`} style={styles.videoContainer}>
          {/* <Text style={styles.videoTitle}>
            {item.title}
          </Text> */}
          <Vimeo
            videoId={item.ID.toString()} // Make sure to use the videoId prop for Vimeo component
            style={styles.video}
          />
          {index !== videoData.length -1 && <View style={styles.separator}/>}
        </View>
      ))}
    </ScrollView>
  );
};

export default VideoPlayerPage;

const styles = StyleSheet.create({

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noVideoText: {
    fontSize: 28,
    color: 'black'
  },
  videoContainer: {
    marginTop: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey' // This creates a line between each video
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 10
  },
  video: {
    height: 200
  },
  // separator: {
  //   marginTop: 10,
  //   height: 3,
  //   backgroundColor: 'grey',
  //   marginVertical: 10
  // }
});
