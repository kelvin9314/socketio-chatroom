import React, { useEffect, useState } from 'react'

const SearchBar = porps => {
  return (
    <div className="srch_bar">
      <div className="stylish-input-group">
        <input type="text" className="search-bar" placeholder="Search" />
        <span className="input-group-addon">
          <button type="button">
            {' '}
            <i className="fa fa-search" aria-hidden="true"></i>{' '}
          </button>
        </span>
      </div>
    </div>
  )
}

export default SearchBar
