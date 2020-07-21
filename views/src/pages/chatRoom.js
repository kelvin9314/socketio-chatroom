import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../contexts/socketProvider'
import md5 from 'md5'

import '../style/temp.css'

import IncomingMsg from '../components/incoming-msg/IncomingMsg'
import OutgoingMsg from '../components/outgoing-msg/OutgoingMsg'

const SOCKET_EVENT_MAP = {
  addUser: 'add user',
  newMessage: 'new message',
  userJoined: 'user joined',
}

const ChatRoom = () => {
  const { socket, messageHistory, updateMessageHistory } = useContext(SocketContext)
  const [userName, setUserName] = useState('')
  const [inputText, setInputText] = useState('')
  const formRef = React.createRef(null)
  const msgHistoryRef = React.createRef(null)

  useEffect(() => {
    if (socket) {
      socket.on(SOCKET_EVENT_MAP.newMessage, data => {
        updateMessageHistory(data)
      })

      // socket.on(SOCKET_EVENT_MAP.userJoined, data => {
      //   const { userName, userCounter } = data
      //   updateMessageHistory({ userName: `${userName} joined`, message: `There are ${userCounter} user now` })
      // })
    }

    return () => {
      localStorage.removeItem('userHash')
    }
  }, [socket])

  const handleInputName = e => {
    setInputText(e.target.value)
    e.preventDefault()
  }

  const handleSend = (e) => {
    e.preventDefault()

    const text = formRef.current.inputText.value
    if (!text) {
      console.log('empty string ')
      return
    }

    const msg = {
      userName,
      msgType: '', 
      hash: localStorage.userHash,
      message: text,
      dateTime: new Date().toISOString(),
    }
    socket.emit(SOCKET_EVENT_MAP.newMessage, msg)
    formRef.current.inputText.value = ''
  }

  useEffect(() => {
    console.log(messageHistory)
    if(userName && msgHistoryRef){
      msgHistoryRef.current.scrollTop = msgHistoryRef.current.scrollHeight
    }
  }, [messageHistory])
  

  const handleEnterPress = (e, event) => {
    if (!inputText) return
    if (e.nativeEvent.keyCode === 13) {
      try {
        switch (event) {
          case SOCKET_EVENT_MAP.addUser:
            setUserName(inputText)
            localStorage.setItem('name', inputText)
            const hashValue = md5(`${inputText}${new Date().toISOString()}`)
            localStorage.setItem('userHash', hashValue)
            socket.emit(SOCKET_EVENT_MAP.addUser, inputText)
            break
          case SOCKET_EVENT_MAP.newMessage:
            const msg = {
              userName,
              hash: localStorage.userHash,
              message: inputText,
              dateTime: new Date().toISOString(),
            }
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
    <div>
      {userName ? (
        <div className="container">
          <h3 className=" text-center">Messaging</h3>
          <div className="messaging"></div>
          <div className="mesgs">
            <div className="msg_history" ref={msgHistoryRef}>
              {messageHistory.map(record =>
                record.hash !== localStorage.userHash ? <IncomingMsg {...record} /> : <OutgoingMsg {...record} />
              )}
              
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <form onSubmit={handleSend} ref={formRef}>
                <input
                  type="text"
                  name="inputText"
                  className="write_msg"
                  placeholder="Type a message"
                  // value={inputText}
                  // onChange={e => setInputText(e.target.value)}
                  // onKeyPress={e => handleEnterPress(e, SOCKET_EVENT_MAP.newMessage)}
                />
                <button 
                  className="msg_send_btn" 
                  // onClick={() => handleSend()}
                  >
                  <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="App" style={{ margin: '50px 50px', padding: '32px' }}>
          <h2 style={{ textAlign: 'center' }}>Welcome Here!</h2>
          <input
            length="50"
            size="25"
            placeholder="please input your name"
            type="text"
            value={inputText}
            onChange={e => handleInputName(e)}
            onKeyPress={e => handleEnterPress(e, SOCKET_EVENT_MAP.addUser)}
          />
        </div>
      )}
    </div>
  )
}

export default ChatRoom
