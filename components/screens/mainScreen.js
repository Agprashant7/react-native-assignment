import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductScreen} from './productScreen';
import {AccountScreen} from './accountScreen';
import {HomeScreen} from './homeScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../../utils/theme';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from './cartScreen';
const Stack = createStackNavigator();
export function MainScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = 'dice-d6';

          if (route.name === 'Home') {
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Wishlist') {
            iconName = 'heart';
          } else if (route.name === 'Account') {
            iconName = 'user-alt';
          }

          return (
            <FontAwesome5 name={iconName} size={20} color={COLORS.fontColor} />
          );
        },
        headerShown: false,

        tabBarActiveTintColor: 'red',
        tabBarActiveBackgroundColor: COLORS.secondary,
        tabBarLabelStyle: {
          color: COLORS.fontColor,
        },
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          height: 60,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Wishlist" component={AccountScreen} />
      <Tab.Screen   name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
