import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useContext } from 'react';
import { loginApi } from '../../../App';
import { url, testUrl } from '../../../keys'


const MessagesScreen = ({navigation}) => {
    const [input, setData] = useState([])
    const { isSignedIn, signIn, name, setName, username, setUsername, token, setToken } = useContext(loginApi)
    
    useEffect(() => {
      const interval = setInterval(() => {
        console.log("Interval triggered");

    try {

      fetch(testUrl + '/get-chats', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": username,
            "password": token
          }),
        })
    
      .then(async res => { 
          try {
              const jsonRes = await res.json();
              if (res.status === 200) {
                
                let list = []
                for (i = 0; i < Object.keys(jsonRes.post).length; i++) {
                  list.push(jsonRes.post[i])
                }
                  setData(list)
                  
              }
              else {                          
                console.log(jsonRes.message);
              }
          } catch (err) {
              
              console.log(err);
          };
      })
      .catch(err => {
          console.log("error here")
          console.log(err);
      });
    } catch (err) {
      console.log("error here")
      console.log(err);
    }
  }, 1000);
  return () => clearInterval(interval);
    })

    return (
      
      
      <View>
  
        <View>
          <FlatList
            data = {input}
            renderItem={({item}) => 
            <TouchableOpacity style = {styles.existingChat}
            
            onPress = { () => {
              navigation.navigate('Direct Message', {
                userTwo: item,
              });
            }}
            >
              <Image style = {styles.profilePic}
              source = {require('../../../assets/profile_pic.png')}
              
              >
                
              </Image>
              <Text style = {styles.item}> {item}</Text>
              
            </TouchableOpacity>
            }
          />
        </View>
  
     </View>
    );
  }

  export default MessagesScreen;

    
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
      height: 50,
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