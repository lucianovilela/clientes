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
import 'firebase/compat/database';
import moment from 'moment';
const ListObservacao = ({ list, user }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <List.Item
            title={item.displayName}
            left={(props) => (
              <Avatar.Image source={{ uri: item.photoURL }} size={40} />
            )}
            right={(props) => (
              <View>
                <IconButton
                  icon="cancel"
                  onPress={() => {

                    firebase
                      .database()
                      .ref(`/chamado/${user.uid}/observadores/${item.id}`)
                      .remove();
                  }}
                />
              </View>
            )}
          />
        )}
      />
    </View>
  );
};
const TelaPrincipal = ({ user }) => {
  const [chamado, setChamado] = React.useState({});
  const [observadores, setObservadores] = React.useState([]);
  React.useEffect(() => {
    firebase
      .database()
      .ref(`/chamado/${user?.uid}/observadores`)
      .on('value', (snapshot) => {
        var objs = snapshot.val();
        var list = objs
          ? Object.entries(objs).map(([id, data]) => ({ id, ...data }))
          : [];
        setObservadores(list);
      });
  }, [user]);

  React.useEffect(() => {
    firebase
      .database()
      .ref(`/chamado/${user.uid}/status`)
      .on('value', (event) => {
        setChamado(event.val() || {});
      });

  },[])
  const chamadoOn = () => {
    firebase.database().ref(`/chamado/${user.uid}/status`).set({
      chamado: 'on',
      datetime: firebase.database.ServerValue.TIMESTAMP,
    });
  };
  const chamadoOff = () => {
    firebase.database().ref(`/chamado/${user.uid}/status`).set({
      chamado: 'off',
      datetime: firebase.database.ServerValue.TIMESTAMP,
    });
  };
  return (
    <View style={styles.container}>
      <IconButton
        icon="alarm-light"
        color={chamado.chamado === 'on' ? '#c00' : 'lightgray'}
        size={70}
        onPress={() => {
          chamado.chamado === 'on' ? chamadoOff() : chamadoOn();
        }}
      />
      <Text variant="bodyMedium">
        {moment(chamado.datetime).format('llll')}
      </Text>
      
      <ListObservacao user={user} list={observadores} />
    </View>
  );
}

export default function App() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((userChange) => {
      setUser(userChange);
    });
  }, []);
  return <View>{user ? <TelaPrincipal user={user} /> : <View />}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 8,
  },
  button: {
    marginTop: 10,
  },

  textInput: {
    marginTop: 10,
  },
});
