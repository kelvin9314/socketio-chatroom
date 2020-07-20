import React from 'react'

import './incoming-msg.css'

const IncomingMsg = ({ userName, message, dateTime }) => {
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <span className="received_personal_name">{userName}</span>
          <p>{message}</p>
          <span className="time_date"> {new Date(dateTime).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default IncomingMsg
