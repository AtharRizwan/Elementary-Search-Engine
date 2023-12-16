import React, { useState } from 'react';
import "./Search.scss"  
import Loader from "../../components/loader/Loader";   
import ImageDisplay from '../image/ImageDisplay';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => { 
  const [searchText, setSearchText] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [imageSrc, setImageSrc] = useState('');
  const [check, setcheck] = useState(false);  
  const [time, settime] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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
      toast.success("Search completed!");
      setResults(data);
      setIsLoading(false);
 
    } catch (error) {
      console.error('Error fetching single word search result:', error);
      toast.error("Error fetching single word search result!");
      setIsLoading(false)
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
      toast.success("Search completed!")
    } catch (error) {
      console.error('Error fetching single word search result:', error);
      toast.error("Error fetching multi word search result!")
      setIsLoading(false)
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
      toast.success("Image generated!")
    } catch (error) {
      console.error('Error generating AI image:', error);
      setIsLoading(false);
      toast.error("Some error!")
    }
  };

  const HandleAdd = () => {
    setShowForm(true);
    setcheck(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', articleTitle);
    formData.append('url', articleUrl);
    formData.append('content', articleContent);
  
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/add', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      toast.success(data.message)
      setIsLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error submitting form!")
    } finally {
      setIsLoading(false);
    }

    // Clear form fields after submission
    setArticleTitle('');
    setArticleUrl('');
    setArticleContent('');
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };


  return (
    <div className="search-container">
      <img src="logo_nust.svg" alt="Logo" className="logo" />
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
        <form className='form1' onSubmit={handleSubmitForm}> 
          <label className='lb' htmlFor="articleTitle">Article Title</label>
          <input
            className='inp'
            type="text"
            id="articleTitle"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)} 
          />
 
          <label className='lb' htmlFor="articleUrl">Article URL</label>
          <input
          className='inp'
            type="url"
            id="articleUrl"
            value={articleUrl}
            onChange={(e) => setArticleUrl(e.target.value)} 
          />
 
          <label className='lb'  htmlFor="articleContent">Article Content</label>
          <textarea
            className='txt'
            id="articleContent"
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)} 
          ></textarea> 
          <label className='lb' htmlFor="jsonFile">Select JSON File</label>
          <input
            type="file"
            id="jsonFile"
            accept=".json"
            onChange={handleFileChange}
          />

          

          <button className='btn'  type="submit">Submit</button>
        </form>
      )}

      {(results.titles && results.titles.length > 0 && !check) && (
        <div className="search-results-container">
          <h1 className="search-results-heading">Search Results</h1>
          <p className='time-cont'> {results.titles.length} results found in {time}s</p>
          <hr/>
          <ul className="search-results-list">
          {results.titles.slice(0, Math.min(results.titles.length, 500)).map((title, index)=> (
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

      {check && 
      <ImageDisplay imgSrc={imageSrc} />} 
    </div>
  );
}

export default Search