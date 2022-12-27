import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesScreen from './messagesScreen.js';
import DirectMessage from './directMessage';
import Header from './header'
import SettingsScreen from '../settingsScreen/settingsScreen.js'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { loginApi } from '../../../App.js';
import { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import SearchScreen from '../searchScreen/searchScreen.js';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
function MessagesScreenStack(route, navigation) {
  const MessagesStack = createNativeStackNavigator();
  const { isSignedIn, signIn, name, setName } = useContext(loginApi)
  //console.log(route.route.params)
  return (
    <MessagesStack.Navigator
      //screenOptions= {{headerShown: false}}
      //screenOptions={{navigationBarHidden: true}}
    >
      <MessagesStack.Screen 
      
      name='Messages Home' 
      component= {MessagesScreen} 
      options = {({ navigation}) => ({
            
            //title: "Welcome, "+ route.route.params.name,
            title: "Welcome, " + name,
            headerStyle: {
              backgroundColor: '#273469',
            },
            headerTintColor: '#EBF2FA',
            headerRight: () => (
              <View
                style = {styles.container}
                >

                <View
                style = {styles.button}
                >

                  <TouchableOpacity
                  //onPress={() => navigation.navigate('Settings', {setSignIn : route.route.params.signIn})}
                  onPress={() => navigation.navigate('Search')}
                  >
                    <Image
                    style = {styles.image}
                    name="edit"
                    source = {require('../../../assets/search-icon.png')}
                  />
                  </TouchableOpacity>
                  
                </View>

                <View
                  style = {styles.button}
                >
                  <TouchableOpacity
                  //onPress={() => navigation.navigate('Settings', {setSignIn : route.route.params.signIn})}
                  onPress={() => navigation.navigate('Settings')}
                  >
                    <Image
                    style = {styles.image}
                    name="edit"
                    source = {require('../../../assets/settings-icon.png')}
                  />
                  </TouchableOpacity>
                </View>
              </View>
            ),
      })}
      />
      <MessagesStack.Screen 
      name = 'Direct Message' component={DirectMessage} 
      
      />

      <MessagesStack.Screen
      name = 'Settings' component = {SettingsScreen}
      >


      </MessagesStack.Screen>

      <MessagesStack.Screen
      name = 'Search' component = {SearchScreen}
      >


      </MessagesStack.Screen>

    </MessagesStack.Navigator>
  );

  
}

export  default MessagesScreenStack;

const styles = StyleSheet.create({
  container: {
   flexDirection: 'row',
   alignItems:'center'
  },
  searchButton: {
    width: 20,
    marginRight: 5
  },
  containerTwo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
    
   },
  textBox: {
    marginRight: 15,
    width : 150,
    height: 50,
    justifyContent: 'center',
    borderColor: 'black'
  },
  homeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color : 'black'
  },
  image: {
      height: 25,
      width: 25,
      marginRight: 5
  },
  button: {
    padding: 8
  },
  textInput: {
    flex: 0,
    height: 30,
    width: 150,
    borderRadius : 5,
    borderStyle: 'solid',
  }
});