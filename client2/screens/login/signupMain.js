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
import { testUrl, url } from '../../keys';

const SignupScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

    return (
      <View style = {loginMainStyles.center}>
      <Text style = {{fontSize : 30}}> Signup </Text>

      <View
        style = {loginMainStyles.login}
      >

      <TextInput
        onChangeText = {setFirstName}
        value = {firstName}
        placeholder = "First Name"
      ></TextInput>

        <TextInput
        onChangeText = {setLastName}
        value = {lastName}
        placeholder = "Last Name"
      ></TextInput>

      <TextInput
        onChangeText = {setEmail}
        value = {email}
        placeholder = "Email"
      >
        
      </TextInput>

      <TextInput
        onChangeText = {setUsername}
        value = {username}
        placeholder = "Username"
      >
        
      </TextInput>


      <TextInput
        secureTextEntry = {true}
        onChangeText = {setPassword}
        value = {password}
        placeholder = "Password"
      >

      </TextInput>
      
      </View>
  
      <Button
      style = {loginMainStyles.loginButton}
      title = "Submit"
      onPress = {() => {
        try {
            
            fetch(testUrl + '/new-user', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "firstname": firstName,
                "lastname": lastName,
                "email": email,
                "password": password,
                "username": username
              }),
            })
        
          .then(async res => { 
              try {
                  const jsonRes = await res.json();
                  if (res.status === 201) {
                      console.log(jsonRes.message);
                      navigation.navigate("Login Home")
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
      }
        
        
      }
      />
    </View>
    )
  }

export default SignupScreen


const styles = StyleSheet.create({
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom : 100
    },
  });

  const loginMainStyles = StyleSheet.create({
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom : 0
    },
    login: {
      width: 300,
      height: 300,
    },
    loginButton: {
      height: 75,
      width: 100
    }
  })