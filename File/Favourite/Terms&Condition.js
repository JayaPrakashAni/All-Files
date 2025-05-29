import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TermsACondition = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.introText}>
                    Please read these Terms and Conditions carefully before subscribing to any of the courses offered on the website. Use of the website bmusician.com and its contents is subject to the following terms and conditions. By subscribing for a course with Bmusician, you accept and agree to be legally bound by these Terms and conditions.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="schedule" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Punctuality and Class Attendance</Text>
                </View>
                <Text style={styles.content}>Students are expected to join a class within 15 minutes of the scheduled class time.</Text>
                <Text style={styles.content}>In a case, where a student does not join a class within 15 minutes, the class will be marked as absent by the teacher. There will be no compensation class in this case.</Text>
                <Text style={styles.content}>Each class will be 50 minutes to 1 hour long. Students have the right to request for a new class if a Guru ends a class in less than 45 minutes.</Text>
                <Text style={styles.content}>Students reserve the right to demand a compensation class, in a case where a teacher does not join a class within 10 minutes to the scheduled class time.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <FontAwesome name="user-secret" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Student's Code of Conduct</Text>
                </View>
                <Text style={styles.boldContent}>Private engagements with Gurus outside Bmusician platform, Getting Teacher’s contact information, sharing personal contact information with Teacher without prior permission from Bmusician is STRICTLY prohibited.</Text>
                <Text style={styles.content}>If a student misbehaves with the Guru or shows disrespect to the Guru, Bmusician reserves the right to CANCEL the student’s subscription and FORBID the student from using the Bmusician platform.</Text>
                <Text style={styles.content}>In such a case, Bmusician will not refund the fees paid for the unused classes.</Text>
                <Text style={styles.content}>The student is expected to follow the instructions of the Guru during the class.</Text>
                <Text style={styles.content}>Parents, if required, can accompany the students during the class. However, only minimum degree of involvement is expected from the parents during the lessons.</Text>
                <Text style={styles.content}>The student is not allowed to initiate private classes with the Guru.</Text>
                <Text style={styles.content}>The student is not allowed to accept any private class arrangements or offers made by the Guru.</Text>
                <Text style={styles.content}>The student should report any private class arrangements or offers made by the Guru to Bmusician immediately.</Text>
                <Text style={styles.content}>The student should acknowledge that initiating private classes with his or her Guru that was provided by Bmusician, is a breach of integrity, and Bmusician can take strict action against such individuals.</Text>
                <Text style={styles.content}>Drinking Alcohol, Smoking and other such similar behaviour is strictly prohibited during the Live class. A maximum of 2 warnings will be issued in such cases. If a student continues to do so after repeated warnings, he/she will be banned from using the platform with immediate effect without refund.</Text>
                <Text style={styles.content}>Disrespect shown to the Guru in any form will be taken very seriously. Bmusician reserves the right to decide what is disrespectful and what is not. Such students will be banned from using the platform with immediate effect without refund.</Text>
                <Text style={styles.content}>If a student assesses that the assigned Guru is not up to the mark or is misbehaving, the student has the duty of immediately informing Bmusician. Upon investigating if found true, Bmusician will take strict action against such Gurus. A new Guru will be allocated to the student.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="calendar" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Cancelling or Rescheduling a Class / Putting Remaining Classes on Hold</Text>
                </View>
                <Text style={styles.content}>Cancellation or rescheduling of a class must be done at least 24 hours prior to the scheduled class time. Such cancellation or rescheduling should be done using the Bmusician Class Calendar feature only. Students are discouraged from seeking Bmusician’s administrative assistance for class cancellation (except in emergency situations) and rescheduling as the necessary self-help features are already provided in the Bmusician platform.</Text>
                <Text style={styles.content}>Students are discouraged from putting remaining classes on hold. However, a student may request to put remaining classes on hold in unavoidable circumstances. Such requests will be assessed by Bmusician on a case-by-case basis. Whether or not approval is granted, there would be no refund of fees paid to Bmusician.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="computer" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Minimum Computing Resources for Classes via Bmusician</Text>
                </View>
                <Text style={styles.boldContent}>The computing resources used to learn via Bmusician must meet the minimum requirements listed below:</Text>
                <Text style={styles.content}>Desktop/ Laptop with Google Chrome browser or Phone/Tablet with Bmusician App installed is required for the classes.</Text>
                <Text style={styles.content}>Minimum Internet speed of 20 mbps is required for the classes.</Text>
                <Text style={styles.content}>In case if the class gets disrupted due to the student’s computing resources not meeting the minimum requirements for learning via the Bmusician platform, Bmusician will not provide for any compensation. If such problem arises from the Guru’s end, then Bmusician shall cancel the class and reschedule a compensation class at no extra cost to the student.</Text>
                <Text style={styles.content}>Taking a class outside Bmusician platform or requesting the teacher to do so is strictly prohibited. Any student/teacher making such requests/attempts will be banned from using Bmusician.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="video-library" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Class Recordings</Text>
                </View>
                <Text style={styles.boldContent}>Bmusician Live Classroom has an inbuilt class recorder that gives HD class recording for every class,</Text>
                <Text style={styles.content}>The inbuilt class recorder can be used only 1 time in a class. Classes can be recorded for a maximum of 10 minutes.</Text>
                <Text style={styles.content}>Class recording will be stored in public but unlisted.</Text>
                <Text style={styles.content}>However, student can request to hide the videos from public and the videos will hidden immediately.</Text>
                <Text style={styles.content}>Class recordings will be used for promotional/ advertisement purposes but only upon obtaining permission from the student for the same.</Text>
                <Text style={styles.content}>Class recordings cannot be downloaded. They can be watched on both bmusician website and mobile apps.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="person-remove" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Discontinuation of a Guru</Text>
                </View>
                <Text style={styles.content}>If a Guru discontinues with Bmusician due some unavoidable reason, while a student has unfinished classes, Bmusician will attempt to allocate another Guru for the student within a week. In an unfortunate event and only if a new Guru could not be assigned to the student, Bmusician will provide a refund for the unused classes.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="swap-horiz" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Change of Guru</Text>
                </View>
                <Text style={styles.content}>A student may request Bmusician to change his or her Guru. However, a valid reason must be provided in such cases. Bmusician reserves the right to approve or disapprove such requests. If approved, a new Guru will be allocated to the student at the earliest.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <FontAwesome name="money" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Fee Payment</Text>
                </View>
                <Text style={styles.content}>Bmusician implements a subscription-based Fee payment model. Fees will be automatically deducted for each subscription term on the date of subscription. Upon successful fee payment, the number of classes corresponding to the subscription term would be allotted to the student’s account and an invoice will be sent to the student via email.</Text>
                <Text style={styles.content}>Bmusician reserves the right to deduct fees (whether for subscription or enrollment) from the student’s bank/credit card account provided at the time of subscription/registration.</Text>
                <Text style={styles.content}>Fee will be deducted on the subscription date and time every term, regardless of the number of unused lessons left in the user’s account.</Text>
                <Text style={styles.content}>Student can upgrade/downgrade or cancel their subscription. In case of upgrade or downgrade, he/she will be charged with the new amount and the subscription plan will be changed immediately.</Text>
                <Text style={styles.content}>In case of cancellation, students will not be charged in future. There will be no refund for any previous payments. However, unused classes will not be removed and the student can attend these classes.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="cancel" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Cancellation of Subscription</Text>
                </View>
                <Text style={styles.content}>If a student cancels a subscription prior to the completion of the subscription term, that is, while still having outstanding unused classes, Bmusician would not provide any fee refund, however, the student can make use of the classes as the cancellation of the subscription would take effect only when the term of subscription ends.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="policy" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Refund Policy</Text>
                </View>
                <Text style={styles.content}>Bmusician follows a strict no-refund policy. Any amount that is paid for classes in terms of subscription will not be refunded.</Text>
                <Text style={styles.content}>In an event of subscription cancellation, the classes left unused in a user’s account can still be utilized only in the form of classes and will not be refunded.</Text>
                <Text style={styles.content}>In some rare cases, per approval of Bmusician Finance Team, we may process refunds of a payment made to users with a maximum cap of 500 USD. In such cases, the user shall be charged for any Payment Gateway Charges/Taxes/Currency Conversion charges. The refund after deducting any such charges amount shall reach the user’s account within 5-7 business days.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <FontAwesome name="exchange" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Changes in Terms and Conditions</Text>
                </View>
                <Text style={styles.content}>Bmusician reserves the right, at its sole discretion, to modify or replace the above mentioned Terms at any time. The users shall be notified about the changes.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="contact-support" size={24} color="#ED4D57" />
                    <Text style={styles.heading}>Contact Us</Text>
                </View>
                <Text style={styles.content}>If you have any queries regarding the Terms, please contact us at support@bmusician.com.</Text>
            </View>
        </ScrollView>
    );
}

export default TermsACondition;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        padding: 15,
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
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    heading: {
        paddingLeft: 10,
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',
    },
    introText: {
        color: '#ED4D57',
        fontSize: 16,
        textAlign: 'justify'
    },
    boldContent: {
        paddingVertical: 5,
        fontSize: 16,
        lineHeight: 25,
        fontWeight: 'bold',
        textAlign: 'justify',
        color: 'black',
    },
    content: {
        paddingVertical: 5,
        fontSize: 16,
        lineHeight: 25,
        textAlign: 'justify',
        color: 'black',
    }
});
