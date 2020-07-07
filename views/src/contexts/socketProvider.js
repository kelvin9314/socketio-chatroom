import React, { createContext, useState, useEffect } from 'react'
import { socket } from '../sockets'

export const SocketContext = createContext()

const SocketProvider = props => {
  const [messageHistory, setMessageHistory] = useState([
    {
      dateTime: new Date().toISOString(),
      userName: 'Default',
      userJoined: 'user joined',
      message: 'Welcome here!',
    },
  ])

  const updateMessageHistory = data => {
    setMessageHistory([...messageHistory, ...[{ ...data, dateTime: new Date().toISOString() }]])
  }

  return (
    <SocketContext.Provider value={{ socket, messageHistory, updateMessageHistory }}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
