import React, { useState, useEffect} from 'react'
// import socketIOClient from "socket.io-client";

import logo from '../logo.svg'
import '../style/App.css'

const SOCKET_EVENT_MAP = {
  addUser: 'add user2',
  newMessage: 'new message',
}

const IoTest = (props) => {
  const { socket } = props
  const [userName, setUserName] = useState('');
  const [incomingMessages, setIncomingMessages] = useState([{
    userName: 'Default',
    message: 'Welcome here!'
  }]);
  const [inputText, setInputText] = useState('');
  
  // useEffect(() => {
  //   console.log(inputText);
  // }, [inputText]);

  // const socket = socketIOClient(process.env.REACT_APP_SERVER_URL || 'localhost')

  socket.on(SOCKET_EVENT_MAP.newMessage, data => {
    console.log(data);
    setIncomingMessages([...incomingMessages,...[data]])
  })

  socket.on(SOCKET_EVENT_MAP.addUser, data => {
    console.log(data);
  })
  

  useEffect(() => {
    console.log(incomingMessages);
  }, [incomingMessages]);

  const handleSend = e =>{
    socket.emit(SOCKET_EVENT_MAP.newMessage, inputText);
    setInputText('')
  }

  const handleInputName = e => {
    setInputText(e.target.value)
    e.preventDefault();
  }

  const handleEnterPress = (e, event) => {
    if(!inputText) return
    if(e.nativeEvent.keyCode === 13) {
      switch (event) {
        case SOCKET_EVENT_MAP.addUser:
            setUserName(inputText)
            socket.emit(SOCKET_EVENT_MAP.addUser, inputText)
            setInputText('')
          break;
        case SOCKET_EVENT_MAP.newMessage:
            socket.emit(SOCKET_EVENT_MAP.newMessage, { userName, inputText})
          break
        default:
          break;
      }
    }
  }

  return (
    <div className="App">
      {userName ? (
        <div>
          {/* <textarea rows="16" cols="50">{JSON.stringify(incomingMessages)}</textarea> */}
          <ul>
            {incomingMessages.map(record => (
              <li>
                {`${record.userName}: ${record.message}`}
              </li>
            ))}
          </ul>
          <div>
            <input 
              type="text" 
              value={inputText}
              placeholder="Type something here"
              onChange={e => setInputText(e.target.value)}
              onKeyPress={e => handleEnterPress(e, SOCKET_EVENT_MAP.newMessage)}
            />
            <button 
              disabled={(inputText.length > 0) ? false : true}
              onClick={e => handleSend(e)}
            >
                Send
            </button>
          </div>
        </div>
      ) : (
        <div style={{margin: "50px 50px",padding: "32px"}}>
          <h2 style={{textAlign: "center"}}>Welcome Here!</h2>
          <input
            length="50"
            size="25"
            placeholder={"please input your name"}
            type={"text"}
            value={inputText}
            onChange ={e => handleInputName(e)}
            onKeyPress ={e => handleEnterPress(e, SOCKET_EVENT_MAP.addUser)}
          />
        </div>
      )}
    </div>
  )
}

export default IoTest
