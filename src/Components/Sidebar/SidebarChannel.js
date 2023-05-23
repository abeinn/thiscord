import React, { useContext } from 'react';
import { AppContext } from '../../App';
import './SidebarChannel.css';

function SidebarChannel({ id, channelName }) {

  const { setChannelId, setChannelName } = useContext(AppContext);
  return (
    <div className='sidebarChannel' onClick={() => {
      setChannelId(id);
      setChannelName(channelName);
    }}>
       <h4>
        <span className='sidebarChannel__hash'>#</span>
        {channelName}
      </h4> 
    </div>
  );
}

export default SidebarChannel