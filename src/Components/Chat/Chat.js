import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from './Message';
import { AppContext } from '../../App';
import db from '../../firebase';
import { addDoc, collection, getDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';

function Chat() {

  const { user, channelId, channelName } = useContext(AppContext);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      const messages = collection(db, 'channels', channelId, 'messages')
      onSnapshot(query(messages, orderBy('timestamp', 'asc')), (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()))
      });
    }
  }, [channelId]);

  function sendMessage(e) {
    e.preventDefault();
    const messages = collection(db, "channels", channelId, "messages");
    addDoc(messages, {
      message: input,
      user: user,
      timestamp: serverTimestamp()
    });

    setInput('');
  }

  return (
    <div className='chat'>
      <ChatHeader channelName={channelName}/>

      <div className='chat__messages'>
        {messages.map((message) => (
          <Message 
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      <div className='chat__input'>
        <AddCircleIcon fontSize='large' />
        <form>
          <input 
            value={input} 
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)} 
            placeholder={`Message #${channelName}`} 
          />
          <button 
            disabled={!channelId}
            className='chat__inputButton' 
            type='submit'
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className='chat__inputIcons'>
          <CardGiftcardIcon fontSize='large'/>
          <GifIcon fontSize='large'/>
          <EmojiEmotionsIcon fontSize='large' />
        </div>
      </div>
    </div> 
  );
}

export default Chat