import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductScreen} from './productScreen';
import {AccountScreen} from './accountScreen';
import {DashboardScreen} from './dashboardScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../../utils/theme';

export function MainScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = 'dice-d6';

          if (route.name === 'Home') {
          } else if (route.name === 'Product') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Account') {
            iconName = 'user';
          } else if (route.name === 'Settings') {
            iconName = 'wrench';
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Settings" component={AccountScreen} />
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
