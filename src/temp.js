// import React, { useEffect, useState } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
// import notifee, { EventType } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import database from '@react-native-firebase/database';

// const NotificationExample: React.FC = ({ navigation }: any) => {
//     const [title, setTitle] = useState('');
//     const [messageDesc, setMessageDesc] = useState('');

//     useEffect(() => {
//         const createNotificationChannel = async () => {
//             await notifee.createChannel({
//                 id: 'message',
//                 name: 'Message Notifications',
//                 sound: 'notification_sound',
//                 importance: 4,
//                 visibility: 1,
//             });
//         };

//         const getDeviceToken = async () => {
//             // Request permission for notifications
//             await messaging().requestPermission();
//             const token = await messaging().getToken();
//             console.log('Device Token:', token);
//             // Store the token in Firebase Database
//             await database().ref(`/tokens/${token}`).set({ token });
//         };

//         createNotificationChannel();
//         getDeviceToken(); // Retrieve device token when the component mounts
//     }, []);

//     const handleSendNotificationToAll = async () => {
//         try {
//             // Create the notification payload
//             const message = {
//                 notification: {
//                     title: title || 'Default Title',
//                     body: messageDesc || 'Default Message',
//                 },
//                 data: {
//                     title: title || 'Default Title',
//                     body: messageDesc || 'Default Message',
//                 },
//                 android: {
//                     channelId: 'message', // Must match the channel ID
//                 },
//             };

//             // Fetch all tokens from Firebase Database
//             const tokensSnapshot = await database().ref('/tokens').once('value');
//             const tokens = [];
//             tokensSnapshot.forEach(childSnapshot => {
//                 tokens.push(childSnapshot.val().token);
//             });

//             // Send notification to all tokens
//             await notifee.displayNotification({
//                 title: message.notification.title,
//                 body: message.notification.body,
//                 android: {
//                     channelId: 'message',
//                     smallIcon: 'ic_notification',
//                     largeIcon: 'ic_notification',
//                     actions: [
//                         {
//                             title: 'Open',
//                             pressAction: { id: 'open' },
//                         },
//                     ],
//                 },
//             });

//             ToastAndroid.show('Notifications sent to all users', ToastAndroid.SHORT);
//         } catch (error) {
//             console.error('Error sending notifications:', error);
//             ToastAndroid.show('Error sending notifications', ToastAndroid.SHORT);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 placeholder="Message title"
//                 value={title}
//                 onChangeText={setTitle}
//                 style={styles.input}
//             />
//             <TextInput
//                 placeholder="Message description"
//                 value={messageDesc}
//                 onChangeText={setMessageDesc}
//                 style={styles.input}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleSendNotificationToAll}>
//                 <Text style={styles.buttonText}>Target All Devices & Send Notification</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         backgroundColor: '#f5f5f5',
//         borderRadius: 10,
//     },
//     input: {
//         borderWidth: 1,
//         borderRadius: 8,
//         padding: 10,
//         marginBottom: 15,
//         backgroundColor: '#fff',
//     },
//     button: {
//         marginTop: 20,
//         backgroundColor: '#4CAF50',
//         padding: 15,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default NotificationExample;





All_Tokens = [
    "fM8-mRngQmyofPRQymkCAJ:APA91bEVcim2UZRgVNVRn66gF91lsAd4YnM3eHHA1hdTNaW6ewqsuZ5ldNhg_vn12vIjZWxLjuhHpTrnWHYsZ2UIigWKyP8nzHetGj46HCH5-uTOawbsaWkscek6k5cBqUC-ixSkbYGq",
    "cS9SZMNDQNqeM_ntPOXH1l:APA91bEhw3urn0heKdMRTfwHO13CKN9Lk2FEhxQLfUH0pg9DHQjZA4NnQtjxW5Z0Wr1PeIq2GYLbiMt4tXRkXTO0vz--O9fSHgptPQUCajVnWIEsJChTwtA_MvbegHy4vg_x_xHwP7Cf",
]