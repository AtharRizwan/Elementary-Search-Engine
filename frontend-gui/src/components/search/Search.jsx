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

  const HandleGenAi = async (e) => { 
    try {
      window.location.reload(false);
      e.preventDefault();
      setcheck(true)
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/gen?word=${searchText}`);
      const data = await response.json(); 
      setImageSrc(data.image)
      setSearchResults(data.word)
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
              title="Click to Speak"
            >
              &#128266;
            </div> 
          </div> 
        </div>  
      <div className='buttons'>
        <button className="search-button" onClick={performSearch}>Search</button>
        {isLoading && <Loader />}
        <button className="add-article-button">Add Article</button>
        {isLoading && <Loader />}
        <button className="add-img-button" type='button' onClick={(e) => {HandleGenAi(e)}}>Create Image</button>
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
      {check && <ImageDisplay />}
       
   
    </div>
  );
}

export default Search