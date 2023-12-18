import * as React from 'react';
import {createContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CustomSidebarMenu from './components/customSideBarMenu';
import {MainScreen} from './components/screens/mainScreen';
import {COLORS, theme} from './utils/theme';
import {ProductsDetails} from './utils/sampleData';
import {ThemeProvider} from '@rneui/themed';
import {ProductScreen} from './components/screens/productScreen';
import CheckoutScreen from './components/screens/checkoutScreen';
import SectionScreen from './components/screens/sectionScreen';
import {Provider} from 'react-redux';
import store from './store';
export const ProductsDetailsContext = createContext();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function AppDrawerStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: COLORS.primary},
        headerTintColor: COLORS.fontColor,
        //   drawerContentStyle:{backgroundColor:'red'}
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Demo App" options={{
          drawerLabel: () => null,
          title:' Shop',
          drawerIcon: () => null
      }} component={MainScreen} />
      <Drawer.Screen
        options={{
          drawerLabel: () => null,
          title: '',
          drawerIcon: () => null
      }}
        name="Section"
        component={SectionScreen}
      />
      {/* <Drawer.Screen  name="Product" component={ProductScreen} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ProductsDetailsContext.Provider value={ProductsDetails}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="AppDrawerStack" component={AppDrawerStack} />
              <Stack.Screen name="Product" component={ProductScreen} />
              <Stack.Screen name="Checkout" component={CheckoutScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </ProductsDetailsContext.Provider>
    </Provider>
  );
}
