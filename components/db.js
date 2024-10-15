import React from 'react';
import firebase from  "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDxd4H8o1ihfgeWpym6RnrmLY2-8yMSWzE',
  authDomain: 'pesquisa-fbda8.firebaseapp.com',
  databaseURL: 'https://pesquisa-fbda8.firebaseio.com',
  projectId: 'pesquisa-fbda8',
  storageBucket: 'pesquisa-fbda8.appspot.com',
  messagingSenderId: '384123874840',
  appId: '1:384123874840:web:fecddbb4c0177b2024dd6d',
  measurementId: 'G-6JMH9M2PFD',
};


const useDb=()=>{
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  //const message = firebase.messaging();
  return ({
    onAuthStateChanged(cb){
      firebase.auth().onAuthStateChanged(cb)
    },

    loginGoogle(email, password){
      return firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
    },

    logout(){
      return firebase.auth().signOut();
    }
    ,
    saveUser(user){
        const enfermeiros = db.collection("user");
        enfermeiros
          .doc(user.uid)
          .get()
          .then(doc=>{
            if(!doc.exists){
              
              enfermeiros.doc(user.uid)
              .set({
                displayName:user.displayName,
                email:user.email,
                photoURL:user.photoURL
              })
              .then(result=>console.log(result))
              .catch(err=>console.log(err))
            }
          });
    },
    async getDiasDoMes(user, ano, mes){
        if(!user)
          return null;
        if(!ano){
          ano =  new Date().getFullYear();
        }
        if(!mes){
          mes =  new Date().getMonth();
        }
        const enfermeiros = db.collection("enfermeiro");
        const doc = await enfermeiros.doc(`${user.uid}/${ano}/${mes}`).get();
        console.log("getDiasDoMes",`${user.uid}/${ano}/${mes}`)
        if(doc.exists){
          
          return doc.data();
        }
        return [];
    },
    async setDiasDoMes(user, ano, mes, dias ){
        if(!user ||   !dias)
          return null;
        if(!ano){
          ano =  new Date().getFullYear();
        }
        if(!mes){
          mes =  new Date().getMonth();
        }
        const dateArray = dias.map((momentDate) => momentDate.toDate());
        const enfermeiros = db.collection("enfermeiro");
        enfermeiros.doc(`${user.uid}/${ano}/${mes}`)
        .set({dias:dateArray}, {merge:true});
        
    }

  });
}

export default useDb;
