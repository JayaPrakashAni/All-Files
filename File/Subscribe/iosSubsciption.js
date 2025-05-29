import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView, Linking, TouchableOpacity} from 'react-native';
import * as RNIap from 'react-native-iap';



const productMapping = {

  2000: {
    monthly: { id: 'monthly_2000_', price: 2399 },
    quarterly: { id: 'quarterly_5000_', price: 5900 }
  },

  2500: {
    monthly: { id: 'monthly_2500_', price: 2949 },
    quarterly: { id: 'quarterly_6500_', price: 7699 }
  },
  3000: {
    monthly: { id: 'monthly_3000_', price: 3549 },
    quarterly: { id: 'quarterly_8000_', price: 9499 }
  },
  3500: {
    monthly: { id: 'monthly_3500_', price: 4149 },
    quarterly: { id: 'quarterly_9500_', price: 11200 }
  },
  4000: {
    monthly: { id: 'monthly_4000_', price: 4749 },
    quarterly: { id: 'quarterly_11000_', price: 12999 }
  },
  4500: {
    monthly: { id: 'monthly_4500_', price: 5300 },
    quarterly: { id: 'quarterly_12500_', price: 14799 }
  },
  5000: {
    monthly: { id: 'monthly_5000_', price: 5900 },
    quarterly: { id: 'quarterly_14000_', price: 16500 }
  },
  5500: {
    monthly: { id: 'monthly_5500_', price: 6499 },
    quarterly: { id: 'quarterly_15000_', price: 17900 }
  },
  6000: { monthly: { id: 'monthly_6000_', price: 7099 } },
  6500: { monthly: { id: 'monthly_6500_', price: 7699 } },
  7000: { monthly: { id: 'monthly_7000_', price: 8299 } },
  7500: { monthly: { id: 'monthly_7500_', price: 8899 } },
  8000: { monthly: { id: 'monthly_8000_', price: 9499 } },
  8500: { monthly: { id: 'monthly_8500_', price: 10000 } },
  9000: { monthly: { id: 'monthly_9000_', price: 10699 } },
  9500: { monthly: { id: 'monthly_9500_', price: 11200 } },
  10000: { monthly: { id: 'monthly_10000_', price: 11800 } },
  10500: { monthly: { id: 'monthly_10500_', price: 12399 } }
};

const planFeatures = {
  monthly: {
    label: 'Monthly Plan',
    details: [
      '4 LIVE CLASSES WITH CLASS RECORDINGS',
      '2 MONTHS VALIDITY FOR CLASSES',
      'PERSONALIZED PROGRESS TRACKING DASHBOARD WITH BOOKS AND CLASS NOTES'
    ],
    suffix: '/month'
  },
  quarterly: {
    label: 'Quarterly Plan',
    details: [
      '12 LIVE CLASSES WITH CLASS RECORDINGS',
      '4 MONTHS VALIDITY FOR CLASSES',
      'PERSONALIZED PROGRESS TRACKING DASHBOARD WITH BOOKS AND CLASS NOTES'
    ],
    suffix: '/3months'
  },
  halfly: {
    label: 'Halfly Plan',
    details: [
      '24 LIVE CLASSES WITH CLASS RECORDINGS',
      '8 MONTHS VALIDITY FOR CLASSES',
      'PERSONALIZED PROGRESS TRACKING DASHBOARD WITH BOOKS AND CLASS NOTES'
    ],
    suffix: '/6m'
  },
  annual: {
    label: 'Annual Plan',
    details: [
      '48 LIVE CLASSES WITH CLASS RECORDINGS',
      '15 MONTHS VALIDITY FOR CLASSES',
      'PERSONALIZED PROGRESS TRACKING DASHBOARD WITH BOOKS AND CLASS NOTES'
    ],
    suffix: '/1yr'
  }
};

const IAPSubscriptionScreen = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseAmount = route?.params?.baseAmountInr;
  const courseName = route?.params?.courseName;
  const userId = String(route?.params?.userId || 'unknown_user');
  const allocid = String(route?.params?.allocid || 'unknown_allocid');

  const productSkus = [];
  const productPlanMap = {};

  if (productMapping[baseAmount]) {
    const plans = productMapping[baseAmount];
    for (let type in plans) {
      productSkus.push(plans[type].id);
      productPlanMap[plans[type].id] = type;
    }
  }

  useEffect(() => {

    const init = async () => {
      try {
        await RNIap.initConnection();
        const items = await RNIap.getSubscriptions({ skus: productSkus });

        const sortedItems = items.sort((a, b) => {
          const typeA = productPlanMap[a.productId];
          const typeB = productPlanMap[b.productId];

          const priority = { monthly: 1, quarterly: 2 };
          return (priority[typeA] || 99) - (priority[typeB] || 99);
        });

        setProducts(sortedItems);
      } catch (err) {
        Alert.alert('Error', 'Failed to connect to App Store.');
      } finally {
        setLoading(false);
      }
    };


    init();

    const purchaseUpdate = RNIap.purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          await RNIap.finishTransaction({ purchase, isConsumable: false });
          const purchaseToken = purchase.transactionId || receipt;

          const params = {
            status: 'true',
            userid: userId,
            allocid,
            feeType: '0',
            amount: baseAmount.toString(),
            purchaseToken,
            productId: purchase.productId
          };

          const bodyParams = new URLSearchParams(params);
          const response = await fetch('https://my.bmusician.com/app/CreateAppleSubscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: bodyParams.toString()
          });

          const result = await response.json();
          const isSuccess = result.success ?? result.sucess ?? false;
          if (isSuccess) {
            Alert.alert('Success', '✅ Subscription successful!');
            navigation.navigate('GetAllocationList');
          } else {
            Alert.alert('API Error', result.message || 'Payment API failed.');
          }
        } catch {
          Alert.alert('Error', 'Subscription succeeded but API failed.');
        }
      }
    });

    const purchaseError = RNIap.purchaseErrorListener((error) => {
      // Alert.alert('Purchase Failed', error.message || 'Try again.');
    });

    return () => {
      purchaseUpdate.remove();
      purchaseError.remove();
      RNIap.endConnection();
    };
  }, []);

  const purchase = async (sku) => {
    try {

      await RNIap.requestSubscription({ sku });

    } catch {

      // Alert.alert('Error', 'Purchase could not be started.');
    }
  };

  if (loading) return <ActivityIndicator size="large" />;

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };


  return (

    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={{ padding: 20 }}>
        <Text style={styles.courseTitle}>{courseName}</Text>

        {products.map((item) => {
          const planType = productPlanMap[item.productId];
          const feature = planFeatures[planType] || {};


          // Get the price for the plan from productMapping
          const productPrice = productMapping[baseAmount]?.[planType]?.price;
          const productId = productMapping[baseAmount]?.[planType]?.id; // Get the product ID


          return (
            <View key={item.productId} style={styles.card}>
              <Text style={styles.planTitle}>{feature.label}</Text>

                   {/* Display product ID between the plan title and price */}
                   <Text style={styles.productIdText}>{productId}</Text>

              <Text style={styles.price}>
                ₹{productPrice} {feature.suffix} (incl. GST)
                {/* {item.localizedPrice} {feature.suffix}  (incl. GST) */}
              </Text>

              {feature.details?.map((line, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.tick}>✅</Text>
                  <Text style={styles.featureText}>{line}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.subscribeButton} onPress={() => purchase(item.productId)}>
                <Text style={styles.subscribeButtonText}>Subscribe</Text>
              </TouchableOpacity>

              {/* <View style={styles.subscribeButton}>
                <Text
                  style={styles.subscribeButtonText}
                  onPress={() => purchase(item.productId)}
                >
                  Subscribe
                </Text>
              </View> */}


              {/* <Button title="Subscribe" onPress={() => purchase(item.productId)} /> */}
            </View>
          );
        })}

    {/* Footer with Links */}
      {/* Footer with Links */}
      <View style={styles.footer}>
          {/* Flex direction row for Terms of Use and Privacy Policy buttons */}
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => openLink('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')}
            >
              <Text style={styles.footerButtonText}>Terms of Use</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => openLink('https://www.bmusician.com/privacy-policy/')}
            >
              <Text style={styles.footerButtonText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>


        {/* Centered Terms & Conditions Button */}
          <TouchableOpacity
            style={styles.centeredFooterButton}
            onPress={() => openLink('https://www.bmusician.com/terms-and-conditions/')}
          >
            <Text style={styles.footerButtonText}>Terms & Conditions</Text>
          </TouchableOpacity>


        </View >
        </View >
    </ScrollView>
  
  );
};

const styles = StyleSheet.create({
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#222'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#222',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2E8B57',
    textAlign: 'center',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tick: {
    fontSize: 18,
    color: '#2ecc71',
    marginRight: 10,
  },
  featureText: {
    fontSize: 15,
    color: '#444',
    flexShrink: 1,
  },
  subscribeButton: {
    backgroundColor: '#2e86de',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollViewContent: {
    paddingBottom: 20, // Optional, adds padding at the bottom for scrolling
  },

  productIdText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginVertical: 8,  // Styling for the product ID
  },

  footer: {
    marginTop: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will space out the buttons evenly
    paddingHorizontal: 20,
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  footerButtonText: {
    color: '#007AFF', // Blue color for the button text
    fontSize: 16,
    fontWeight: '500',
  },
  centeredFooterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center',  // Center-align the button horizontally
  },
});


export default IAPSubscriptionScreen;