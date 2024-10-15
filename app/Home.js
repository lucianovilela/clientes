import React from 'react';
import { StyleSheet, View } from 'react-native';


import Login from './Login';
import Alarme from './Alarme';
import Solicitacoes from './Solicitacoes';
import Observando from './Observando';

import Avatar from '../components/Avatar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useStateContext } from '../components/StateProvider';

const Tab = createBottomTabNavigator();

export default function App() {
  const { state, action } = useStateContext();
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => <Avatar />,
      })}>
      <Tab.Screen name="Alarme" component={Alarme} />
      <Tab.Screen name="Solicitações" component={Solicitacoes} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Observando" component={Observando} />
      
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
