import React, { useState } from 'react';
import "./Search.scss"  
import Loader from "../../components/loader/Loader";   

const Search = () => { 
  const [searchText, setSearchText] = useState('');
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [imageSrc, setImageSrc] = useState('');
  const [check, setcheck] = useState(false);
  const [time, settime] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  const [articleContent, setArticleContent] = useState('');

 
  const handleSubmitForm = (e) => {
    // Handle form submission logic
    e.preventDefault();

    // ... (your form submission logic)

    // Hide the form after submission
    setShowForm(false);
  };
 
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
      console.log(response);
      console.log(data)
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
      setImageSrc(`data:image/jpeg;base64,${data.image}`)   
      setCloudinaryUrl(data.image_cloudinary_url);
      console.log(cloudinaryUrl)
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating AI image:', error);
      setIsLoading(false);
    }
  };

  const HandleAdd = () => {
    setShowForm(true);
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
        <button className="add-article-button" type='button' id='12' onClick={HandleAdd}>Add Article</button>
        {isLoading && <Loader />}
        <button className="add-img-button" name='troublebtn' type='button' id='13' onClick={handleGenAi}> Create Image </button>
        {isLoading && <Loader />}
      </div>  

      {showForm && (
        <form onSubmit={handleSubmitForm}>
          {/* Article Title Input */}
          <label htmlFor="articleTitle">Article Title:</label>
          <input
            type="text"
            id="articleTitle"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            required
          />

          {/* Article URL Input */}
          <label htmlFor="articleUrl">Article URL:</label>
          <input
            type="url"
            id="articleUrl"
            value={articleUrl}
            onChange={(e) => setArticleUrl(e.target.value)}
            required
          />

          {/* Article Content Input */}
          <label htmlFor="articleContent">Article Content:</label>
          <textarea
            id="articleContent"
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      )}

      {(results.titles && results.titles.length > 0) && (
        <div className="search-results-container">
          <h1 className="search-results-heading">Search Results</h1>
          <p className='time-cont'> {results.titles.length} results found in {time}s</p>
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
                  {index === 0 ? title.charAt(0).toUpperCase() + title.slice(1) : ` ${title}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}  

      {check && (<img src={cloudinaryUrl} alt="Example" style={{ maxWidth: '100%' }} />)} 
    </div>
  );
}

export default Search