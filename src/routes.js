import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RFValue } from 'react-native-responsive-fontsize';

// Suporte
import { Platform } from 'react-native';
import HomeScreen from './pages/HomeScreen';
import MenuTab from './components/MenuTab';
import Favorites from './pages/Favorites';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: Platform.OS === 'ios' ? RFValue(80) : RFValue(60),
          padding: 0,
          borderColor: 'red',
          margin: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        options={{
          unmountOnBlur: true,
          tabBarButton: (props) => (
            <MenuTab label="home" name="home" {...props} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="FavoritesScreen"
        options={{
          unmountOnBlur: true,
          tabBarButton: (props) => (
            <MenuTab label="home" name="home" {...props} />
          ),
        }}
        component={HomeScreen}
      />
      {/* <Tab.Screen
        name="FeedTab"
        options={{
          tabBarButton: (props) => (
            <MenuItem
              label={translate('feedMenuLabel')}
              name="feed"
              {...props}
            />
          ),
        }}
        component={FeedScreen}
      />
      <Tab.Screen
        name="NotificacoesTab"
        options={{
          tabBarButton: (props) => (
            <MenuItem
              label={translate('notificacoesMenuLabel')}
              name="notificacoes"
              {...props}
            />
          ),
        }}
        component={NotificacoesScreen}
      />
      <Tab.Screen
        name="PerfilTab"
        options={{
          tabBarButton: (props) => (
            <MenuItem
              label={translate('perfilMenuLabel')}
              name="perfil"
              {...props}
            />
          ),
        }}
        component={PerfilRoutes}
      /> */}
    </Tab.Navigator>
  );
}

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="FavoritesScreen">
      {/* <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false, headerTitle: null }}
      /> */}
      {/* Login */}

      {/* Tarefas */}
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
