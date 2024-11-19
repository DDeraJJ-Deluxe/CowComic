import React, { useState, useEffect } from 'react';
import axios from "axios"; // using axios for the API request
import '../css/survey.css';// CSS for styling



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
    return `Recommend me a book with the following genres: ${genres.join(', ')}

    Please also consider:
    - Keyword: "${keyword}"
    - Age Rating: "${ageRating}"
    - Publish Date: "${publishDate}"
    - Page Count: "${pageCount}"
    
    Only give me one book recommendation with the book title, author, age rating, and the country it is published in.`;
  };


    // Handles form submission and API request
  const handleSubmit = async () => {
    if (genres.length === 0 || !keyword || !ageRating || !publishDate || !pageCount) {
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
        setRecommendation(response.data.choices[0].message.content);
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
      <h2>Book Survey Component</h2>
      

      {/* Genres Section */}
      <label>Genres: </label>
      <div className="genres">

        {['Adventure', 'Fantasy', 'Mystery', 'Science Fiction', 'Romance', 'Horror',
    'Thriller', 'Comedy', 'Drama', 'Historical Fiction', 'Biography', 'Memoir',
    'Self-Help', 'Science', 'Psychology', 'Philosophy', 'True Crime', 'Politics',
    'History', 'Travel', 'Health & Wellness', 'Dystopian', 'Urban Fantasy',
    'Paranormal Romance', 'New Adult', 'Dark Fantasy',
    'Cozy Mystery', 'Techno-Thriller', 'Eco-Fiction', 'Cli-Fi', 'African Literature',
    'Asian Literature', 'Middle Eastern Literature', 'Latin American Literature',
    'Indigenous Stories', 'European Classics', 'Afro-Futurism', 'War Stories',
    'Survival Stories', 'Coming-of-Age', 'Family Saga', 'Feminist Literature',
    'LGBTQ+', 'Inspirational', 'Gothic', 'Magical Realism', 'Cyberpunk', 
    'Steampunk', 'Space Opera', 'High Fantasy', 'Low Fantasy', 'Hard Science Fiction',
    'Speculative Fiction', 'Poetry', 'Epic Poetry', 'Haiku', 'Sonnets', 'Lyric Poetry',
    'Essays', 'Personal Narratives', 'Satire', 'Parody', 'Political Humor', 
    'Absurdist Fiction', 'Sports Fiction', 'Detective Stories', 'Noir', 
    'Literary Fiction', 'Experimental Fiction', 'Epistolary Novels', 
    'Short Stories', 'Anthologies'].map((genre) => (
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
        <option value="less-100">&lt; 100 pages</option>
        <option value="100-300">100 - 300 pages</option>
        <option value="300+">&gt; 300 pages</option>
      </select>

      {/* Submit Button */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {error && <p className="error-message">{error}</p>}
      {recommendation && <p className="recommendation-message">{recommendation}</p>}
    </div>
  );
}

export default Survey;
