import React from 'react'
import './Server.css'
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Server( { name, type } ) {

  return (
    <div className='server'>

      {(type === 'server') ? (
        <Avatar>{name.charAt(0)}</Avatar>
      ): (type === 'add') ? (
        <Avatar>
          <AddIcon fontSize='large'/>
        </Avatar>
      ): (type === 'dms') ? (
        <Avatar> </Avatar>
      ): <></>}

    </div>
  )
  
}

export default Server