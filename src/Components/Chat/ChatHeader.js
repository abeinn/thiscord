import React, { useContext } from 'react';
import './ChatHeader.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditLocationRoundedIcon from '@mui/icons-material/EditLocationRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { AppContext } from '../../App';
import { and, collection, doc, documentId, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import db from '../../firebase';


function ChatHeader({ channelName }) {

  const { serverId } = useContext(AppContext);

  function handleAddUser() {
    if (!serverId) { return; }

    const newUser = prompt('Enter a user to add to the server');

    if (newUser) {
      
      const hashIndex = newUser.indexOf('#');
      if (hashIndex < 0) { return; }
      const displayName = newUser.substring(0, hashIndex);
      const uid = newUser.substring(hashIndex + 1);


      const q = query(collection(db, 'users'),
        and(where('displayName', '==', displayName),
            where('uid', '>=', uid),
            where('uid', '<', uid + '\uf8ff')));

      getDocs(q).then((snapshot) => {
        const id = snapshot.docs[0].id;
        getDoc(doc(db, 'users', id)).then((snapshot) => {
          const user = snapshot.data();
          const servers = user.servers;
          servers.push(serverId);
          setDoc(doc(db, 'users', id), {
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
    <div className='chatHeader'>
      <div className='chatHeader__left'>
        <h3>
          <span className='chatHeader__hash'>#</span>
          {channelName}
        </h3>
      </div>

      <div className='chatHeader__right'>

        <NotificationsIcon />
        <EditLocationRoundedIcon />
        <PersonAddAltRoundedIcon 
          onClick={handleAddUser}
        />

        <div className='chatHeader__search'>
          <input placeholder='Search' />
          <SearchRoundedIcon />
        </div>

        <SendRoundedIcon />
        <HelpRoundedIcon />


      </div>
    </div>
  )
}

export default ChatHeader