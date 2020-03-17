import React, { useState, useEffect} from 'react'
import socketIOClient from "socket.io-client";

import ChatRoom from "./pages/chatRoom";
import IoTest from './pages/ioTest';

const App = () => {
  // const socket = socketIOClient(process.env.REACT_APP_SERVER_URL || 'localhost')
  // socket.on('chat message', data => {
  //   console.log(data);
  // })
  
  return (
    // <ChatRoom />
    // <IoTest socket={socket} />
    <IoTest />
  )
}

export default App
