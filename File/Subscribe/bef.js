import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import * as RNIap from 'react-native-iap';

const itemSkus = ['test_04'];

const IAPSubscriptionScreen = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('🔌 Initializing IAP connection...');
        await RNIap.initConnection();
        const items = await RNIap.getSubscriptions({ skus: itemSkus });
        setProducts(items);
        console.log('✅ Fetched subscriptions:', items);
      } catch (err) {
        console.warn('❌ IAP init error', err);
        Alert.alert('Error', 'Failed to connect to App Store.');
      } finally {
        setLoading(false);
      }
    };

    init();

    const purchaseUpdate = RNIap.purchaseUpdatedListener(async (purchase) => {

      console.log('🧾 Full purchase object:', JSON.stringify(purchase, null, 2));

      const receipt = purchase.transactionReceipt;

      if (receipt) {
        console.log('✅ Payment receipt received');
        try {
          await RNIap.finishTransaction({ purchase, isConsumable: false });

          const purchaseToken = purchase.transactionId || receipt;
          // const orderId = purchase.orderId || 'unknown_order';
          // const orderId = purchase.transactionId || purchase.originalTransactionId || 'unknown_ios_order';


          const userId = String(route?.params?.userId || 'unknown_user');
          const allocid = String(route?.params?.allocid || 'unknown_allocid');

          const params = {
            status: "true",
            userid: userId,
            allocid: allocid,
            feeType: "0",
            amount: "3000",
            purchaseToken: purchaseToken,
            productId: purchase.productId,
            //paymentid: orderId,
          };

          console.log('📦 Params to be sent to API:', params);

          const bodyParams = new URLSearchParams(params);
          console.log("🔍 Raw POST body:", bodyParams.toString());

          const response = await fetch("https://my.bmusician.com/app/CreateAppleSubscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: bodyParams.toString()
          });

          const result = await response.json();
          console.log("🌐 API Response:", result); // <-- log API response here

          const isSuccess = result.success ?? result.sucess ?? false;

          if (isSuccess) {
            Alert.alert("Success", "✅ Subscription successful!");
            navigation.navigate("GetAllocationList");
          } else {
            Alert.alert("API Error", result.message || "Payment API failed.");
          }
        } catch (error) {
          console.error("❌ API Error:", error);
          Alert.alert("Error", "⚠️ Subscription succeeded but API failed.");
        }
      } else {
        console.warn('⚠️ No receipt found in purchase.');
      }
    });

    const purchaseError = RNIap.purchaseErrorListener((error) => {
      console.warn('❌ Purchase error:', error);
      Alert.alert('Purchase Failed', error.message || 'Try again.');
    });

    return () => {
      purchaseUpdate.remove();
      purchaseError.remove();
      RNIap.endConnection();
    };
  }, []);

  const purchase = async (sku) => {
    try {
      console.log(`🟡 Attempting to purchase: ${sku}`);
      await RNIap.requestSubscription({ sku });
    } catch (error) {
      console.error('❌ Purchase request error:', error);
      Alert.alert('Error', '⚠️ Purchase could not be started.');
    }
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ padding: 20 }}>
      {products.map((item) => (
        <View key={item.productId} style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
          <Text>{item.localizedPrice}</Text>
          <Button title="Subscribe" onPress={() => purchase(item.productId)} />
        </View>
      ))}
    </View>
  );
};

export default IAPSubscriptionScreen;
