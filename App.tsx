// // import React from 'react';
// // import { SafeAreaView } from 'react-native';
// // import NotificationExample from './src/componenets/NotificationExample';

// // const App = () => {
// //     return (
// //         <SafeAreaView>
// //             <NotificationExample />
// //         </SafeAreaView>
// //     );
// // };

// // export default App;
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import NotificationExample from './src/screens/NotificationExample';
// import NotificationDetail from './src/screens/NotificationDetail';
// import messaging from '@react-native-firebase/messaging';
// import database from '@react-native-firebase/database';
// import { AuthProvider, useAuth } from './src/context/AuthContext';
// const Stack = createNativeStackNavigator();

// function App() {

//   const {setDeviceToken}=useAuth()
//   React.useEffect(() => {
//     const requestUserPermission = async () => {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log('Authorization status:', authStatus);
//         getDeviceToken();
//       }
//     };

//     // const getDeviceToken = async () => {
//     //   const token = await messaging().getToken();
//     //   console.log('Device Token:', token);
//     //   const newId = Date.now(); 

//     //   // Save token to Firebase
//     //   if (token) {
//     //     // await database().ref(`/tokens/${token}`).set({ token });
//     //     await database().ref(`/tokens/${newId}`).set({ id: newId, token });
//     //     console.log("Device token Registered Successfully ");

//     //   }
//     // };





//     const getDeviceToken = async () => {
//       const token = await messaging().getToken();
//       console.log('Device Token:', token);

//       if (token) {
//         try {
//           // Check if the token already exists
//           const snapshot = await database().ref('/tokens').orderByChild('token').equalTo(token).once('value');

//           if (snapshot.exists()) {
//             console.log("Device token already registered.");
//             return; // Exit if the token already exists
//           }

//           // If the token does not exist, save it to Firebase
//           const newId = Date.now();
//           await database().ref(`/tokens/${newId}`).set({ id: newId, token });
//           console.log("Device token registered successfully.");
//         } catch (error) {
//           console.error("Error registering device token:", error);
//         }
//       }
//     };


//     requestUserPermission();
//   }, []);


//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" component={NotificationExample} />
//           <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }

// export default App;












import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationExample from './src/screens/NotificationExample';
import NotificationDetail from './src/screens/NotificationDetail';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
};

const MainNavigator = () => {
  const { setDeviceToken }:any = useAuth();

  React.useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getDeviceToken(); // Moved this call here
      }
    };

    const getDeviceToken = async () => {
      const token = await messaging().getToken();
      setDeviceToken(token);
      console.log('Device Token:', token);

      if (token) {
        try {
          // Check if the token already exists
          const snapshot = await database().ref('/tokens').orderByChild('token').equalTo(token).once('value');

          if (snapshot.exists()) {
            console.log("Device token already registered.");
            return; // Exit if the token already exists
          }

          // If the token does not exist, save it to Firebase
          const newId = Date.now();
          await database().ref(`/tokens/${newId}`).set({ id: newId, token });
          console.log("Device token registered successfully.");
        } catch (error) {
          console.error("Error registering device token:", error);
        }
      }
    };

    requestUserPermission();
  }, [setDeviceToken]); // Add setDeviceToken as a dependency

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NotificationExample} />
        <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
