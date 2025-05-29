import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from './Config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [allocationID, setAllocationID] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages

  const setAllocation = (id) => {
    setAllocationID(id);
  };

  const login = async (username, password) => {
    try {
       setIsLoading(true); // Set loading to true while making the API request
      const response = await axios.post(`${BASE_URL}/account/MobileLogin`, { username, password });
      const userData = response.data;

      if (userData.success) {
        setUserInfo(userData); // Set the user info in the state
        await AsyncStorage.setItem("userInfo", JSON.stringify(userData)); // Store user info in AsyncStorage
        setIsLoggedInUser(true); // Update the logged-in status
         setErrorMessage(""); // Clear any previous errors
      } else {
        setErrorMessage(userData.message); // Set error message if the login fails
      }
      
      // return userData; // Return the response object for further handling
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
     
    }finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    console.log("Signing Out...");
    setUserInfo(null); // Clear the user info from the state
    setIsLoggedInUser(false); // Update the logged-in status
    await AsyncStorage.removeItem('userInfo'); // Remove user info from AsyncStorage
    console.log("Signed out successfully");
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      const parsedUserInfo = JSON.parse(storedUserInfo);
      
      if (parsedUserInfo) {
        setUserInfo(parsedUserInfo); // Set the parsed user info in the state
        setIsLoggedInUser(true); // Update the logged-in status to true
      } else {
        setIsLoggedInUser(false); // Update the logged-in status to false if no user info is found
      }
    } catch (error) {
      console.log(`isLoggedIn error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn(); // Check if the user is logged in on component mount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signOut,
        isLoggedIn,
        isLoggedInUser,
        isLoading,
        userInfo,
        allocationID,
        setAllocation,
        errorMessage, // Providing error message for UI to show
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
