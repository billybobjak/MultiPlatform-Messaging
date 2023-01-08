import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from './discoverScreen';

// Discover screen stack for bottom tab and stack navigation
function DiscoverScreenStack() {
    const DiscoverStack = createNativeStackNavigator();
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen name='Discover Home' component= {DiscoverScreen}/>
    </DiscoverStack.Navigator>
  );
}

export default DiscoverScreenStack