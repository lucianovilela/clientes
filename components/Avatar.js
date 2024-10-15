import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar as AvatarPaper, Menu, Button , Portal, Divider} from 'react-native-paper';
import { useStateContext } from './StateProvider';
import useDb from '../components/db';

export default function Avatar() {
  const { state, action } = useStateContext();
  const { logout } = useDb();
  const [menuVisble, setMenuVisible] = React.useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu= ()=> setMenuVisible(false);
  return (
    <View>
      {state.user ? (
        <TouchableOpacity onPress={() => logout()}>
          <View>
            <AvatarPaper.Image
              size={35}
              source={{ uri: state.user.photoURL }}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      
      <Menu
          visible={menuVisble}
          onDismiss={closeMenu}
          anchor={()=>{}}>
          <Menu.Item onPress={() => {logout();closeMenu()}} title="Logout" />
        </Menu>
    
   
    </View>
  );
}
