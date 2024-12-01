import React, { useState, useEffect } from 'react';
import axios from "axios"; // using axios for the API request
import '../css/survey.css';// CSS for styling
import logo from '../assets/cclogo.png';

function Survey() {
  const [genres, setGenres] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [ageRating, setAgeRating] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenreClick = (genre) => {
    setGenres(prevGenres =>
      prevGenres.includes(genre) ? prevGenres.filter(g => g !== genre) : [...prevGenres, genre]
    );
  };

  // Generate the prompt for the API
  const generatePrompt = () => {
    return `Recommend me a book with:
    - Genres: ${genres.join(', ')}
    - Keyword: "${keyword}"
    - Age Rating: "${ageRating}"
    - Publish Date: "${publishDate}"
    - Page Count: "${pageCount}"
  
    Respond in JSON format:
    {"title": "Book Title",
      "author": "Author Name",
      "ageRating": "Age Rating",
      "countryPublished": "Country Published",
      "summary": "A 2-3 sentence summary of the book"}`;
  };

  // Handles form submission and API request
  const handleSubmit = async () => {
    if (genres.length === 0 || !keyword || !ageRating || publishDate === '' || pageCount === '') {
      setError('Please fill out all fields.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      if (!API_KEY) {
        throw new Error("API key is missing or not loaded correctly.");
      }
      // Generate the prompt
      const prompt = generatePrompt();
      
      // Send API request
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',  // Correct endpoint for chat-based models
        {
          model: 'gpt-3.5-turbo',  // Use the model you want (can also use 'gpt-4' or other models)
          messages: [
            { role: 'system', content: 'You are a book recommendation assistant.' },
            { role: 'user', content: prompt },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`, //Authorization header with API key
          },
        }
      );
      
      if (response.data && response.data.choices && response.data.choices[0]) {
        const content = response.data.choices[0].message.content;
        console.log("API response: ", content);
        const parsedRecommendation= JSON.parse(content);
        setRecommendation(parsedRecommendation);

        // if (onSaveRecommendation) {
        //   onSaveRecommendation(parsedRecommendation);
        // }
      } else {
        throw new Error('Unexpected API response format.');
      }

    } catch (err) {
      setError('Error fetching the recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="survey-container">
      
      {/* Logo Section */}
      <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
      </div>
      
      <h2 className="survey-title">Book Survey</h2>

      {/* Genres Section */}
      <label>Genres: </label>
      <div className="genres">

        {['Adventure', 'Biography', 'Comedy', 'Drama', 'Fantasy', 'Fiction', 'Historical', 'Horror',
        'Mystery', 'Non-Fiction', 'Romance', 'Science-Fiction','Crime','Psychology', 'Satire'].map((genre) => (
          <div
            key={genre}
            className={`genre-box ${genres.includes(genre) ? 'selected' : ''}`}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Keyword */}
      <label htmlFor="keyword">Keyword:</label>
      <input
        type="text"
        id="keyword"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* Age Rating */}
      <div className="age-rating">
        <label>Age Rating:</label>
        {['5-12', '13-18', '18+', 'no-preference'].map((age) => (
          <label key={age}>
            <input
              type="radio"
              name="age-rating"
              value={age}
              onChange={(e) => setAgeRating(e.target.value)}
            /> {age === 'no-preference' ? 'No age preference' : `${age} year old`}
          </label>
        ))}
      </div>
      

      {/* Publish Date */}
      <label htmlFor="publish-date">Publish Date:</label>
      <select
        id="publish-date"
        name="publish-date"
        value={publishDate}
        onChange={(e) => setPublishDate(e.target.value)}
      >
        <option value="">Select a publish date</option> {/* Placeholder */}
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="older">Older</option>
      </select>

      {/* Page Count */}
      <label htmlFor="page-count">Page Count:</label>
      <select
        id="page-count"
        name="page-count"
        value={pageCount}
        onChange={(e) => setPageCount(e.target.value)}
      >
        <option value="">Select a page count</option> {/* Placeholder */}
        <option value="less-100">&lt; 100 pages</option>
        <option value="100-300">100 - 300 pages</option>
        <option value="300+">&gt; 300 pages</option>
      </select>

      {/* Submit Button */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {error && <p className="error-message">{error}</p>}
      
      {/* {recommendation && (<div className="recommendation-message">
        {recommendation.split('\n').map((line, index) => (<p key={index}>{line}</p>))}
      </div>
      )} */}

      {recommendation && (
        <div className="recommendation-message">
        <h3>Recommended Book:</h3>
        <p><strong>Title:</strong> {recommendation.title}</p>
        <p><strong>Author:</strong> {recommendation.author}</p>
        <p><strong>Age Rating:</strong> {recommendation.ageRating}</p>
        <p><strong>Country Published:</strong> {recommendation.countryPublished}</p>
        <p><strong>Summary:</strong> {recommendation.summary}</p>
      </div>
    )}


    </div>
  );
}

export default Survey;
