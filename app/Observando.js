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
import { useStateContext } from '../components/StateProvider';
import DisplayAlarme from '../components/DisplayAlarme';

const ListObservacao = ({ list }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <View>
            <DisplayAlarme user={item} />
          </View>
        )}
      />
    </View>
  );
};

export default function Observando() {
  const { state, action } = useStateContext();

  const [observacoes, setObservacoes] = React.useState([]);
  React.useEffect(() => {
    firebase
      .firestore()
      .collection(`/user/${state?.user?.uid}/observando/`)
      .get()
      .then((snapshot) => {
        var list = [];
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setObservacoes(list);
      });
  }, [state.user]);

  return (
    <View>{state.user ? <ListObservacao list={observacoes} /> : <View />}</View>
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
