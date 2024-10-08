// import React, { useEffect } from 'react';
// import { View, Button, Alert } from 'react-native';
// import notifee, { EventType } from '@notifee/react-native';

// const NotificationExample = () => {
//     useEffect(() => {
//         // Handle foreground notification actions
//         const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
//             if (type === EventType.ACTION_PRESS) {
//                 const { pressAction } = detail;
//                 if (pressAction.id === 'okay') {
//                     console.log('Okay pressed');
//                 } else if (pressAction.id === 'mark_as_read') {
//                     console.log('Mark as Read pressed');
//                 } else if (pressAction.id === 'close') {
//                     console.log('Close pressed');
//                 }
//             }
//         });

//         return unsubscribe; // Cleanup the event listener on unmount
//     }, []);



//     async function createNotificationChannel() {
//         await notifee.createChannel({
//             id: 'message',
//             name: 'Message Notifications',
//             sound: 'notification_sound', // Name of the sound file without extension
//             importance: 4, // HIGH importance
//         });
//     }




//     const triggerNotification = async () => {
//         console.log("triggerNotification");

//           await createNotificationChannel();


//         // Display a notification
//         await notifee.displayNotification({
//             title: 'Testing',
//             body: message,
//             android: {
//                 channelId: 'message',
//                 sound: 'notification_sound',
//                 actions: [
//                     {
//                         title: 'Okay',
//                         pressAction: { id: 'okay' },
//                     },
//                     {
//                         title: 'Mark as Read',
//                         pressAction: { id: 'mark_as_read' },
//                     },
//                     {
//                         title: 'Close',
//                         pressAction: { id: 'close' },
//                     },
//                 ],
//             },
//         });
//     };

//     return (
//         <View>
//             <Button title="Send Notification" onPress={triggerNotification} />
//         </View>
//     );
// };

// export default NotificationExample;







// import React, { useEffect } from 'react';
// import { View, Button } from 'react-native';
// import notifee, { EventType } from '@notifee/react-native';

// const NotificationExample = () => {
//     useEffect(() => {
//         const createNotificationChannel = async () => {
//             await notifee.createChannel({
//                 id: 'message',
//                 name: 'Message Notifications',
//                 sound: 'notification_sound', // Ensure this sound file is in the right location
//                 importance: 4, // HIGH importance
//             });
//         };

//         const triggerNotification = async (message) => {
//             // Display a notification
//             await notifee.displayNotification({
//                 title: 'New Message',
//                 body: message,
//                 android: {
//                     channelId: 'message', // Use the channel created earlier
//                     sound: 'notification_sound', // Play the sound with the notification
//                     actions: [
//                         {
//                             title: 'Okay',
//                             pressAction: { id: 'okay' },
//                         },
//                         {
//                             title: 'Mark as Read',
//                             pressAction: { id: 'mark_as_read' },
//                         },
//                         {
//                             title: 'Close',
//                             pressAction: { id: 'close' },
//                         },
//                     ],
//                 },
//             });
//         };

//         const simulateMessageReception = (message) => {
//             console.log('Simulating message reception:', message);
//             triggerNotification(message);
//         };

//         const simulateIncomingMessages = () => {
//             // Simulating receiving messages
//             simulateMessageReception('Hello, this is a new message!');
//             simulateMessageReception('Another message received!');
//         };

//         createNotificationChannel().then(simulateIncomingMessages);

//         return () => {
//             // Cleanup if needed
//         };
//     }, []);

//     return (
//         <View>
//             <Button title="Send Notification" onPress={() => {}} />
//         </View>
//     );
// };

// export default NotificationExample;



// import React, { useEffect, useState } from 'react';
// import { View, Button, TextInput, Text, TouchableOpacity } from 'react-native';
// import notifee, { EventType } from '@notifee/react-native';

// const NotificationExample: React.FC = () => {
//     const [message, setMessage] = useState('');
//     const [messageDesc, setMessageDesc] = useState('');
//     const [notificationType, setNotificationType] = useState<'foreground' | 'background' | 'killMode'>('foreground');

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



//         const handleForegroundEvent = () => {
//             return notifee.onForegroundEvent(({ type, detail }) => {
//                 if (type === EventType.ACTION_PRESS) {
//                     const { pressAction } = detail;
//                     console.log('Foreground Action pressed:', pressAction?.id);
//                 }
//             });
//         };

//         const handleBackgroundNotifications = () => {
//             notifee.onBackgroundEvent(async ({ type, detail }) => {
//                 if (type === EventType.ACTION_PRESS) {
//                     const { pressAction } = detail;
//                     console.log('Background Action pressed:', pressAction?.id);
//                 }
//             });
//         };

//         createNotificationChannel();
//         handleForegroundEvent();
//         handleBackgroundNotifications();
//     }, []);


//     const notificationContent = async (message: string, messageDesc: string) => {
//         await notifee.displayNotification({
//             title: message,
//             body: messageDesc,
//             android: {
//                 channelId: 'message',
//                 sound: 'notification_sound',
//                 smallIcon: 'ic_notification',
//                 largeIcon: 'ic_notification',
//                 // ongoing: true, // Make the notification sticky
//                 importance: 4,  // High priority for heads-up notification
//                 actions: [
//                     {
//                         title: 'Open',
//                         pressAction: { id: 'close' },
//                     },
//                     {
//                         title: 'Mark as Read',
//                         pressAction: { id: 'mark_as_read' },
//                     },
//                 ],
//             },
//         });
//     };


//     const handleSendNotification = async () => {
//         if (notificationType === 'foreground') {
//             await notificationContent(message, messageDesc);
//         } else if (notificationType === 'background') {
//             console.log('Background Notification:', message);
//             await notificationContent(message, messageDesc);
//         } else if (notificationType === 'killMode') {
//             console.log('Kill Mode Notification:', message);
//             await notificationContent(message, messageDesc);
//         }
//         // setMessage('');
//     };

//     return (
//         <View style={{ padding: 20 }}>
//             <Text>Notification Test</Text>

//             <TextInput
//                 placeholder='Message title'
//                 value={message}
//                 onChangeText={setMessage}
//                 style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//             />
//             <TextInput
//                 placeholder='Message description'
//                 value={messageDesc}
//                 onChangeText={setMessageDesc}
//                 style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//             />

//             <Text>Select Notification Type:</Text>
//             {['foreground', 'background', 'killMode'].map(type => (
//                 <TouchableOpacity key={type} onPress={() => setNotificationType(type as 'foreground' | 'background' | 'killMode')} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
//                     <View style={{
//                         width: 20,
//                         height: 20,
//                         borderRadius: 10,
//                         borderWidth: 1,
//                         borderColor: 'black',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         marginRight: 10,
//                     }}>
//                         {notificationType === type && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />}
//                     </View>
//                     <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
//                 </TouchableOpacity>
//             ))}

//             <Button title="Send Notification" onPress={handleSendNotification} />
//         </View>
//     );
// };

// export default NotificationExample;







// import React, { useEffect, useState } from 'react';
// import { View, Button, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
// import notifee, { EventType } from '@notifee/react-native';

// const NotificationExample: React.FC = ({navigation}:any) => {
//     const [title, setTitle] = useState('');
//     const [messageDesc, setMessageDesc] = useState('');
//     const [errorMsg, setErrorMsg] = useState(false)
//     const [errorTitle, setErrorTitle] = useState(false)
//     const [notificationType, setNotificationType] = useState<'foreground' | 'background' | 'killMode'>('foreground');

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

//         const handleForegroundEvent = () => {
//             return notifee.onForegroundEvent(({ type, detail }) => {
//                 if (type === EventType.ACTION_PRESS) {
//                     const { pressAction } = detail;


//                     if (pressAction?.id === 'open') {
//                         // Navigate to CustomScreen when "Open" is pressed
//                         navigation.navigate('NotificationDetail',{data:{title, messageDesc}});
//                     }

//                     console.log('Foreground Action pressed:', pressAction?.id);
//                 }
//             });
//         };

//         const handleBackgroundNotifications = () => {
//             notifee.onBackgroundEvent(async ({ type, detail }) => {
//                 if (type === EventType.ACTION_PRESS) {
//                     const { pressAction } = detail;
//                     console.log('Background Action pressed:', pressAction?.id);
//                 }
//             });
//         };

//         createNotificationChannel();
//         handleForegroundEvent();
//         handleBackgroundNotifications();
//     }, []);

//     const notificationContent = async (title: string, messageDesc: string) => {


//         await notifee.displayNotification({
//             title: title,
//             body: messageDesc,
//             android: {
//                 channelId: 'message',
//                 sound: 'notification_sound',
//                 smallIcon: 'ic_notification',
//                 largeIcon: 'ic_notification',
//                 importance: 4,
//                 actions: [
//                     {
//                         title: 'Open',
//                         pressAction: { id: 'open' },
//                     },
//                     {
//                         title: 'Mark as Read',
//                         pressAction: { id: 'mark_as_read' },
//                     },
//                 ],
//             },
//         });


//     };

//     const handleSendNotification = async () => {
//         if(title=='' ||messageDesc=='' ){
//             setErrorTitle(true)
//             setErrorMsg(true)
//            ToastAndroid.show('Title is required',ToastAndroid.SHORT)

//         }
//         if(title==''){

//            ToastAndroid.show('Title is required',ToastAndroid.SHORT)
//            return
//         }
//         if(messageDesc==''){

//            ToastAndroid.show('Message is required',ToastAndroid.SHORT)
//            return
//         }
//         if (notificationType === 'foreground') {
//             await notificationContent(title, messageDesc);
//         } else if (notificationType === 'background') {
//             console.log('Background Notification:', title);
//             await notificationContent(title, messageDesc);
//         } else if (notificationType === 'killMode') {
//             console.log('Kill Mode Notification:', title);
//             await notificationContent(title, messageDesc);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Notification Test</Text>

//             <TextInput
//                 placeholder="Message title"
//                 value={title}
//                 onChangeText={setTitle}
//                 style={[styles.input,{ borderColor: errorTitle ?'red':'#ccc',}]}
//             />
//             <TextInput
//                 placeholder="Message description"
//                 value={messageDesc}
//                 onChangeText={setMessageDesc}
//                 style={[styles.input,{ borderColor: errorMsg ?'red':'#ccc',}]}
//             />

//             <Text style={styles.subtitle}>Select Notification Type:</Text>
//             {['foreground', 'background', 'killMode'].map(type => (
//                 <TouchableOpacity key={type} onPress={() => setNotificationType(type as 'foreground' | 'background' | 'killMode')} style={styles.radioContainer}>
//                     <View style={styles.radioCircle}>
//                         {notificationType === type && <View style={styles.radioDot} />}
//                     </View>
//                     <Text style={styles.radioText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
//                 </TouchableOpacity>
//             ))}

//             <TouchableOpacity style={styles.button} onPress={handleSendNotification}>
//                 <Text style={styles.buttonText}>Send Notification</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         backgroundColor: '#f5f5f5',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 3,
//         elevation: 5,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,

//         borderRadius: 8,
//         padding: 10,
//         marginBottom: 15,
//         backgroundColor: '#fff',
//     },
//     subtitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginBottom: 10,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     radioCircle: {
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: '#333',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 10,
//     },
//     radioDot: {
//         width: 12,
//         height: 12,
//         borderRadius: 6,
//         backgroundColor: '#333',
//     },
//     radioText: {
//         fontSize: 16,
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










// import React, { useEffect, useState } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
// import notifee, { EventType } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import database from '@react-native-firebase/database';

// const NotificationExample: React.FC = ({ navigation }: any) => {
//     const [title, setTitle] = useState('');
//     const [messageDesc, setMessageDesc] = useState('');
//     const [errorMsg, setErrorMsg] = useState(false);
//     const [errorTitle, setErrorTitle] = useState(false);
//     const [notificationType, setNotificationType] = useState<'foreground' | 'background' | 'killMode'>('foreground');

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

//         const handleForegroundEvent = () => {
//             return notifee.onForegroundEvent(async ({ type, detail }) => {
//                 if (type === EventType.ACTION_PRESS) {
//                     const { pressAction, notification } = detail;

//                     if (pressAction?.id === 'open') {
//                         // Close the notification drawer
//                         await notifee.cancelNotification(notification?.id);

//                         // Navigate to CustomScreen with the notification data
//                         navigation.navigate('NotificationDetail', {
//                             data: {
//                                 title: notification?.title,
//                                 message: notification?.body,
//                             },
//                         });
//                     }

//                     console.log('Foreground Action pressed:', pressAction?.id);
//                 }
//             });
//         };

//         const handleBackgroundNotifications = () => {
//             notifee.onBackgroundEvent(async ({ type, detail }) => {
//                 if (type === EventType.ACTION_PRESS) {
//                     const { pressAction ,notification} = detail;
//                     if (pressAction?.id === 'open') {
//                         // Close the notification drawer
//                         await notifee.cancelNotification(notification?.id);

//                         // Navigate to CustomScreen with the notification data
//                         navigation.navigate('NotificationDetail', {
//                             data: {
//                                 title: notification?.title,
//                                 message: notification?.body,
//                             },
//                         });
//                     }

//                     console.log('Background Action pressed:', pressAction?.id);
//                 }
//             });
//         };

//         createNotificationChannel();
//         handleForegroundEvent();
//         handleBackgroundNotifications();
//     }, []);

//     const notificationContent = async (title: string, messageDesc: string) => {



//         const tokensSnapshot = await database().ref('/tokens').once('value');
//         const tokens = [];
//         tokensSnapshot.forEach(childSnapshot => {
//             tokens.push(childSnapshot.val().token);
//         });


//         await notifee.displayNotification({
//             title: title,
//             body: messageDesc,
//             android: {
//                 channelId: 'message',
//                 sound: 'notification_sound',
//                 smallIcon: 'ic_notification',
//                 largeIcon: 'ic_notification',
//                 importance: 4,
//                 actions: [
//                     {
//                         title: 'Open',
//                         pressAction: { id: 'open' },
//                     },
//                     {
//                         title: 'Mark as Read',
//                         pressAction: { id: 'mark_as_read' },
//                     },
//                 ],
//             },
//         });
//     };

//     const handleSendNotification = async () => {
//         if (title === '' || messageDesc === '') {
//             setErrorTitle(true);
//             setErrorMsg(true);
//             ToastAndroid.show('Title and Message are required', ToastAndroid.SHORT);
//             return;
//         }
//         await notificationContent(title, messageDesc);
//     };



//     const handleSendNotificationToAll = ()=>{
//         console.log("Hit for all");
//         ToastAndroid.show('Hits for all users', ToastAndroid.SHORT);
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Notification Test</Text>

//             <TextInput
//                 placeholder="Message title"
//                 value={title}
//                 onChangeText={setTitle}
//                 style={[styles.input, { borderColor: errorTitle ? 'red' : '#ccc' }]}
//             />
//             <TextInput
//                 placeholder="Message description"
//                 value={messageDesc}
//                 onChangeText={setMessageDesc}
//                 style={[styles.input, { borderColor: errorMsg ? 'red' : '#ccc' }]}
//             />

//             <Text style={styles.subtitle}>Select Notification Type:</Text>
//             {['foreground', 'background', 'killMode'].map(type => (
//                 <TouchableOpacity key={type} onPress={() => setNotificationType(type as 'foreground' | 'background' | 'killMode')} style={styles.radioContainer}>
//                     <View style={styles.radioCircle}>
//                         {notificationType === type && <View style={styles.radioDot} />}
//                     </View>
//                     <Text style={styles.radioText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
//                 </TouchableOpacity>
//             ))}

//             <TouchableOpacity style={styles.button} onPress={handleSendNotification}>
//                 <Text style={styles.buttonText}>Send Notification</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={handleSendNotificationToAll}>
//                 <Text style={styles.buttonText}>Target All Device & Send Notification</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         backgroundColor: '#f5f5f5',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 3,
//         elevation: 5,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderRadius: 8,
//         padding: 10,
//         marginBottom: 15,
//         backgroundColor: '#fff',
//     },
//     subtitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginBottom: 10,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     radioCircle: {
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: '#333',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 10,
//     },
//     radioDot: {
//         width: 12,
//         height: 12,
//         borderRadius: 6,
//         backgroundColor: '#333',
//     },
//     radioText: {
//         fontSize: 16,
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
























// import React, { useEffect, useState } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
// import notifee, { EventType } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import database from '@react-native-firebase/database';

// const NotificationExample: React.FC<{ navigation: any }> = ({ navigation }) => {
//     let tokens:any=[]
//     const [title, setTitle] = useState<string>('');
//     const [messageDesc, setMessageDesc] = useState<string>('');
//     const [errorMsg, setErrorMsg] = useState<boolean>(false);
//     const [errorTitle, setErrorTitle] = useState<boolean>(false);
//     const [notificationType, setNotificationType] = useState<'foreground' | 'background' | 'killMode'>('foreground');

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

//         const handleForegroundEvent = () => {
//             return notifee.onForegroundEvent(async ({ type, detail }) => {
//                 if (type === EventType.ACTION_PRESS) {
//                     const { pressAction, notification } = detail;

//                     if (pressAction?.id === 'open') {
//                         // Close the notification drawer
//                         await notifee.cancelNotification(notification?.id);

//                         // Navigate to NotificationDetail with the notification data
//                         navigation.navigate('NotificationDetail', {
//                             data: {
//                                 title: notification?.title,
//                                 message: notification?.body,
//                             },
//                         });
//                     }

//                     console.log('Foreground Action pressed:', pressAction?.id);
//                 }
//             });
//         };

//         const handleBackgroundNotifications = () => {
//             notifee.onBackgroundEvent(async ({ type, detail }) => {
//                 if (type === EventType.ACTION_PRESS) {
//                     const { pressAction, notification } = detail;
//                     if (pressAction?.id === 'open') {
//                         // Close the notification drawer
//                         await notifee.cancelNotification(notification?.id);

//                         // Navigate to NotificationDetail with the notification data
//                         navigation.navigate('NotificationDetail', {
//                             data: {
//                                 title: notification?.title,
//                                 message: notification?.body,
//                             },
//                         });
//                     }

//                     console.log('Background Action pressed:', pressAction?.id);
//                 }
//             });
//         };

//         createNotificationChannel();
//         handleForegroundEvent();
//         handleBackgroundNotifications();
//     }, [navigation]);

//     const notificationContent = async (title: string, messageDesc: string) => {
//         // Create and display notification for a single device
//         await notifee.displayNotification({
//             title: title,
//             body: messageDesc,
//             android: {
//                 channelId: 'message',
//                 sound: 'notification_sound',
//                 smallIcon: 'ic_notification',
//                 largeIcon: 'ic_notification',
//                 importance: 4,
//                 actions: [
//                     {
//                         title: 'Open',
//                         pressAction: { id: 'open' },
//                     },
//                     {
//                         title: 'Mark as Read',
//                         pressAction: { id: 'mark_as_read' },
//                     },
//                 ],
//             },
//         });
//     };

//     const handleSendNotification = async () => {
//         if (title === '' || messageDesc === '') {
//             setErrorTitle(true);
//             setErrorMsg(true);
//             ToastAndroid.show('Title and Message are required', ToastAndroid.SHORT);
//             return;
//         }
//         await notificationContent(title, messageDesc);
//     };


//     const getAllTokens = async () => {
//         try {
//           const snapshot = await database().ref('/tokens').once('value');
//           const tokensData = snapshot.val();

//           if (tokensData) {
//             // Tokens ko ek array me convert karna
//             tokens = Object.values(tokensData).map(item => item.token);
//             console.log("All tokens retrieved successfully: ", tokens);
//             return tokens; // yahan par aap apne tokens ko return kar sakte hain
//           } else {
//             console.log("No tokens found.");
//             return [];
//           }
//         } catch (error) {
//           console.error("Error retrieving tokens: ", error);
//         }
//       };


//     const handleSendNotificationToAll = async () => {
//         try {
//             getAllTokens()

//             for(const TOKEN of tokens){
//                 await notificationContent(title, messageDesc);
//                 console.log("USER ==>, TOKEN ==> ", TOKEN);

//             }

//             ToastAndroid.show('Notification sent to all users', ToastAndroid.SHORT);
//         } catch (error) {
//             console.error('Error sending notification to all users:', error);
//             ToastAndroid.show('Failed to send notification to all users', ToastAndroid.SHORT);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Notification Test</Text>

//             <TextInput
//                 placeholder="Message title"
//                 value={title}
//                 onChangeText={setTitle}
//                 style={[styles.input, { borderColor: errorTitle ? 'red' : '#ccc' }]}
//             />
//             <TextInput
//                 placeholder="Message description"
//                 value={messageDesc}
//                 onChangeText={setMessageDesc}
//                 style={[styles.input, { borderColor: errorMsg ? 'red' : '#ccc' }]}
//             />

//             <Text style={styles.subtitle}>Select Notification Type:</Text>
//             {['foreground', 'background', 'killMode'].map(type => (
//                 <TouchableOpacity key={type} onPress={() => setNotificationType(type as 'foreground' | 'background' | 'killMode')} style={styles.radioContainer}>
//                     <View style={styles.radioCircle}>
//                         {notificationType === type && <View style={styles.radioDot} />}
//                     </View>
//                     <Text style={styles.radioText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
//                 </TouchableOpacity>
//             ))}

//             <TouchableOpacity style={styles.button} onPress={handleSendNotification}>
//                 <Text style={styles.buttonText}>Send Notification</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={handleSendNotificationToAll}>
//                 <Text style={styles.buttonText}>Target All Device & Send Notification</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         backgroundColor: '#f5f5f5',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 3,
//         elevation: 5,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderRadius: 8,
//         padding: 10,
//         marginBottom: 15,
//         backgroundColor: '#fff',
//     },
//     subtitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginBottom: 10,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     radioCircle: {
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: '#333',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 10,
//     },
//     radioDot: {
//         width: 12,
//         height: 12,
//         borderRadius: 6,
//         backgroundColor: '#333',
//     },
//     radioText: {
//         fontSize: 16,
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
















// PURE 

import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import { useAuth } from '../context/AuthContext';

const NotificationExample: React.FC<{ navigation: any }> = ({ navigation }: any) => {
    const { deviceToken } = useAuth()
    const DEVICE_TOKEN = deviceToken
    const [title, setTitle] = useState<string>('');
    const [messageDesc, setMessageDesc] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<boolean>(false);
    const [errorTitle, setErrorTitle] = useState<boolean>(false);
    const [notificationType, setNotificationType] = useState<'foreground' | 'background' | 'killMode'>('foreground');

    useEffect(() => {
        const createNotificationChannel = async () => {
            await notifee.createChannel({
                id: 'message',
                name: 'Message Notifications',
                sound: 'notification_sound',
                importance: 4,
                visibility: 1,
                lights: true,
                vibration: true
            });
        };

        const handleForegroundEvent = () => {
            return notifee.onForegroundEvent(async ({ type, detail }) => {
                if (type === EventType.ACTION_PRESS) {
                    const { pressAction, notification } = detail;

                    if (pressAction?.id === 'open') {
                        await notifee.cancelNotification(notification?.id);
                        navigation.navigate('NotificationDetail', {
                            data: {
                                title: notification?.title,
                                message: notification?.body,
                            },
                        });
                    }

                    console.log('Foreground Action pressed:', pressAction?.id);
                }
            });
        };

        const handleBackgroundNotifications = () => {
            notifee.onBackgroundEvent(async ({ type, detail }) => {
                if (type === EventType.ACTION_PRESS) {
                    const { pressAction, notification } = detail;
                    if (pressAction?.id === 'open') {
                        await notifee.cancelNotification(notification?.id);
                        navigation.navigate('NotificationDetail', {
                            data: {
                                title: notification?.title,
                                message: notification?.body,
                            },
                        });
                    }

                    console.log('Background Action pressed:', pressAction?.id);
                }
            });
        };

        createNotificationChannel();
        handleForegroundEvent();
        handleBackgroundNotifications();
    }, [navigation]);

    const notificationContent = async (title: string, messageDesc: string) => {
        // Create and display notification for a single device
        // await notifee.displayNotification({
        //     title: title,
        //     body: messageDesc,
        //     android: {
        //         channelId: 'message',
        //         sound: 'notification_sound',
        //         smallIcon: 'ic_notification',
        //         largeIcon: 'ic_notification',
        //         importance: 4,
        //         lights:true,
        //         vibrationPattern:
        //         actions: [
        //             {
        //                 title: 'Open',
        //                 pressAction: { id: 'open' },
        //             },
        //             {
        //                 title: 'Mark as Read',
        //                 pressAction: { id: 'mark_as_read' },
        //             },
        //         ],
        //     },
        // });


        await notifee.displayNotification({
            title: title,
            body: messageDesc,
            android: {
                channelId: 'message',
                sound: 'notification_sound',
                smallIcon: 'ic_notification',
                largeIcon: 'ic_notification',
                importance: 4,

                actions: [
                    {
                        title: 'Open',
                        pressAction: { id: 'open' },
                    },
                    {
                        title: 'Mark as Read',
                        pressAction: { id: 'mark_as_read' },
                    },
                ],
            },
        });

    };

    const handleSendNotification = async () => {
        if (title === '' || messageDesc === '') {
            setErrorTitle(true);
            setErrorMsg(true);
            ToastAndroid.show('Title and Message are required', ToastAndroid.SHORT);
            return;
        }
        await notificationContent(title, messageDesc);
    };

    const getAllTokens = async () => {
        try {
            const snapshot = await database().ref('/tokens').once('value');
            const tokensData = snapshot.val();

            if (tokensData) {
                // Tokens ko ek array me convert karna
                return Object.values(tokensData).map(item => item.token);
            } else {
                console.log("No tokens found.");
                return [];
            }
        } catch (error) {
            console.error("Error retrieving tokens: ", error);
            return [];
        }
    };

    const handleSendNotificationToAll = async () => {
        try {
            const tokens = await getAllTokens(); // Await the token fetching
            if (tokens.length === 0) {
                ToastAndroid.show('No tokens available to send notifications', ToastAndroid.SHORT);
                return;
            }

            // Create an array of promises for each notification
            const notificationPromises = tokens.map(async (item) => {
                console.log("ITEM ===> ", item);

                try {

                    await notifee.displayNotification({
                        title: title, // Ensure title is defined
                        body: messageDesc, // Ensure messageDesc is defined
                        android: {
                            channelId: 'message',
                            sound: 'notification_sound',
                            smallIcon: 'ic_notification',
                            largeIcon: 'ic_notification',
                            importance: 4,
                        },
                    }
                    );
                    console.log("Asmit device runs...");
                    console.log("Device try block");
                } catch (notificationError) {
                    console.error('Error sending notification to token:', item, notificationError);
                }
            });

            // Wait for all notifications to be sent
            await Promise.all(notificationPromises);

            ToastAndroid.show('Notification sent to all users', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error sending notification to all users:', error);
            ToastAndroid.show('Failed to send notification to all users', ToastAndroid.SHORT);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification Test</Text>

            <TextInput
                placeholder="Message title"
                value={title}
                onChangeText={setTitle}
                style={[styles.input, { borderColor: errorTitle ? 'red' : '#ccc' }]}
            />
            <TextInput
                placeholder="Message description"
                value={messageDesc}
                onChangeText={setMessageDesc}
                style={[styles.input, { borderColor: errorMsg ? 'red' : '#ccc' }]}
            />

            <Text style={styles.subtitle}>Select Notification Type:</Text>
            {['foreground', 'background', 'killMode'].map(type => (
                <TouchableOpacity key={type} onPress={() => setNotificationType(type as 'foreground' | 'background' | 'killMode')} style={styles.radioContainer}>
                    <View style={styles.radioCircle}>
                        {notificationType === type && <View style={styles.radioDot} />}
                    </View>
                    <Text style={styles.radioText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleSendNotification}>
                <Text style={styles.buttonText}>Send Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSendNotificationToAll}>
                <Text style={styles.buttonText}>Target All Device & Send Notification</Text>
            </TouchableOpacity>


            {DEVICE_TOKEN ? (
                <View style={{ marginVertical: 20, gap: 10 }}>
                    <Text style={{ fontWeight: '500', color: 'red', fontSize: 20, textAlign: "center" }}> Your Device Token : </Text>
                    <Text>{DEVICE_TOKEN}</Text>
                </View>
            ) : (
                <View style={{ marginVertical: 20, gap: 10 }}>
                    <Text style={{ fontWeight: '500', color: 'red', fontSize: 20, textAlign: "center" }}> Something went wrong while getting DeviceToken..... </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#333',
    },
    radioText: {
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NotificationExample;
