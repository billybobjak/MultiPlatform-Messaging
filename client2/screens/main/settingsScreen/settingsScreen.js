import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { loginApi } from '../../../App';
import { useContext } from 'react';
import messaging from '@react-native-firebase/messaging';

const SettingsScreen = ({route}) => {

    const { isSignedIn, signIn, token, setToken, name, setName } = useContext(loginApi)
    
    const deleteFCMToken = async () => {
      try {
        await messaging().deleteToken();
      } catch (e) {
        console.log(error);
      }
    }

    return (
    
    
    <View style = {styles.center}>
       
        <Button
        title = 'Sign out'
        onPress={() => {
            deleteFCMToken();
            signIn(false)
        }}
        >
            
        </Button>
    </View>
    )
}

export default SettingsScreen


const styles = StyleSheet.create({
    container: {
     flexDirection: 'row',
     alignItems:'center'
    },
    homeText: {
      fontSize: 22,
      fontWeight: 'bold',
      color : 'black'
    },
    image: {
        height: 25,
        width: 25
    },
    homeContainer: {
      padding: 10,
      fontSize: 20,
      height: 44,
    },
    settingsContainer: {
      paddingLeft: 225
    },
    settingsBox: {
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    existingChat: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingStart: 20,
      flex: 1,
      borderWidth: 1,
      borderColor: 'darkgrey',
      backgroundColor: 'aliceblue',
      width: window.innerWidth,
      height: 100,
      resizeMode: 'contain'
    },
    profilePic: {
      flex: 0,
      resizeMode: 'contain',
      height: 50,
      width: 50,
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom : 150
    },})