

import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import LoginScreen from './screens/login/loginMain.js'
import MessagesScreenStack from './screens/main/messagesScreen/messageScreenStack'
import DiscoverScreenStack from './screens/main/discoverScreen/discoverScreenStack.js';
import SignupScreen from './screens/login/signupMain.js';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {createContext, useMemo, useCallback} from 'react'


const Stack = createBottomTabNavigator();
const Login = createNativeStackNavigator();


export const loginApi = createContext({
  isSignedIn: false,
  signIn: () => {},
  token: '',
  setToken: () => {},
  name: '',
  setName: () => {},
  username: '',
  setUsername: () => {},
  notifToken: '',
  setNotifToken: () => {}
});



export default function App() {


  const [isSignedIn, signIn] = useState(false);
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [notifToken, setNotifToken] = useState('')

  const getApi = useMemo(() => ({isSignedIn, signIn, token, setToken, name, setName, username, setUsername, notifToken, setNotifToken}), [isSignedIn]);


    if (isSignedIn) {

      return (
        <loginApi.Provider value={getApi}>

          <NavigationContainer>

            <Stack.Navigator
            screenOptions= {{headerShown: false}}
            >
              
              <Stack.Screen
                name = 'Messages'
                component = {MessagesScreenStack}
                //initialParams ={{signIn, name, token}}
              />

              <Stack.Screen
                name = 'Discover'
                component = {DiscoverScreenStack}
                title = 'Welcome'
              />

            </Stack.Navigator>

      </NavigationContainer>

    </loginApi.Provider>
    )}

    else {
      return (
        <loginApi.Provider value={getApi}>
          <NavigationContainer>

            
            <Login.Navigator>
    
              <Login.Screen
              name = "Login Home"
              component = {LoginScreen}
              
              //initialParams = {{setToken, setName}}
              //initialParams = {{setSignIn, setToken, setName}}
              options= {{title: "Welcome to AppTest"}}
              >
    
              </Login.Screen>

              <Login.Screen
              name = "Signup Home"
              component = {SignupScreen}
              options= {{title: "Welcome to AppTest2"}}
              >
                
              </Login.Screen>

            </Login.Navigator>

          </NavigationContainer>
        
        </loginApi.Provider>

      )
    }

    
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  chatBox: {
    height: 50,
    padding: 10
  },
  scrollBox: {
      flex: 0,
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 44,
  },
  messageSource: {
    flex: 1,
    padding: 5,
    fontSize: 15,
    flexWrap: 'wrap'
  },
  messageText: {
    flex: 1,
    padding: 5,
    paddingStart: 10,
    fontSize: 15,
    flexWrap: 'wrap'
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingStart: 10
  },
  headerBox: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: 10,
    flex: 0,
    borderWidth: 1,
    borderColor: 'darkgrey',
    backgroundColor: 'aliceblue',
    width: window.innerWidth,
    height: 50,
  },
  profilePicChat: {
    flex: 0,
    padding: 10,
    resizeMode: 'contain',
    height: 35,
    width: 35,
  },
  messageBox: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'darkgrey',
    backgroundColor: 'aliceblue',
    width: window.innerWidth,
    resizeMode: 'contain'
  },
});






