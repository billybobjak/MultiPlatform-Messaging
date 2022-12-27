import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from './discoverScreen';

function DiscoverScreenStack() {
    const DiscoverStack = createNativeStackNavigator();
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen name='Discover Home' component= {DiscoverScreen}/>
    </DiscoverStack.Navigator>
  );
}

export default DiscoverScreenStack