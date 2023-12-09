import React, { useState } from 'react';
import "./Search.scss"  
import Loader from "../../components/loader/Loader";  
import ImageDisplay from '../image/ImageDisplay';

const Search = () => { 
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [imageSrc, setImageSrc] = useState('');
  const [check, setcheck] = useState(false);
  const [time, settime] = useState(0);
 
  const handleSearchChange = (e) => { 
    setSearchText(e.target.value); 
  };

  const clearTranscript = () => { 
    setSearchText('');
  };
 

  const handleSingleWordSearch = async () => { 
    try {
      setcheck(false)
      setIsLoading(true);
      const startTime = performance.now();
      const response = await fetch(`http://localhost:5000/search_1?word=${searchText}`);
      const data = await response.json(); 
      const endTime = performance.now();
      const elapsedTime = ((endTime - startTime)/1000).toFixed(3);
      settime(elapsedTime)
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
      const startTime = performance.now();
      const response = await fetch(`http://localhost:5000/search_2?word=${searchText}`); 
      const data = await response.json();
      const endTime = performance.now();
      const elapsedTime = ((endTime - startTime)/1000).toFixed(3);
      settime(elapsedTime)
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

  const handleGenAi = async (e) => { 
    try {  
      setcheck(true);
      e.preventDefault(); 
      setIsLoading(true); 
      const response = await fetch(`http://localhost:5000/gen?word=${searchText}`);
      const data = await response.json();   
      setImageSrc(`data:image/png;base64,${data.image}`)   
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
            name='searchText'
            type="text"
            placeholder="Search..."
            id='00'
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
              title="Click to Speak"
            >
              &#128266;
            </div> 
          </div> 
        </div>  
      <div className='buttons'>
        <button className="search-button" type='button' id='11' onClick={performSearch}>Search</button>
        {isLoading && <Loader />}
        <button className="add-article-button" type='button' id='12'>Add Article</button>
        {isLoading && <Loader />}
        <button className="add-img-button" name='troublebtn' type='button' id='13' onClick={handleGenAi}> Create Image </button>
        {isLoading && <Loader />}
      </div>  

      {(results.titles && results.titles.length > 0) && (
        <div className="search-results-container">
          <h1 className="search-results-heading">Search Results</h1>
          <p className='time-cont'> Results found in {time}s</p>
          <hr/>
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
      {check && (<img src={imageSrc} alt="Example" style={{ maxWidth: '100%' }} />)}
        
    </div>
  );
}

export default Search