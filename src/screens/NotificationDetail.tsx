import React from 'react'
import { Text, View } from 'react-native'

const NotificationDetail = ({route}:any) => {
    console.log("route ==> ",route?.params?.data);
    const msg = route?.params?.data
    
  return (
  <View>
    <Text style={{ color:'black', fontSize:25, fontWeight:'700'}}>{msg?.title}</Text>
    <Text style={{  fontSize:15, fontWeight:'500'}}>{msg?.message}</Text>
   </View>
  )
}

export default NotificationDetail
