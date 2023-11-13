import * as React from 'react';
import {  createContext } from "react";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CustomSidebarMenu from './components/customSideBarMenu';
import {MainScreen} from './components/screens/mainScreen';
import {COLORS} from './utils/theme';
import { ProductsDetails } from './utils/sampleData';
export const ProductsDetailsContext = createContext();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function AppDrawerStack() {
  return (
    <ProductsDetailsContext.Provider value={ProductsDetails}>
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: COLORS.primary},
        headerTintColor: COLORS.fontColor,
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Demo App" component={MainScreen} />
    </Drawer.Navigator>
    </ProductsDetailsContext.Provider>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AppDrawerStack" component={AppDrawerStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
