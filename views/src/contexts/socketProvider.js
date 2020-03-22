import React, { createContext, useState, useEffect } from 'react';
import { socket } from "../sockets";

export const SocketContext = createContext();

const SocketProvider = props => {
  const [messageHistory, setMessageHistory] = useState([{
    userName: 'Default',
    userJoined: 'user joined',
    message: 'Welcome here!'
  }]);
  
  return (
    <SocketContext.Provider value={{socket,messageHistory, setMessageHistory}} >
      {props.children}
    </SocketContext.Provider>
  );
}


export default SocketProvider
