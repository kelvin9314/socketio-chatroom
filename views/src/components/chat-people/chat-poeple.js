import React, { useEffect, useState } from "react";

import '../../style/chatRoom.css'


// maybe change to use useMemo, equal to React.pureComponetns
const ChatPeople = ({data, isActive}) => {
  const {iconImg, name, lastSent, lastContent} = data
  console.log(data, isActive)
  return(
  <div className={`chat_list ${isActive ? 'active_chat': ''}`}>
    <div className="chat_people">
      <div className="chat_img"> <img src={iconImg} alt="sunil" /> </div>
      <div className="chat_ib">
        <h5>{name} <span className="chat_date">{lastSent}</span></h5>
        <p>{lastContent}</p>
      </div>
    </div>
  </div>
  )
}

export default ChatPeople
