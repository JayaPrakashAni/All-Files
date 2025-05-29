import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Home';
import Courses from '../Courses/CourseGrid';
import AboutUs from '../Favourite/AbtUs';
import GuruList from '../GuruDetailPage/Guru';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Courses') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Gurus') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'About us') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} style={{ marginBottom: -3 }} />;
                },
                tabBarActiveTintColor: '#ED4D57', // Sky blue color
                tabBarInactiveTintColor: 'grey',
                headerShown: false,
                tabBarStyle: { paddingBottom: 20, height: 60 },
                tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', marginTop: -5 },
                tabBarIconStyle: { marginTop: -5 } 
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Courses" component={Courses} />
            <Tab.Screen name="Gurus" component={GuruList} />
            <Tab.Screen name="About us" component={AboutUs} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
