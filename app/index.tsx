import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailScreen';
import CartScreen from './screens/CartScreen';
import { CartProvider } from './cartContext';
import OlympicsScreen from './screens/OlympicsScreen';
import { RootStackParamList } from './RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <CartProvider>
     <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Olympics" component={OlympicsScreen} />
     </Stack.Navigator>
    </CartProvider>
  );
}
