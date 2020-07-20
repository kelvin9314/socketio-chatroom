import React, { useState, useEffect } from 'react'

import Temp from './pages/temp'
import IoTest from './pages/ioTest'
import ChatRoom from './pages/chatRoom'

import SocketProvider from './contexts/socketProvider'

const App = () => {
  return (
    <SocketProvider>
      {/* <Temp /> */}
      {/* <IoTest /> */}
      <ChatRoom />
    </SocketProvider>
  )
}

export default App
