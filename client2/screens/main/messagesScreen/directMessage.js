import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import {createContext, useMemo, useCallback, useContext} from 'react'
import { loginApi } from '../../../App';
import { HeaderBackButton } from '@react-navigation/elements';
import { testUrl, url } from '../../../keys';


const DirectMessage = ({route, navigation}) => {
    const userTwo = route.params.userTwo;
    const [input, setInput] = useState('');
    const [text, setText] = useState("");
    const [screenSize, setScreenSize] = useState(425);
    const [message, setMessage] = useState('');
    const { isSignedIn, signIn, name, setName, token, setToken, username, setUsername } = useContext(loginApi)
   
    useEffect(() => {
      navigation.setOptions({
        title: "Direct Message",
        headerStyle: {
          backgroundColor: '#273469',
        },
        headerTintColor: '#EBF2FA',
        
        headerLeft: () => (
          <HeaderBackButton
            onPress={() => {
              navigation.navigate('Messages Home')
            }}
          >
            
          </HeaderBackButton>
  
          
    )})
    }, [])

    useEffect(() => {
      const interval = setInterval(() => {

        fetch(testUrl + '/get-direct-message-chats', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "userOne": username,
            "userTwo": userTwo
          }),
    })
    .then(async res => { 
        try {
            const jsonRes = await res.json();
            if (res.status === 200) {

              let list = []
              console.log(Object.keys(jsonRes.post).length)
              for (i = 0; i < Object.keys(jsonRes.post).length - 1; i++) {
                list.push(jsonRes.post[i])
              }
              
                
                setMessage(list.reverse());
                
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
  
    }, 1000);
    return () => clearInterval(interval);
    })
  
  
  
  
    return (

      <View
        keyboardShouldPersistTaps = 'always'
  
      >
        
        <View style = {styles.headerBox}>
          <Image style = {styles.profilePicChat}
          source = {require('../../../assets/profile_pic.png')}
          
          ></Image>
          <Text style = {styles.header}>{userTwo}</Text>
  
        </View>
        <View style = {styles.scrollBox}
          name = 'Box'
          height = {screenSize}
        >
          <FlatList
          inverted
          data = {message}
          renderItem = {({item}) =>
            <View style = {styles.messageBox}>
              <Text style = {styles.messageSource}> {item.source}</Text>
              <Text style = {styles.messageText}> {item.content}</Text>
            </View>
          }>
  
  
          </FlatList>
        </View>
        
        <SafeAreaView
        >
  
          <TextInput
  
  
            style = {styles.input}
            value = {text}
            onChangeText = {setText}
            placeholder = "Send a message"
            enablesReturnKeyAutomatically = {true}
            returnKeyType = 'send'
            onPressIn={() => {
              if (screenSize === 425) {
                setScreenSize(250);
              }
            }}
  
            onSubmitEditing={() => {
  
                try {
                
                  fetch(testUrl + '/add-message', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    "source": username,
                    "destination" : userTwo,
                    "content" : text
                  }),
                })
              
              .then(async res => { 
                  try {
                      const jsonRes = await res.json();
                      if (res.status === 200) {
                          console.log(jsonRes.message);
                      }
                      else {
                        console.log(jsonRes.message);
                      }
                  } catch (err) {
                      console.log(err);
                  };
              })
              .catch(err => {
                  console.log(err);
              });
            } catch (err) {
              console.log(err);
            }
  
              setScreenSize(425);
              setInput([...input,{source: username, destination: userTwo, messages: text }])
              setText("");
            }}
          >
            
          </TextInput>
        </SafeAreaView>
  
      </View>
      
    )
  }

  export default DirectMessage

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