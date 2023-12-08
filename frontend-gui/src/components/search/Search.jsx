import React, { useState, useEffect } from 'react';
import "./Search.scss" 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Loader from "../../components/loader/Loader";  
import ImageDisplay from '../image/ImageDisplay';

const Search = () => { 
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [check, setcheck] = useState(false);

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
      setcheck(false)
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/search_1?word=${searchText}`);
      const data = await response.json(); 
      setResults(data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching single word search result:', error);
    }
  };

  const handleMultiWordSearch = async () => {
    try {
      setcheck(false)
      setIsLoading(true)
      const response = await fetch(`http://localhost:5000/search_2?word=${searchText}`); 
      const data = await response.json();
      console.log(data);
      setResults(data); 
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching single word search result:', error);
    }
  };

  const performSearch = () => {
    const words = searchText.trim().split(/\s+/);
    if (words.length === 1) {
      handleSingleWordSearch();
    } else if (words.length > 1) {
      handleMultiWordSearch();
    }
  };

  const HandleGenAi = async () => {
    try {
      setcheck(true)
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/gen?word=${searchText}`);
      const data = await response.json();
      const blob = await response.blob();

      // Create a local URL for the blob
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl)
      setcheck(true)
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating AI image:', error);
      setIsLoading(false);
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
            <div className="search-icon" onClick={performSearch} title='Click to search'>&#128269;</div>
            {isLoading && <Loader />}
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
        <button className="search-button" onClick={performSearch}>Search</button>
        {isLoading && <Loader />}
        <button className="add-article-button">Add Article</button>
        {isLoading && <Loader />}
        <button className="add-img-button" onClick={HandleGenAi}>Create Image</button>
        {isLoading && <Loader />}
      </div>  

      {(results.titles && results.titles.length > 0) && (
        <div className="search-results-container">
          <h2 className="search-results-heading">Search Results</h2>
          <ul className="search-results-list">
            {results.titles.map((title, index) => (
              <li key={index} className="search-results-item">
                <a
                  href={results.urls[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="search-results-link"
                >
                  {title.map((word, i) => (
                    i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : ` ${word}`
                  ))}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )} 
      <div> 
       {(imageSrc) &&
        (<ImageDisplay />)
       }
       <ImageDisplay />
      </div>
    </div>
  );
}

export default Search