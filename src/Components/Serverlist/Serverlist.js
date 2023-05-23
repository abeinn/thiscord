import React from 'react';
import './Serverlist.css';
import Server from './Server';

function Serverlist() {
  return (
    <div className='serverlist'>
      
      <Server type='dms'/>

      <Server name='Ctest' type='server'/>
      <Server name='Atest' type='server'/>
      <Server name='Btest' type='server'/>
      
      <Server type='add'/>
      
    </div>
  )
}

export default Serverlist