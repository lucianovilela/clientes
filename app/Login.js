import React, { useState } from 'react';
import { TextInput, Button, Portal, Dialog, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import useDb from '../components/db';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [mensagem, setMsg] = React.useState('');
  const [visiblePwd, setVisiblePwd] = React.useState(true);

  const hideDialog = () => setVisible(false);
  const { loginGoogle } = useDb();
  return (
    <View style={styles.container}>
      <TextInput
        label="e-mail"
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
       <TextInput
          style={styles.textInput}
          label="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={visiblePwd}
          right={<TextInput.Icon icon="eye" onPress={()=>setVisiblePwd(!visiblePwd)}/>}
        />
     
      <Button
      style={styles.button}
        mode={'contained'}
        onPress={() => {
          loginGoogle(email, password).catch((err) => {
            setMsg(err);
            setVisible(true);
          });
        }}>
        Login
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{mensagem.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
    button: {
    marginTop: 10,
  },

  textInput: {
    marginTop: 10,
  },
});

export default LoginScreen;
