import React from 'react';
import './Message.css';
import { Avatar } from '@mui/material';

function Message() {
  return (
    <div className='message'>
      <Avatar />
      <div className='message__info'>
        <h4>
          Username
          <span className='message__timestamp'>Timestamp</span>
        </h4>

        <p>Message content</p>
      </div>
    </div>
  )
}

export default Message