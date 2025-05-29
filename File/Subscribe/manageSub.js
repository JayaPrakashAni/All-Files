import { useEffect } from "react";
import { Platform, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';

const ManageSubscription = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // You can force a refresh here if needed
        });

        return unsubscribe;
    }, [navigation]);

    if (Platform.OS === 'android') {
        const packageName = "com.dcore.loginapplication"; // Replace with your actual Android package name
        const url = `https://play.google.com/store/account/subscriptions?package=${packageName}`;
        Linking.openURL(url);
    } else if (Platform.OS === 'ios') {
        const url = 'https://apps.apple.com/account/subscriptions';
        Linking.openURL(url);
    }
};

export default ManageSubscription;
