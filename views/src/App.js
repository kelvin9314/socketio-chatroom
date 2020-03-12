import React, { useState, useEffect} from 'react'
import socketIOClient from "socket.io-client";

import logo from './logo.svg'
import './App.css'

const App = () => {
  const [incomingMessages, setIncomingMessages] = useState(['Welcome here!']);
  const [inputText, setInputText] = useState('');
  // useEffect(() => {
  //   console.log(inputText);
  // }, [inputText]);

  const handleSend = () =>{
    const socket = socketIOClient(process.env.REACT_APP_SERVER_URL || 'localhost')
    socket.emit("chat message", inputText);

    setInputText('')
  }

  return (
    <div className="App">
      <textarea>{JSON.stringify(incomingMessages)}</textarea>
      <div>
        <input 
          type="text" 
          value={inputText}
          placeholder="Type something here"
          onChange={e => setInputText(e.target.value)}
        />
        <button 
          disabled={(inputText.length > 0) ? false : true}
          onClick={() => handleSend()}
        >
            Send
        </button>
      </div>
    </div>
  )
}

export default App
