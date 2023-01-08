import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

// Temporary discover screen placeholder
// In the future, bluetooth/GPS local user connection will be here
const DiscoverScreen = ({navigation}) => {

    return (
      
      
      <View style = {styles.center}>
        <Text> This is Discover Screen</Text>
  
      </View>
  
    );
  }

  export default DiscoverScreen


  const styles = StyleSheet.create({
    
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom : 150
    },
  });