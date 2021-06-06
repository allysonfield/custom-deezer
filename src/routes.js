import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import Favorites from './pages/Favorites';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, headerTitle: null }}
      />
      <Stack.Screen
        name="FavoritesScreen"
        component={Favorites}
        options={{ headerShown: false, headerTitle: null }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
