import React, { useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Login/AuthContext';

const { width, height } = Dimensions.get('window'); // Get the screen width and height

const CustomDrawer = (props) => {
  const { signOut, userInfo } = useContext(AuthContext);

  // const navigateToDashboard = () => {
  //   if (userInfo?.isStudent) {
  //     props.navigation.navigate("GetAllocationList");
  //   } else {
  //     props.navigation.navigate("GuruDashboard");
  //   }
  // };

  const handleSignOut = () => {
    signOut();
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  // const handleManageSubscription = () => {
  //   if (Platform.OS === 'android') {
  //     const packageName = "com.dcore.loginapplication"; // replace with your actual Android package name
  //     const url = `https://play.google.com/store/account/subscriptions?package=${packageName}`;
  //     Linking.openURL(url);
  //   } else if (Platform.OS === 'ios') {
  //     const url = 'https://apps.apple.com/account/subscriptions';
  //     Linking.openURL(url);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../Assets/Icon/new.png')}
          style={styles.headerBackground}
        />
      </View>

      <View style={styles.drawerList}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.footer}>

          {/* Dashboard button */}
          {/* {userInfo && (
          <TouchableOpacity onPress={navigateToDashboard} style={styles.footerButtondash}>
            <Ionicons name="calendar-outline" size={22} style={styles.dashiconRight} />
            <Text style={styles.footerButtonTextDash}>My Dashboard</Text>
          </TouchableOpacity>
        )} */}


           {/* Login/Logout button */}
           {/* {!userInfo && (
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={styles.footerButton}>
            <Ionicons name="log-in-outline" size={22}  style={styles.iconRight}/>
            <Text style={styles.footerButtonText}>Login</Text>
          </TouchableOpacity>
        )} */}

        {/* {userInfo && (
          <TouchableOpacity onPress={handleSignOut} style={styles.footerButton}>
            <Ionicons name="exit-outline" size={22} style={styles.iconRight} />
            <Text style={styles.footerButtonText}>Logout</Text>
          </TouchableOpacity>
        )} */}

        {/* Terms and Conditions button */}
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('Terms & Conditions')}
          style={styles.footerButton}>
          <Ionicons name="document-outline" size={22} />
          <Text style={styles.footerButtonText}>Terms & Conditions</Text>
        </TouchableOpacity> */}

        {/* Privacy Policy button */}
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('Privacy Policy')}
          style={styles.footerButton}>
          <Ionicons name="lock-closed-outline" size={22} />
          <Text style={styles.footerButtonText}>Privacy Policy</Text>
        </TouchableOpacity> */}

        {/* Manage Subscription button */}
        {/* <TouchableOpacity
          onPress={handleManageSubscription}
          style={styles.footerButton}>
          <Ionicons name="cog" size={22} />
          <Text style={styles.footerButtonText}>Manage Subscription</Text>
        </TouchableOpacity> */}

        {/* FAQ button */}
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('FAQ')}
          style={styles.footerButton}>
          <Ionicons name="help-circle-outline" size={22} />
          <Text style={styles.footerButtonText}>FAQ</Text>
        </TouchableOpacity> */}

      

        {/* Remove Account button */}
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('Remove')}
          style={styles.footerButton}>
          <Ionicons name="person-remove-outline" size={22} />
          <Text style={styles.footerButtonText}>Remove Account</Text>
        </TouchableOpacity> */}

     
      </View>


     {/* Fix the logout button */}
     {/* <View style={styles.fixedFooter}>
        {userInfo && (
          <TouchableOpacity onPress={handleSignOut} style={styles.footerButton}>
            <Ionicons name="exit-outline" size={22} style={styles.iconRight} />
            <Text style={styles.footerButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View> */}



    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerContainer: { alignItems: 'center' },
  headerBackground: { width: '100%', height: 220, resizeMode: 'cover' },
  drawerList: { flex: 1, paddingHorizontal: 25, paddingTop: 30 },

  footer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    justifyContent: 'flex-start', // Align the content to the start
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

 
  fixedFooter: {
    position: 'absolute',
    bottom: 0, // Fixes the button at the bottom
    left: 0,
    right: 0,  // Ensure the button takes up the full width and is aligned to the right
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'flex-end',  // Align the button to the right end
    marginBottom: 20, // Ensure spacing from the bottom of the screen
  },

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
  footerButtonText: { fontSize: 14, fontWeight: '600', color: '#000', marginLeft: 10 ,},
});

export default CustomDrawer;
