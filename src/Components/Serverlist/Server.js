import React, { useContext, useEffect, useState } from 'react'
import './Server.css'
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AppContext } from '../../App';
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import db from '../../firebase';

function Server( { id, name, type } ) {

  const { user } = useContext(AppContext);

  function handleAddServer() {
    const serverName = prompt('Enter a new server name');
    if (serverName) {
      addDoc(collection(db, 'servers'), {
        serverName: serverName
      }).then((docRef) => {
        getDoc(doc(db, 'users', user.uid)).then((docSnapshot) => {
          const servers = docSnapshot.data().servers;
          servers.push(docRef.id);
          setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName: user.displayName,
            servers: servers
          })
        })
      })
    }
  }

  return (
    <div className='server'>

      {(type === 'server') ? (
        <Avatar>{name.charAt(0)}</Avatar>
      ): (type === 'add') ? (
        <Avatar onClick={handleAddServer}>
          <AddIcon fontSize='large'/>
        </Avatar>
      ): (type === 'dms') ? (
        <Avatar> </Avatar>
      ): <></>}

    </div>
  )
  
}

export default Server