import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from '../constants';
import Landing from '../screens/Landing';
import Home from '../screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../services/navigationService';
const Stack = createStackNavigator();

export function MainNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={Routes.Landing}>
        <Stack.Screen name={Routes.Landing} component={Landing} />
        <Stack.Screen
          options={{gestureEnabled: false}}
          name={Routes.Home}
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
