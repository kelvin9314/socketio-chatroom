import '../style/chatRoom.css'
import React, { useEffect, useState } from 'react'

import InboxPeople from '../components/inbox-people/inbox-people'

const ChatRoom = props => {
  return (
    <div className="container">
      <h3 className=" text-center">Messaging</h3>
      <div className="messaging"></div>
      <div className="inbox_msg">
        <InboxPeople />
        <div className="mesgs">
          <div className="msg_history">
            <div className="incoming_msg">
              <div className="incoming_msg_img">
                {' '}
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
              </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>Test 123</p>
                  <span className="time_date"> 11:01 AM | Mar 9</span>
                </div>
              </div>
            </div>
            <div className="outgoing_msg">
              <div className="sent_msg">
                <p>I have a dream</p>
                <span className="time_date"> 11:01 AM | June 9</span>
              </div>
            </div>
            <div className="incoming_msg">
              <div className="incoming_msg_img">
                {' '}
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
              </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>Test, which is a new approach to have</p>
                  <span className="time_date"> 11:01 AM | Yesterday</span>
                </div>
              </div>
            </div>
            <div className="outgoing_msg">
              <div className="sent_msg">
                <p>People shouldn't be afraid of their government. Governments should be afraid of their people.</p>
                <span className="time_date"> 11:01 AM | Today</span>
              </div>
            </div>
            <div className="incoming_msg">
              <div className="incoming_msg_img">
                {' '}
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
              </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>Test</p>
                  <span className="time_date"> 11:01 AM | Today</span>
                </div>
              </div>
            </div>
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input type="text" className="write_msg" placeholder="Type a message" />
              <button className="msg_send_btn" type="button">
                <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
