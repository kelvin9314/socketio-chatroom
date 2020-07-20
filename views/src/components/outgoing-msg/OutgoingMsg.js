import React from 'react'

import './outgoning-msg.css'

const IncomingMsg = ({ message, dateTime }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{message}</p>
        <span className="time_date"> {new Date(dateTime).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default IncomingMsg
