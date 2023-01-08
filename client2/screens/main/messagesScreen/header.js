import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';


// Custom header for the settings tab
function Header(navigation) {
    return (
        <View style = {styles.container}>
            <View>
                <Text
                style = {styles.homeText} > Home </Text>
            </View>

            <View style = {styles.settingsContainer}>
                <TouchableOpacity
                 onPress = {() => {
                    navigation.navigate('Settings')
                 }}
                style = {styles.settingsBox}
                >
                    <Image
                        style = {styles.image}
                        source = {require('../../../assets/settings-icon.png')}
                        
                        >
                    </Image>
                </TouchableOpacity>
            </View>
           
    

        </View>
    );
}

export default Header;


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