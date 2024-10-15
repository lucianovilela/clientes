import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useStateContext } from '../components/StateProvider';

export default function HomeUser() {
  const { state, action } = useStateContext();
  return (
    <View>
      <Button>Paciente</Button>
      <Button>Atendente</Button>
    </View>
  );
}

const styles = StyleSheet.create({});
