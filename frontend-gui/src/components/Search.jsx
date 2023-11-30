import React, { useState } from 'react';
import "./Search.scss" 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Search = () => { 

  const [searchText, setSearchText] = useState('');

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
            <div className="search-icon">&#128269;</div>
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
    </div>
  );
}

export default Search