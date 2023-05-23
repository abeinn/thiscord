import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../App';
import './Sidebar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import db, { auth } from '../../firebase';
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 


function Sidebar() {

  const { user } = useContext(AppContext);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    
    onSnapshot(collection(db, 'channels'), (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
        id: doc.id,
        channel: doc.data()
        }))
      )
    });

  }, []);

  function handleAddChannel() {
    const channelName = prompt('Enter a new channel name');

    if (channelName) {
      addDoc(collection(db, 'channels'), {
        channelName: channelName,
      })
    }

  }

  return (
    <div className='sidebar'>      
      <div className='sidebar__top'>
        <h3>Server Name</h3>
        <ExpandMoreIcon />
      </div>

      <div className='sidebar__channels'>
        <div className='sidebar__channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>

          <AddIcon onClick={handleAddChannel} className='sidebar__addChannel' />
        </div>

        <div className='sidebar__channelsList'>
          {channels.map(({ id, channel }) => (
            <SidebarChannel key={id} id={id} channelName={channel.channelName}/>
          ))}
        </div>

      </div>

      <div className='sidebar__voice'>
        <SignalCellularAltIcon className='sidebar__voiceIcon' fontSize='large'/>
        <div className='sidebar__voiceInfo'>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className='sidebar__voiceIcons'>
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className='sidebar__profile'>
        <Avatar onClick={() => auth.signOut()} src={user.photo}/>
        <div className='sidebar__profileInfo'>
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0,5)}</p>
        </div>

        <div className='sidebar__profileIcons'>
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  )
}

export default Sidebar