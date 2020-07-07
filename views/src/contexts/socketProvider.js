import React, { createContext, useState, useEffect } from 'react'
// import { socket } from '../sockets'
import socketIOClient from 'socket.io-client'

export const SocketContext = createContext()

const SocketProvider = props => {
  const [socket, setSocket] = useState(null)
  const [messageHistory, setMessageHistory] = useState([
    {
      dateTime: new Date().toISOString(),
      userName: 'Default',
      userJoined: 'user joined',
      message: 'Welcome here!',
    },
  ])

  useEffect(() => {
    const socketObj = socketIOClient(process.env.REACT_APP_SERVER_URL || '/')
    setSocket(socketObj)
   
  }, [])

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
