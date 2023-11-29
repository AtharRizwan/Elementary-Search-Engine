import React from 'react'
import "./Search.scss"
import { MdOutlineMic } from "react-icons/md";

const Search = () => {
  return (
    <div className="search-container">
      <img src="logo.jpeg" alt="Logo" className="logo" />
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <div className="icons">
          <div className="search-icon">&#128269;</div>
          <div className="speech-icon">&#128266;</div>
        </div>
      </div> 
      <div className='buttons'>
        <button className="search-button">Search</button>
        <button className="add-article-button">Add Article</button>
      </div>
    </div>
  );
}

export default Search