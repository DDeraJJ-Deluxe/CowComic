import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you are using axios for the API request
import '../css/survey.css';

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

  const handleSubmit = async () => {
    if (genres.length === 0 || !keyword || !ageRating || !publishDate || !pageCount) {
      setError('Please fill out all fields.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Assuming you have an API endpoint for the recommendation
      const response = await axios.post('API KEY HERE', {
        genres,
        keyword,
        ageRating,
        publishDate,
        pageCount
      });
      
      setRecommendation(response.data.recommendation);
    } catch (err) {
      setError('Error fetching the recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="survey-container">
      <h2>Book Survey Component</h2>

      {/* Genres */}
      <label>Genres: **</label>
      <div className="genres">

        {['Adventure', 'Fantasy', 'Mystery', 'Sci-Fi', 'Romance', 'Horror', 'Historical', 'Biography', 'Fiction', 'Non-Fiction', 'Comedy', 'Drama'].map((genre) => (
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
        <label>
          <input
            type="radio"
            name="age-rating"
            value="5-12"
            onChange={(e) => setAgeRating(e.target.value)}
          /> 5 - 12 yr old
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="age-rating"
            value="13-18"
            onChange={(e) => setAgeRating(e.target.value)}
          /> 13 - 18 yr old
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="age-rating"
            value="18+"
            onChange={(e) => setAgeRating(e.target.value)}
          /> 18+ yr old
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="age-rating"
            value="no-preference"
            onChange={(e) => setAgeRating(e.target.value)}
          /> No age preference
        </label>
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
