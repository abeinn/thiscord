import React, { useContext, useEffect, useState } from 'react';
import './Serverlist.css';
import Server from './Server';
import { AppContext } from '../../App';
import { collection, doc, documentId, getDocs, onSnapshot, where } from 'firebase/firestore';
import db from '../../firebase';

function Serverlist() {

  const { user } = useContext(AppContext);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    
    onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      
      const serverIds = snapshot.data().servers;

      getDocs(collection(db, 'servers'), where(documentId(), 'in', serverIds)).then((snapshot) => {
        setServers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            server: doc.data()
          }))
        )
      })
      
    });

  }, []);

  return (
    <div className='serverlist'>
      
      <Server type='dms'/>

      {servers.map(({ id, server }) => (
        <Server id={id} name={server.serverName} type='server' />
      ))}
      
      <Server type='add'/>
      
    </div>
  )
}

export default Serverlist