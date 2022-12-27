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