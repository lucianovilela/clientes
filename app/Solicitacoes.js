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
  Avatar,
} from 'react-native-paper';

import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import moment from 'moment';

const ListSolicicitacao = ({ list, user }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <View>
        <Button
          onPress={() => {
            const newSol = firebase
              .database()
              .ref(`/chamado/${user.uid}/solicitacao/`)
              .push();
            newSol.set({
              uid: user.uid,
              nome: user.displayName,
              photoURL: user.photoURL,
            });
          }}>
          Teste
        </Button>
      </View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <List.Item
            title={item.nome}
            left={(props) => (
              <Avatar.Image source={{ uri: item.photoURL }} size={40} />
            )}
            right={(props) => (
              <View>
                <IconButton
                  icon="check"
                  onPress={() => {
                    const newSol = firebase
                      .database()
                      .ref(`/chamado/${user.uid}/observadores/`)
                      .push();
                    firebase
                      .database()
                      .ref(`/chamado/${user.uid}/solicitacao/${item.id}`)
                      .once('value', (snap) => {
                        newSol.set({
                          ...snap.val(),
                        });
                        firebase
                          .firestore()
                          .collection(`/user/${snap.val().uid}/observando/`)
                          .doc()
                          .set({
                            uid: user.uid,
                            nome: user.displayName,
                            photoURL: user.photoURL,
                          });
                      });
                    firebase
                      .database()
                      .ref(`/chamado/${user.uid}/solicitacao/${item.id}`)
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

export default function Solicitacoes() {
  const [user, setUser] = React.useState(null);
  const [solicitacao, setSolicitacao] = React.useState([]);
  React.useEffect(() => {
    firebase
      .database()
      .ref(`/chamado/${user?.uid}/solicitacao`)
      .on('value', (snapshot) => {
        var objs = snapshot.val();
        var list = objs
          ? Object.entries(objs).map(([id, data]) => ({ id, ...data }))
          : [];
        setSolicitacao(list);
      });
  }, [user]);

  React.useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((userChange) => {
      setUser(userChange);
    });
  }, []);
  return (
    <View>
      {user ? <ListSolicicitacao user={user} list={solicitacao} /> : <View />}
    </View>
  );
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
