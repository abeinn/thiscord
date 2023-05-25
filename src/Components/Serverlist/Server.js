import React, { useContext, useEffect, useState } from 'react'
import './Server.css'
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AppContext } from '../../App';
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import db from '../../firebase';

function Server( { id, name, type } ) {

  const { user, setServerId, setServerName, setChannelId, setChannelName } = useContext(AppContext);

  function handleAddServer() {
    const serverName = prompt('Enter a new server name');
    if (serverName) {
      addDoc(collection(db, 'servers'), {
        serverName: serverName
      }).then((docRef) => {
        getDoc(doc(db, 'users', user.uid)).then((snapshot) => {
          const servers = snapshot.data().servers;
          servers.push(docRef.id);
          setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName: user.displayName,
            servers: servers,
            uid: user.uid
          })
        })
      })
    }
  }

  return (
    <div className='server'>

      {(type === 'server') ? (
        <Avatar onClick={() => {
          setServerId(id);
          setServerName(name);
          setChannelId(null);
          setChannelName('');
        }}>
          {name.charAt(0)}
        </Avatar>
      ): (type === 'add') ? (
        <Avatar onClick={handleAddServer}>
          <AddIcon fontSize='large'/>
        </Avatar>
      ): (type === 'dms') ? (
        <Avatar onClick={() => {
          
        }}> </Avatar>
      ): <></>}

    </div>
  )
  
}

export default Server