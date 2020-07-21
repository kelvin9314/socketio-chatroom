import React, { createContext, useState, useEffect } from 'react'
// import { socket } from '../sockets'
import socketIOClient from 'socket.io-client'

export const SocketContext = createContext()

const SocketProvider = props => {
  const [socket, setSocket] = useState(null)
  const [messageHistory, setMessageHistory] = useState([])

  useEffect(() => {
    const socketObj = socketIOClient(process.env.REACT_APP_SERVER_URL || '/')
    setSocket(socketObj)
  }, [])

  const updateMessageHistory = data => {
    console.log(data)
    // Way one
    messageHistory.push(data)
    setMessageHistory([...messageHistory])
    // Way two
    // setMessageHistory((prevState) => [...prevState, data])
  }

  return (
    <SocketContext.Provider value={{ socket, messageHistory, updateMessageHistory }}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
