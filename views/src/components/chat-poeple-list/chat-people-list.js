import React, { useEffect, useState } from 'react'

import ChatPeople from '../chat-people/chat-poeple'

const ChatPeopleList = ({ data: chats }) => {
  console.log(chats)
  return (
    <div className="inbox_chat">
      {chats.map(chat => (
        <ChatPeople data={chat} isActive={false} />
      ))}
    </div>
  )
}

export default ChatPeopleList
