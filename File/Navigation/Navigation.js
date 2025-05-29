import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, Image, Linking, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "../DrawerNav/CustomDrawer";
import BottomTabNavigator from "../Navigation/BottomTabNavigator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../Login/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

import LoginScreen from "../Login/Login";
import HomeScreen from "../Home";
import AllocationList from "../Allocation";
import Enrollment from "../Enrollment";
import CoursesPage from "../Courses/CoursePage";
import Violin from "../Courses/Violin/ViolinCourse";
import Guitar from "../Courses/GuitarCourses";
import VideoPlayerPage from "../VideoPlayer/VideoPlayerPage";
import Drums from "../Courses/Drums/Drums";
import GuitarCoursedetails from "../Courses/GUITAR/GuitarDetailPage";
import Cajon from "../Courses/Cajon/Cajon";
import Piano from "../Courses/Piano/piano";
import Keyboards from "../Courses/Keyboard/keyboard";
import Vocal from "../Courses/Vocal/vocal";
import Yoga from "../Courses/Yoga/Yoga";
import Flute from "../Courses/Flute/flute";
import Morsing from "../Courses/Morsing/morsing";
import Kanjira from "../Courses/Kanjira/kanjira";
import Ghatam from "../Courses/Ghatam/Ghatam";
import Saxophone from "../Courses/Saxophone/saxophone";
import Tabla from "../Courses/Tabla/Tabla";
import Harmonium from "../Courses/Harmonium/harmonium";
import Konnakol from "../Courses/Konnakol/konnakol";
import Veena from "../Courses/Veenai/veenai";
import Bharatanatyam from "../Courses/Bharatanatyam/bharatanatyam";
import Ukulele from "../Courses/ukulele/ukulele";
import RazorPayPayment from "../Payment/Razor";
import PaymentSuccessScreen from "../Payment/successScreen";
import Mridangam from "../Courses/Mridangam/Mirdangam";
import VocalGuruList from "../GuruDetailPage/Vocal";
import GuruDetailsScreen from "../GuruDetailPage/GuruDetailPage";
import PercussionGuruList from "../GuruDetailPage/Percussion";
import KeysGuruList from "../GuruDetailPage/Keys";
import Djembe from "../Courses/Djembe/Djembe";
import MANDOLIN from "../Courses/Mandolin/Mandolin";
import GuruList from "../GuruDetailPage/Guru";
import YogaGuruList from "../GuruDetailPage/Others";
import WindGuruList from "../GuruDetailPage/wind";
import FAQScreen from "../Favourite/Faqs";
import GetAllocationList from "../VideoCall/GetAllocationList";
import MridangamGurus from "../GuruDetailPage/specializations/MridangamGurus";
import KeyGurus from "../GuruDetailPage/specializations/KeyGurus";
import StringGuruList from "../GuruDetailPage/String";
import GuitarGurus from "../GuruDetailPage/specializations/GuitarGurus";
import TablaGurus from "../GuruDetailPage/specializations/TablaGurus";
import SanGuruDetailsScreen from "../GuruDetailPage/CelebratingGurus/Santosh";
import SandipGuruScreen from "../GuruDetailPage/CelebratingGurus/Sandip";
import RaviGuruDetailsScreen from "../GuruDetailPage/CelebratingGurus/Ravi";
import VenkatGuruScreen from "../GuruDetailPage/CelebratingGurus/Venkat";
import PrivacyPolicy from "../Favourite/PrivacyPolicy";
import TermsACondition from "../Favourite/Terms&Condition";
import GuitarCourseList from "../Courses/GUITAR/GuitarCourses";
import CourseList from "../Courses/CourseGrid";
import DetailPage from "../GuruDetailPage/Detail";
import SignUp from "../Login/SignUp";
import RemoveAccountScreen from "../Login/RemoveAc";
import GuruDashboard from "../VideoCall/GuruDashboard";
import SubscriptionScreen from "./Subscribe";
import PremaGuruDetailsScreen from "../GuruDetailPage/CelebratingGurus/prema";
import ShyluGuruDetailsScreen from "../GuruDetailPage/CelebratingGurus/shylu";
import RamaGuruDetailsScreen from "../GuruDetailPage/CelebratingGurus/Ramanathan";
import SuruDetailsScreen from "../GuruDetailPage/CelebratingGurus/suru";
import VocalGurus from "../GuruDetailPage/specializations/VocalGurus";
import ViolinGurus from "../GuruDetailPage/specializations/violinGurus";
import ViolinG from "../GuruDetailPage/specializations/violinGurus";
import GetClassId from "../VideoCall/Gruveo";
import IAPSubscriptionScreen from "../Subscribe/iosSubsciption";
import Mydash from "../DrawerNav/Mydash";
import SignOut from "../Login/Signout";
import GuruDashboardT from "../Subscribe/Intermediate";
import TestVideoCall from "../VideoCall/Webview";



const ManageSubscription = () => {
    if (Platform.OS === 'android') {
        const packageName = "com.dcore.loginapplication"; // replace with your actual Android package name
        const url = `https://play.google.com/store/account/subscriptions?package=${packageName}`;
        Linking.openURL(url);
    } else if (Platform.OS === 'ios') {
        const url = 'https://apps.apple.com/account/subscriptions';
        Linking.openURL(url);
    }
};


const openInstagram = () => {
    Linking.openURL("https://www.instagram.com/bmusicianofficial?igsh=MXJvMXh4eWVnbDcwaw==")
        .catch((err) => console.error("Failed to open URL", err));  // Handle errors if any
};




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get('window');


function DrawerNav(props) {

    const { userInfo, signOut } = useContext(AuthContext); // Access user info from context
    const [isLoggedIn, setIsLoggedIn] = useState(false);




    useEffect(() => {
        if (userInfo) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userInfo]); // Trigger re-render when userInfo changes




    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>



            <Drawer.Screen

                name="Home"
                component={BottomTabNavigator}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home-outline" color={color} size={size} />
                    ),
                    drawerLabelStyle: {
                        fontWeight: '700',
                    },
                    headerTitle: () => (
                        <Image
                            source={require('../Assets/Icon/cmpylogo.png')}
                            style={{ width: 130, height: 40, marginLeft: -140 }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitleAlign: 'center',
                    headerShown: true
                }}
            />
            <Drawer.Screen name="Courses" component={CourseList}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="book-outline" color={color} size={size} />
                    ),
                    drawerLabelStyle: {
                        fontWeight: '700',
                    },
                }}
            />

            {/* Only show My Dashboard if user is logged in */}
            {isLoggedIn && (
                <Drawer.Screen
                    name="My Dashboard"
                    component={Mydash}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="view-dashboard" color='#ED4D57' size={size} />
                        ),
                        drawerLabelStyle: {
                            fontWeight: '700',
                            color: '#ED4D57',
                        },
                    }}
                />
            )}


            {/* <Drawer.Screen name="FAQ" component={FAQScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="help-circle-outline" color={color} size={size} />
                    ),
                    drawerLabelStyle: {
                        fontWeight: '700',
                    },
                }}
            /> */}

            <Drawer.Screen
                name="Privacy Policy"
                component={PrivacyPolicy}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="lock-closed-outline" color={color} size={size} />
                    ),
                    drawerLabelStyle: {
                        fontWeight: '700',
                    },
                }}
            />
            <Drawer.Screen
                name="Terms & Conditions"
                component={TermsACondition}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="document-text-outline" color={color} size={size} />
                    ),
                    drawerLabelStyle: {
                        fontWeight: '700',
                    },
                }}
            />
            <Drawer.Screen
                name="Manage Subscription"
                component={ManageSubscription}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="cog" color={color} size={size} />
                    ),
                    drawerLabelStyle: {
                        fontWeight: '700',
                    },
                }}
            />


            <Drawer.Screen
                name="Delete Account"
                component={RemoveAccountScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-remove-outline" color={color} size={size} />
                    ),
                    drawerLabelStyle: {
                        fontWeight: '700',
                    },
                }}
            />

            {!isLoggedIn && (
                <Drawer.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="log-in-outline" color={color} size={size} />
                        ),
                        drawerLabelStyle: { fontWeight: '700' },
                    }}
                />
            )}
            {isLoggedIn && (
                <Drawer.Screen
                    name="Logout"
                    component={SignOut}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="log-in-outline" color={color} size={size} />
                        ),
                        drawerLabelStyle: { fontWeight: '700' },
                    }}
                />
            )}



        </Drawer.Navigator>
    );
}

const Navigation = () => {
    const { isLoading, userInfo } = useContext(AuthContext);
    const { isLoggedInUser } = useContext(AuthContext);


    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <Stack.Navigator>
            {!isLoggedInUser && (
                <Stack.Screen name="Previous" component={DrawerNav} options={{ headerShown: false }} />

            )}
            <Stack.Screen name="Back" component={DrawerNav} options={{ headerShown: false }} />


            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerTitle: () => (
                        <Image
                            source={require('../Assets/Icon/cmpylogo.png')}
                            style={{ width: 130, height: 50 }}
                            resizeMode="contain"
                        />),
                    headerTitleAlign: 'center',
                    headerShown: true,
                }} />

            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

            <Stack.Screen name="signout" component={SignOut} options={{ headerShown: false }} />

            <Stack.Screen name="allocation" component={AllocationList} options={{ headerShown: true }} />

            <Stack.Screen
                name="MyDash" 
                component={Mydash} 
                options={{
                 headerShown: true, }} />

            <Stack.Screen name="My Recordings" component={VideoPlayerPage} options={{ headerShown: true }} />
            <Stack.Screen name="Course Enrollment" component={Enrollment}
                options={{
                    headerBackTitle: 'Back',
                }} />
            {/* <Stack.Screen name="My Dashboard" component={GetAllocationList} /> */}

            <Stack.Screen
                name="GetAllocationList"
                component={GetAllocationList}
                options={{
                    // headerBackTitle: 'Dashboard', // Sets the back button title
                    headerTitle: 'My Dashboard', // Sets the screen title
                }}
            />

            <Stack.Screen
                name="Guru dashboard"
                component={GuruDashboardT}
                options={{
                    // headerBackTitle: 'My Dashboard', // Sets the back button title
                    // headerTitle: 'My Dashboard', // Sets the screen title
                }}
            />

            {/* <Stack.Screen name="Subscribe" component={SubscriptionScreen} /> */}
            <Stack.Screen name="Subscription Plans" component={IAPSubscriptionScreen} />


            <Stack.Screen name="Start class" component={GetClassId} />
            <Stack.Screen name="web" component={TestVideoCall} />
            {/* <Stack.Screen name="StartClass" component={PianoTest} /> */}

            {/* <Stack.Screen name="apicheck" component={ApiCheck} /> */}

            <Stack.Screen name="SignUp" component={SignUp} />
            {/* <Stack.Screen name="Guru dashboard" component={GuruDashboardT} /> */}

            <Stack.Screen name="Remove" component={RemoveAccountScreen} />
            <Stack.Screen name="Log" component={LoginScreen} options={{ headerShown: false }} />

            <Stack.Screen name="gurulist" component={GuruList} options={{ headerShown: true }} />
            <Stack.Screen name="Prema" component={PremaGuruDetailsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Sandip" component={SandipGuruScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Ravindran" component={RaviGuruDetailsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="shylu" component={ShyluGuruDetailsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Rama" component={RamaGuruDetailsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="suru" component={SuruDetailsScreen} options={{ headerShown: true }} />

            <Stack.Screen name="gurudetail" component={GuruDetailsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Vocal Gurus" component={VocalGuruList} options={{ headerShown: true }} />
            <Stack.Screen name="Percussion Gurus" component={PercussionGuruList} options={{ headerShown: true }} />
            <Stack.Screen name="Keys Gurus" component={KeyGurus} options={{ headerShown: true }} />
            <Stack.Screen name="Yoga Gurus" component={YogaGuruList} options={{ headerShown: true }} />
            <Stack.Screen name="Wind Gurus" component={WindGuruList} options={{ headerShown: true }} />
            <Stack.Screen name="String Gurus" component={StringGuruList} options={{ headerShown: true }} />

            <Stack.Screen name="Razorpay" component={RazorPayPayment} options={{ headerShown: true }} />
            <Stack.Screen name="Enrollment Success" component={PaymentSuccessScreen}
                options={{
                    headerBackTitle: 'Back',
                }} />

            <Stack.Screen name="StripePayment" component={RazorPayPayment} />

            <Stack.Screen name="CoursePage" component={CoursesPage} options={{ headerShown: true }} />
            <Stack.Screen name="guitar" component={Guitar} options={{ headerShown: true }} />
            <Stack.Screen name="Guitar courses" component={GuitarCourseList} options={{ headerShown: true }} />
            <Stack.Screen name="DetailPage" component={GuitarCoursedetails} options={{ headerShown: true }} />

            <Stack.Screen name="Violin" component={Violin} options={{ headerShown: true }} />
            <Stack.Screen name="Mridangam" component={Mridangam} options={{ headerShown: true }} />
            <Stack.Screen name="Drums" component={Drums} options={{ headerShown: true }} />
            <Stack.Screen name="Cajon" component={Cajon} options={{ headerShown: true }} />
            <Stack.Screen name="Djembe" component={Djembe} options={{ headerShown: true }} />
            <Stack.Screen name="Piano" component={Piano} options={{ headerShown: true }} />
            <Stack.Screen name="Keyboard" component={Keyboards} options={{ headerShown: true }} />
            <Stack.Screen name="Vocal" component={Vocal} options={{ headerShown: true }} />
            <Stack.Screen name="Yoga" component={Yoga} options={{ headerShown: true }} />
            <Stack.Screen name="Flute" component={Flute} options={{ headerShown: true }} />
            <Stack.Screen name="Morsing" component={Morsing} options={{ headerShown: true }} />
            <Stack.Screen name="Kanjira" component={Kanjira} options={{ headerShown: true }} />
            <Stack.Screen name="Ghatam" component={Ghatam} options={{ headerShown: true }} />

            <Stack.Screen name="Saxophone" component={Saxophone} options={{ headerShown: true }} />
            <Stack.Screen name="Tabla" component={Tabla} options={{ headerShown: true }} />
            <Stack.Screen name="Harmonium" component={Harmonium} options={{ headerShown: true }} />
            <Stack.Screen name="Konnakol" component={Konnakol} options={{ headerShown: true }} />
            <Stack.Screen name="Veena" component={Veena} options={{ headerShown: true }} />
            <Stack.Screen name="Bharatanatyam" component={Bharatanatyam} options={{ headerShown: true }} />
            <Stack.Screen name="Ukulele" component={Ukulele} options={{ headerShown: true }} />
            <Stack.Screen name="Mandolin" component={MANDOLIN} options={{ headerShown: true }} />

            <Stack.Screen name="Mridangam Gurus" component={MridangamGurus} options={{ headerShown: true }} />
            {/* <Stack.Screen name="Vocal Gurus" component={VocalGurus} options={{ headerShown: true }} /> */}
            <Stack.Screen name="Violin Gurus" component={ViolinG} options={{ headerShown: true }} />
            <Stack.Screen name="Key Gurus" component={KeyGurus} options={{ headerShown: true }} />
            <Stack.Screen name="Guitar Gurus" component={GuitarGurus} options={{ headerShown: true }} />
            <Stack.Screen name="Tabla Gurus" component={TablaGurus} options={{ headerShown: true }} />

            <Stack.Screen name="Terms & Conditions" component={TermsACondition} options={{ headerShown: true }} />
            <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} options={{ headerShown: true }} />

            <Stack.Screen name="Detail" component={DetailPage} options={{ headerShown: true }} />

        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height < 800 ? 6 : 8,  // Adjust padding based on screen height
        paddingHorizontal: width < 768 ? 12 : 15,  // Adjust padding for smaller vs larger screens
        marginBottom: 20,
        marginLeft: 20,

    },
    iconRight: {
        marginRight: 5,
    },
    footerButtonText: { fontSize: 14, fontWeight: '600', color: '#000', marginLeft: 10, },
});

export default Navigation;
