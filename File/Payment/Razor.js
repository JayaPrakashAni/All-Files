import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { RAZORPAY_KEY_ID } from '@env';
import RazorpayCheckout from 'react-native-razorpay';

const amount = 50;
const currency = 'INR';

const handlePayment = (navigation, enrollID) => {
  if (!RAZORPAY_KEY_ID) {
    console.error('Razorpay Key is missing');
    Alert.alert('Payment Error', 'Razorpay Key is not defined');
    return;
  }

  const options = {
    description: 'Credits towards consultation',
    currency: currency,
    key: RAZORPAY_KEY_ID,
    amount: amount * 100,
    name: 'BMusician',
    prefill: {
      email: 'JayG@example.com',
      contact: '',
      name: 'Jaypee'
    },
    theme: { color: '#53a20e' }
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      console.log(`Success: ${data.razorpay_payment_id}`);
      navigation.navigate('Enrollment Success', { enrollID });
    })
    .catch((error) => {
      console.error(`Error: ${error.code} | ${error.description}`);
      if (error.code === 0) {
        // User cancelled the payment
        Alert.alert('Payment Cancelled', 'Payment Cancelled by the User!');
      } else {
        // Other payment errors
        Alert.alert('Payment Failed', error.description || 'Something went wrong');
      }
      navigation.goBack();
    });
};

const RazorPayPayment = ({ navigation }) => {
  useEffect(() => {
    const enrollID = navigation.getParam('enrollID');

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    handlePayment(navigation, enrollID);

    return () => backHandler.remove();
  }, [navigation]);

  return null;
};

export default RazorPayPayment;
export { handlePayment };
