// src/services/notificationService.ts
import admin from 'firebase-admin';
import serviceAccount from '../android/app/notification-a0ccb-firebase-adminsdk-jf53l-cc6700b56e.json'; // Adjust the path as necessary

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Function to send notifications to a specific device token
export const sendNotification = async (deviceToken: string, title: string, body: string) => {
    const message = {
        token: deviceToken,
        notification: {
            title,
            body,
        },
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
        throw error; // Rethrow to handle in the caller
    }
};

// Function to send notification to a user
export const notifyUser = async (userId: string, title: string, body: string) => {
    // Assuming you have user tokens stored in your database with user IDs
    const snapshot = await admin.database().ref(`/tokens`).orderByChild('userId').equalTo(userId).once('value');
    
    if (!snapshot.exists()) {
        console.log("No tokens found for user:", userId);
        return;
    }

    snapshot.forEach(childSnapshot => {
        const token = childSnapshot.val().token; // Get the token from the snapshot
        sendNotification(token, title, body);
    });
};
