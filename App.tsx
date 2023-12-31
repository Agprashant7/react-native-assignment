import * as React from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import CustomSidebarMenu from './components/customSideBarMenu';

function NotificationsScreen() {
  return (
    <View
      style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}></View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen name="Demo App" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
