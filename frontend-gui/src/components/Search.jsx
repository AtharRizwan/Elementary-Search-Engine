import React, { useState } from 'react';
import "./Search.scss" 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const Search = () => { 
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  let handleSpeechEnd = () => {}

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    onEnd: handleSpeechEnd, 
  });

  handleSpeechEnd = () => {
    setSearchText(transcript);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  
  const handleSearchChange = (e) => {
    if (transcript){
      setSearchText(transcript);
    }
    else{
      setSearchText(e.target.value);
    } 
  };

  const clearTranscript = () => {
    resetTranscript();
    setSearchText('');
  };

  const handleSingleWordSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search_1?word=${searchText}`);
      console.log(response)
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching single word search result:', error);
    }
  };

  const handleMultiWordSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?query=${searchText}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching multi-word search results:', error);
    }
  };

  return (
    <div className="search-container">
      <img src="logo.jpeg" alt="Logo" className="logo" />
 
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <div className="icons">
            <div
                className="clear-icon"
                onClick={clearTranscript}
                title="Click to clear"
              >
                &#10006;
            </div> 
            <div className="search-icon" onClick={handleSingleWordSearch} title='Click to search'>&#128269;</div>
            <div
              className="speech-icon"
              onClick={SpeechRecognition.startListening}
              title="Click to Speak"
            >
              &#128266;
            </div>
            {listening && 
            (
              <div className="stop-icon"               
                onClick={SpeechRecognition.startListening}
                title="Stop Listening">
              </div>
            )}
          </div> 
        </div>  
      <div className='buttons'>
        <button className="search-button">Search</button>
        <button className="add-article-button">Add Article</button>
      </div> 

      {searchResults && 
        (
          searchResults
        )
      }
    </div>
  );
}

export default Search