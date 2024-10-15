import { View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import {
  Card,
  Button,
  Dialog,
  IconButton,
  List,
  Text,
  Avatar
} from 'react-native-paper';

import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import moment from 'moment';


export default function  DisplayAlarme  ({ user })  {
  const [chamado, setChamado] = React.useState({});

  React.useEffect(() => {
    firebase
      .database()
      .ref(`/chamado/${user.uid}/status`)
      .on('value', (event) => {
        setChamado(event.val() || {});
      });

  }, [])
  const chamadoOff = () => {
    firebase.database().ref(`/chamado/${user.uid}/status`).set({
      chamado: 'off',
      datetime: firebase.database.ServerValue.TIMESTAMP,
    });
  };
  return (
    
    <List.Item 
      title={user.displayName}
      description={moment(chamado.datetime).format('llll')}  
      left={(prop)=>(<IconButton
        icon="alarm-light"
        color={chamado.chamado === 'on' ? '#c00' : 'lightgray'}
        size={70}
        onPress={() => {
          chamadoOff()  
        }}
      />)}
    >
      
      
    </List.Item>
  );
}