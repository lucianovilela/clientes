import React, { createContext } from 'react';

import useDb from '../components/db';

const ContextAuth = createContext();
export const StateProvider = ({ children }) => {
  const { onAuthStateChanged, saveUser } = useDb();
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case 'SET-USER':
        return {
          ...prevState,
          user:action.payload
        }

      default:
    }
  }, {
    user:null
  });

  React.useEffect(()=>{
    
      onAuthStateChanged((user)=>{
        dispatch({type:'SET-USER', payload:user});
        if(user) saveUser(user);

    });
  }, []);


  const action = React.useMemo(() => ({}));
  return (
    <ContextAuth.Provider value={{ action, state }}>
      {children}
    </ContextAuth.Provider>
  );
};

export const useStateContext = () => React.useContext(ContextAuth);
