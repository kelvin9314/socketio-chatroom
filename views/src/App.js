import React, { useState, useEffect} from 'react'

import ChatRoom from "./pages/chatRoom";
import IoTest from './pages/ioTest';

import SocketProvider from "./contexts/socketProvider";

const App = () => {

  return (
    <SocketProvider>
      {/* <ChatRoom /> */}
      <IoTest />
    </SocketProvider>
  )
}

export default App
