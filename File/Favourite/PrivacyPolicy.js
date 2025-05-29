import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PrivacyPolicy = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <FontAwesome5 name="shield-alt" size={24} color="#ED4D57" />
                    <Text style={styles.header}>Privacy Policy</Text>
                </View>
                <Text style={styles.content}>
                    Bmusician Pte Ltd built the Bmusician app as a Free app. This SERVICE is provided by Bmusician Pte Ltd at no cost and is intended for use as is. This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service. If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Bmusician unless otherwise defined in this Privacy Policy.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="info" size={24} color="#4CAF50" />
                    <Text style={styles.header}>Information Collection and Use</Text>
                </View>
                <Text style={styles.content}>
                    For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Location, Gender, Email, Contact No, Timezone, Age, Name. We use this information only for the allocation of the most suitable teacher to the students. The information that we request will be retained by us and used as described in this privacy policy. The app does NOT use any third party services that may collect information used to identify you. Link to privacy policy of third party service providers used by the app.
                </Text>
                <Text style={styles.subHeader}>
                    We use personally identifiable information like Age, Gender, Email only for the allocation of the most suitable teacher to the students. If you are under the age of 13, your parent or guardian’s consent is required before you can provide any personal information to us for purposes of registration and/or other online activities.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="location-on" size={24} color="#FF9800" />
                    <Text style={styles.header}>Location Information</Text>
                </View>
                <Text style={styles.content}>
                    The app collects location information from the backend to understand which country you enroll from. We use this data to allocate to the right teacher and set the correct Fee in your local currency.
                </Text>
                <Text style={styles.centerText}>
                    We will not use or share this information with anyone.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="assignment" size={24} color="#2196F3" />
                    <Text style={styles.header}>Log Data</Text>
                </View>
                <Text style={styles.content}>
                    We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="cookie" size={24} color="#795548" />
                    <Text style={styles.header}>Cookies</Text>
                </View>
                <Text style={styles.content}>
                    Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device’s internal memory.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="people" size={24} color="#9C27B0" />
                    <Text style={styles.header}>Service Providers</Text>
                </View>
                <Text style={styles.contentBold}>
                    We may employ third-party companies and individuals due to the following reasons:
                </Text>
                <Text style={styles.content}>- To facilitate our Service;</Text>
                <Text style={styles.content}>- To provide the Service on our behalf;</Text>
                <Text style={styles.content}>- To perform Service-related services; or</Text>
                <Text style={styles.content}>- To assist us in analyzing how our service is used.</Text>
                <Text style={styles.content}>
                    We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="security" size={24} color="#F44336" />
                    <Text style={styles.header}>Security</Text>
                </View>
                <Text style={styles.content}>
                    We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="link" size={24} color="#3F51B5" />
                    <Text style={styles.header}>Links to Other Sites</Text>
                </View>
                <Text style={styles.content}>
                    This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="child-care" size={24} color="#4CAF50" />
                    <Text style={styles.header}>Children’s Privacy</Text>
                </View>
                <Text style={styles.content}>
                    Consistent with the Children’s Online Privacy Protection Act (“COPPA”), Bmusician does not solicit personal information from children. Visitors 13 years of age and under should remember that they are required to obtain an adult’s permission before submitting any personal information to this, or any other, Web site.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="update" size={24} color="#FFEB3B" />
                    <Text style={styles.header}>Changes to This Privacy Policy</Text>
                </View>
                <Text style={styles.content}>
                    We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
                </Text>
            </View>
        </ScrollView>
    );
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#F5F5F5',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
        flexShrink: 1, // Ensure long headers wrap properly within the card
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        textAlign: 'justify',
        lineHeight: 25,
    },
    content: {
        fontSize: 16,
        color: 'black',
        textAlign: 'justify',
        lineHeight: 25,
        marginBottom: 10,
    },
    contentBold: {
        fontSize: 16,
        fontWeight: '900',
        color: 'black',
        textAlign: 'justify',
        lineHeight: 25,
        marginBottom: 10,
    },
    centerText: {
        fontSize: 16,
        color: 'black',
        lineHeight: 25,
        marginBottom: 10,
    },
});
