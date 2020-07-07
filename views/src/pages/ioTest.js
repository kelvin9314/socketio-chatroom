import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../contexts/socketProvider'
import logo from '../logo.svg'

// import { socket } from "../sockets";
import '../style/App.css'

const SOCKET_EVENT_MAP = {
  addUser: 'add user',
  newMessage: 'new message',
  userJoined: 'user joined',
}

const IoTest = props => {
  const { socket, messageHistory, updateMessageHistory } = useContext(SocketContext)
  const [userName, setUserName] = useState('')
  const [inputText, setInputText] = useState('')

  socket.on(SOCKET_EVENT_MAP.newMessage, ({ userName, message }) => {
    updateMessageHistory({ userName, message })
  })

  socket.on(SOCKET_EVENT_MAP.userJoined, data => {
    // console.log(data)
    const { userName, userCounter } = data
    // console.log({ name: `${userName} joined`, message: `There are total ${userCounter} user now !~!` })
    updateMessageHistory({ userName: `${userName} joined`, message: `There are ${userCounter} user now` })
  })

  const handleSend = e => {
    const msg = { userName, message: inputText }
    updateMessageHistory(msg)
    socket.emit(SOCKET_EVENT_MAP.newMessage, msg)
    setInputText('')
  }

  const handleInputName = e => {
    setInputText(e.target.value)
    e.preventDefault()
  }

  const handleEnterPress = (e, event) => {
    if (!inputText) return
    if (e.nativeEvent.keyCode === 13) {
      try {
        switch (event) {
          case SOCKET_EVENT_MAP.addUser:
            setUserName(inputText)
            socket.emit(SOCKET_EVENT_MAP.addUser, inputText)
            setInputText('')
            break
          case SOCKET_EVENT_MAP.newMessage:
            const msg = { userName, message: inputText }
            updateMessageHistory(msg)
            socket.emit(SOCKET_EVENT_MAP.newMessage, msg)
            break
          default:
            break
        }
      } catch (err) {
        console.log(err)
      } finally {
        setInputText('')
      }
    }
  }

  return (
    <div className="App">
      {userName ? (
        // <div  style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">
        <div>
          <ul>
            {messageHistory.map(record => (
              <li
                key={record.dateTime}
                style={{ borderWidth: '1px', borderStyle: 'dashed', borderColor: '#FFAC55', padding: '2px' }}
              >
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
            <button disabled={!(inputText.length > 0)} onClick={e => handleSend(e)}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <div style={{ margin: '50px 50px', padding: '32px' }}>
          <h2 style={{ textAlign: 'center' }}>Welcome Here!</h2>
          <input
            length="50"
            size="25"
            placeholder={'please input your name'}
            type={'text'}
            value={inputText}
            onChange={e => handleInputName(e)}
            onKeyPress={e => handleEnterPress(e, SOCKET_EVENT_MAP.addUser)}
          />
        </div>
      )}
    </div>
  )
}

export default IoTest
