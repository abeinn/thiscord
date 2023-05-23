import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import Chat from './Components/Chat/Chat';
import Login from './Components/Login/Login';
import { auth } from './firebase';
import Serverlist from './Components/Serverlist/Serverlist';

export const AppContext = createContext();

function App() {

  const [user, setUser] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        });
      } else {
        setUser(null);
      }
    })
  }, []);

  return (
    <div className="app">

      <AppContext.Provider
        value={{
          user,
          channelId,
          setChannelId,
          channelName,
          setChannelName
        }}>

        {user ? (
          <>
            <Serverlist />

            <Sidebar />

            <Chat />
          </>
        ): (
          <Login />
        )}

        

      </AppContext.Provider>

    </div>
  );
}

export default App;
