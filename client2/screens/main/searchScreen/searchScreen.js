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
import { loginApi } from '../../../App';
import { useContext } from 'react';
import { testUrl } from '../../../keys';
import { url } from '../../../keys';

const SearchScreen = ({route, navigation}) => {
    //console.log(route.params)
    const { isSignedIn, signIn, token, setToken, name, setName, username, setUsername } = useContext(loginApi)
    const [searchInput, setSearchInput] = useState('')
    const [searchData, setSearchData] = useState('')

    useEffect(() => {

        if (searchInput !== '') {
            
        fetch(testUrl + '/search-users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "searchUsername": searchInput,
            }),
          })
      
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    console.log(jsonRes)
                  
                    setSearchData(jsonRes)
                    
  
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

    }

        navigation.setOptions({
            title: "Search",
            headerStyle: {
              backgroundColor: '#273469',
            },
            headerTintColor: '#EBF2FA',
            
            headerRight: () => (
    
              <View
                style = {styles.containerTwo}
              >
    
              <SafeAreaView
                style = {styles.textBox}
                >
                  <TextInput
                  
                  //textContentType='none'
                    style = {styles.textInput}
                    placeholder= 'Username'
                    onChangeText={setSearchInput}
                    value = {searchInput}
                    
                    
                    autoComplete={ Platform.OS === 'web' ? 'none' : 'off' }
                  >
    
                  </TextInput>
              </SafeAreaView> 
              
              <TouchableOpacity
              style = {styles.searchButton}
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
        )})
    }, [searchInput]);
    

    return (
    
    
    <View style = {styles.container}>
       <FlatList
            data = {searchData}
            renderItem={({item}) => 
            <TouchableOpacity style = {styles.existingChat}
            
            onPress = { () => {

                fetch(testUrl + '/new-direct-message', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      "hostUsername": username,
                      "guestUsername": item,

                    }),
                  })
              
                .then(async res => { 
                    try {
                        const jsonRes = await res.json();
                        if (res.status === 201) {
                            
                            navigation.navigate('Direct Message', {
                                userTwo: item,
                            });
                            
          
                        }
                        else if (res.status === 400) {
                            navigation.navigate('Direct Message', {
                                userTwo: item,
                            });
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
    )
}

export default SearchScreen


const styles = StyleSheet.create({
    container: {
     flexDirection: 'column',
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
      flex: 0,
      borderWidth: 1,
      borderColor: 'darkgrey',
      backgroundColor: 'aliceblue',
      width: window.innerWidth,
      height: 75,
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
        //resizeMode: 'contain',
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
        
        //borderTopRightRadius: 0
      }

})