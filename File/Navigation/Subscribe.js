import React, { useEffect, useState, useRef } from "react";
import { View, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import {
  initConnection,
  getSubscriptions,
  requestSubscription,
  purchaseUpdatedListener,
  finishTransaction,
} from "react-native-iap";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Card } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { useAuth } from "../Login/AuthContext";

const productMapping = {
  2500: {
    monthly: { id: "monthly_2500", price: 2500 },
    quarterly: { id: "quarterly_6500", price: 6500 }
  },
  3000: {
    monthly: { id: "monthly_3000", price: 3000 },
    quarterly: { id: "quarterly_8000", price: 8000 }
  },
  3500: {
    monthly: { id: "monthly_3500", price: 3500 },
    quarterly: { id: "quarterly_9500", price: 9500 }
  },
  4000: {
    monthly: { id: "monthly_4000", price: 4000 },
    quarterly: { id: "quarterly_11000", price: 11000 }
  },
  4500: {
    monthly: { id: "monthly_4500", price: 4500 },
    quarterly: { id: "quarterly_12500", price: 12500 }
  },
  5000: {
    monthly: { id: "monthly_5000", price: 5000 },
    quarterly: { id: "quarterly_14000", price: 14000 }
  },
  5500: {
    monthly: { id: "monthly_5500", price: 5500 },
    quarterly: { id: "quarterly_15000", price: 15000 }
  },
  6000: {
    monthly: { id: "monthly_6000", price: 6000 }
  },
  6500: {
    monthly: { id: "monthly_6500", price: 6500 }
  },
  7000: {
    monthly: { id: "monthly_7000", price: 7000 }
  },
  7500: {
    monthly: { id: "monthly_7500", price: 7500 }
  },
  8000: {
    monthly: { id: "monthly_8000", price: 8000 }
  },
  8500: {
    monthly: { id: "monthly_8500", price: 8500 }
  },
  9000: {
    monthly: { id: "monthly_9000", price: 9000 }
  },
  9500: {
    monthly: { id: "monthly_9500", price: 9500 }
  },
  10000: {
    monthly: { id: "monthly_10000", price: 10000 }
  },
  10500: {
    monthly: { id: "monthly_10500", price: 10500 }
  }
};

const levelNames = ["Beginner", "Intermediate", "Advanced", "Professional"];

const SubscriptionScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { userInfo } = useAuth();

  const apiCallMadeRef = useRef(false); // Prevents multiple API calls


  const courseName = route.params?.courseName || "No Course Selected";
  const levelID = route.params?.levelID;
  const isFeaturedPopularRare = route.params?.isFeaturedPopularRare;
  const baseAmountInr = route.params?.baseAmountInr;


  const selectedLevel = levelNames[levelID].toLowerCase();
  const allocid = route.params?.allocid || "No AllocID";


  const selectedProduct = productMapping[baseAmountInr] || {};

  // const selectedProduct = productMapping[category][selectedLevel] || {};
  const availableProductIds = Object.values(selectedProduct).map((plan) => plan.id);

  console.log("✅ Received AllocID:", allocid);
  console.log("✅ User ID:", userInfo?.userid);
  // ✅ Remove "Beginner" if present in the course name
  const formattedCourseName = courseName.replace(/Beginner/i, "").trim();

  // Determine the selected plan and amount
  const selectedPlan = selectedProduct.monthly || selectedProduct.quarterly;
  const selectedPrice = selectedPlan ? selectedPlan.price : 0; // Fetch the price of the selected plan

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        await initConnection();
        console.log("🔄 Initializing IAP connection...");

        if (availableProductIds.length === 0) {
          Alert.alert("Error", "No valid subscription products found.");
          return;
        }

        const fetchedProducts = await getSubscriptions({ skus: availableProductIds });

        console.log("✅ Subscriptions fetched:", fetchedProducts);

        if (!fetchedProducts.length) {
          Alert.alert("Error", "No subscription plans available. Check Play Store setup.");
          return;
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("❌ Error fetching subscriptions:", error);
        Alert.alert("Error", "Failed to load subscription plans. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();

    return () => {
      console.log("🛑 Cleanup listeners...");
      apiCallMadeRef.current = false;
    };
  }, []); // Empty dependency to only run on mount and unmount

  useEffect(() => {

    const purchaseListenerSubscription = purchaseUpdatedListener(async (purchase) => {

      if (apiCallMadeRef.current) {
        console.log("⚠️ API already called. Skipping duplicate request.");
        return;
      }
      apiCallMadeRef.current = true; // Set flag immediately to prevent duplicate calls

      try {
        await finishTransaction({ purchase, isConsumable: false });

        console.log("🔹 Purchased Product ID:", purchase.productId);
        console.log("🔹 Available Products:", products.map(p => p.productId));

        const selectedPlan = products.find(plan => plan.productId === purchase.productId);

        if (!selectedPlan) {
          console.error("❌ Selected plan not found!");
          Alert.alert("Error", "Invalid subscription plan.");
          return;
        }

        console.log("✅ Selected Plan:", selectedPlan);

        const purchaseToken = purchase.purchaseToken || purchase.transactionId;

        console.log("✅ Purchase Token:", purchaseToken);

        const isMonthly = purchase.productId === selectedProduct.monthly?.id;
        const feeType = isMonthly ? "0" : "1";

        if (!allocid || !userInfo?.userid) {
          Alert.alert("Error", "Missing required data for subscription.");
          return;
        }
        Alert.alert("Payment Successful", "API Call Initiated...");

        console.log("🟢 API Call Initiated with Parameters:");
        console.log("➡️ status:", "true");
        console.log("➡️ userid:", userInfo.userid);
        console.log("➡️ allocid:", allocid);
        console.log("➡️ feeType:", feeType);
        console.log("✅ Sending API request to createRazorSubscription...");



        // ✅ Find the price based on the actual selected productId
        let matchedPrice = 0;
        Object.values(productMapping).forEach(planGroup => {
          Object.values(planGroup).forEach(plan => {
            if (plan.id === purchase.productId) {
              matchedPrice = plan.price;
            }
          });
        });


        const response = await fetch("https://my.bmusician.com/app/createPlaySubscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            status: "true",
            userid: userInfo.userid,
            allocid: allocid.toString(),
            feeType: feeType.toString(),
            amount: matchedPrice.toString(),
            paymentid: purchase.transactionId || purchaseToken,
            purchaseToken: purchaseToken,
            productId: purchase.productId
          }).toString()
        });
        console.log("✅ API Call Done. Waiting for response...");

        const resultText = await response.text();
        console.log("🟢 Raw API Response:", resultText);

        try {
          const resultJson = JSON.parse(resultText);
          console.log("🟢 Full API Response:", JSON.stringify(resultJson, null, 2));

          setApiResponse(resultJson);

          const isSuccess = resultJson.success ?? resultJson.sucess ?? false;
          const message = resultJson.message || "Unknown response";

          //Alert.alert("API Response", `Success: ${isSuccess}\nMessage: ${message}`);

          // After successful payment, navigate to GetAllocationList screen
          if (isSuccess) {
            Alert.alert(
              "Payment Successful!",
              "Go to your Dashboard.",
              [
                {
                  text: "Go to Dashboard",
                  onPress: () => {
                    navigation.navigate("GetAllocationList", {
                      productId: purchase.productId,
                      userId: userInfo.userid,
                      allocid: allocid
                    });
                  },
                },
              ]
            );
          }

        } catch (error) {
          console.error("❌ JSON Parse Error:", error);
          setApiResponse({ success: false, message: "Invalid Response Format" });
        }

      } catch (error) {
        console.error("❌ Subscription API Error:", error);
        setApiResponse({ success: false, message: "Network Error" });
      }
    });

    return () => {
      purchaseListenerSubscription.remove();
    };
  }, [products]); // Only add listener after fetching products


  const purchaseSubscription = async (product) => {
    try {
      console.log("🔄 Purchasing:", product.productId);

      if (!product.subscriptionOfferDetails?.[0]?.offerToken) {
        Alert.alert("Error", "No subscription offers available.");
        return;
      }

      await requestSubscription({
        sku: product.productId,
        subscriptionOffers: [
          { sku: product.productId, offerToken: product.subscriptionOfferDetails[0].offerToken },
        ],
      });
    } catch (error) {
      console.error("❌ Purchase error:", error);
      //Alert.alert("Error", "Subscription failed. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Loading subscriptions...</Text>
        </View>
      ) : products.length === 0 ? (
        <Text style={styles.errorText}>❌ No subscription plans found!</Text>
      ) : (
        products.map((item, index) => {
          // ✅ Get Correct Plan from productMapping
          const plan = Object.values(selectedProduct).find(plan => plan.id === item.productId);
          const isMonthly = plan && selectedProduct.monthly?.id === item.productId;
          const priceText = plan ? `₹ ${plan.price} ${isMonthly ? "/m" : "/3m"} + GST` : "";

          const [pricePart, gstPart] = priceText.split(" + GST");

          return (
            <Card key={index} style={styles.card}>
              <LinearGradient colors={["#1e1e1e", "#000000"]} style={styles.gradientBackground}>
                <View style={styles.cardContent}>
                  {/* ✅ Show Course Name on One Line */}
                  {/* <Text style={styles.courseTitle}>{levelNames[levelID]} {formattedCourseName}</Text> */}




                  {/* ✅ Show Correct Plan Type */}
                  <Text style={styles.planTitle}>
                    {isMonthly ? "Monthly Plan" : "Quarterly Plan"}
                  </Text>
                  <Text style={styles.priceText}>
                    {pricePart}
                    <Text style={styles.gstText}>{` + GST`}</Text>
                  </Text>

                  {/* ✅ Show Amount & Duration in a Separate Line */}
                  {/* <Text style={styles.priceText}>{priceText}</Text> */}



                  {/* ✅ Features */}
                  {isMonthly ? (
                    <>
                      <Text style={styles.featureText}>✅ 4 LIVE CLASSES WITH CLASS RECORDINGS</Text>
                      <Text style={styles.featureText}>✅ 2 MONTHS VALIDITY FOR CLASSES</Text>
                      <Text style={styles.featureText}>
                        ✅ PERSONALIZED PROGRESS TRACKING DASHBOARD WITH BOOKS AND CLASS NOTES
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.featureText}>✅ 12 LIVE CLASSES WITH CLASS RECORDINGS</Text>
                      <Text style={styles.featureText}>✅ 4 MONTHS VALIDITY FOR CLASSES</Text>
                      <Text style={styles.featureText}>
                        ✅ PERSONALIZED PROGRESS TRACKING DASHBOARD WITH BOOKS AND CLASS NOTES
                      </Text>
                    </>
                  )}

                  {/* ✅ Subscribe Button */}
                  <Button
                    mode="contained"
                    onPress={() => purchaseSubscription(item)}
                    style={styles.subscribeButton}
                    labelStyle={styles.buttonText}
                  >
                    Subscribe
                  </Button>
                </View>
              </LinearGradient>
            </Card>
          );
        })
      )}
    </View>
  );
};

export default SubscriptionScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFD700",
    fontSize: 18,
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 4,
  },
  gradientBackground: {
    padding: 20,
    borderRadius: 15,
  },
  cardContent: {
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  priceText: {
    fontSize: 18, // Slightly larger than normal text
    fontWeight: "bold", // Makes it stand out
    color: "#FFD700", // Gold color for visibility
    textAlign: "center", // Align to center
    marginVertical: 5,
    marginBottom: 15,
  },
  gstText: {
    fontSize: 13, // Reduced size for the GST text
    color: "#FFD700",
  },

  planTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#bbb",
    textAlign: "center",
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 5,
    textAlign: "left",
    width: "90%",
  },
  subscribeButton: {
    backgroundColor: "#FF8C00",
    borderRadius: 25,
    paddingVertical: 4,
    width: "90%",
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

