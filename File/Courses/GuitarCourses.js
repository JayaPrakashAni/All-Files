import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Guitar = ({ navigation }) => {
    const [courses, setCourses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const enrollpage = async (id) => {
        await AsyncStorage.setItem('courseId', JSON.stringify(id));
        console.log('CourseId $$ ------>', id);
        navigation.navigate('enroll');
      };
      
      const syllabus =  () => {

      }

    const guitarCourse = async () => {
        try {
            const response = await fetch("https://my.bmusician.com/app/getcourses/1");  
            const myData = await response.json();  
            setCourses(myData.CourseList);
            setIsLoaded(true);
        }

        catch (error) { 
            console.log(error);
        }
    };


    useEffect(() => {
        guitarCourse();
    }, []);


    if (!isLoaded) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
        </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ marginTop: 5 }}>
            {courses.map((course, index) => (
                <View key={index} style={styles.courseContainer}>
                    <View>
                    <TouchableOpacity onPress={()=>enrollpage(course.ID)}>
                        <Text style={{ marginTop: 30, marginHorizontal: 90, padding: 10, fontSize: 20, backgroundColor: 'black', textAlign: 'center', borderRadius: 5, color: 'white', marginBottom: 20 }}>Enroll Now</Text>
                    </TouchableOpacity>
            
                    <Text style={styles.courseTitle}>
                        Course Name: {course.CourseName}
                    </Text>
                    <Text style={styles.courseDescription}>
                        Description: {course.CourseDescription}
                    </Text>
                    <Text style={styles.courseDescription}>
                        ID: {course.ID}
                    </Text>
                    </View>
                    
                    <TouchableOpacity onPress={syllabus}>
                        <Text style={{ marginTop: 30, marginHorizontal: 90, padding: 10, fontSize: 20, backgroundColor: 'blue', textAlign: 'center', borderRadius: 5, color: 'white', marginBottom: 20 }}>Syllabus</Text>
                    </TouchableOpacity>
                </View>
               
            ))}
        </ScrollView>

    );
};
const styles = StyleSheet.create({

    courseContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    courseTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
        textAlign: 'center',
        marginBottom: 10,
    },
    courseDescription: {
        fontSize: 16,
        color: "#333",
        textAlign: 'justify',
    },



});

export default Guitar;

