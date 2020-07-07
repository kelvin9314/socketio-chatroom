import React, { useEffect, useState } from 'react'

import SearchBar from '../search-bar/search-bar'
import ChatPeopleList from '../chat-poeple-list/chat-people-list'

const chatPeopleGenFN = obj => {
  return {
    iconImg: 'https://ptetutorials.com/images/user-profile.png',
    name: 'kelvin',
    lastSent: '11:20',
    lastContent: 'this is testing',
    ...obj,
  }
}
const CHAT_LIST = [
  chatPeopleGenFN(),
  chatPeopleGenFN({ name: 'Hugo', lastSent: 'Yesterday', lastContent: 'test456' }),
  chatPeopleGenFN({ name: 'Mary', lastSent: '3/10', lastContent: 'i am there' }),
]

const InboxPeople = props => {
  return (
    <div className="inbox_people">
      <div className="headind_srch">
        <div className="recent_heading">
          <h4>Recent</h4>
        </div>
        <SearchBar />
      </div>
      <ChatPeopleList data={CHAT_LIST} />
    </div>
  )
}

export default InboxPeople
