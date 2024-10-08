import '../css/survey.css';

// this component creates the book rec survey
function Survey() {
  return (
    <div className="survey-container">
      <h2>Book Survey Component</h2>

      {/* Genres */}
      <label>Genres: **</label>
      <div className="genres">
        <div className="genre-box"></div>
        <div className="genre-box"></div>
        <div className="genre-box"></div>
        <div className="genre-box"></div>
        <div className="genre-box"></div>
      </div>

      {/* Keyword */}
      <label htmlFor="keyword">Keyword:</label>
      <input type="text" id="keyword" name="keyword" />

      {/* Age Rating */}
      <div className="age-rating">
        <label>Age Rating:</label>
        <label>
          <input type="radio" name="age-rating" value="5-12" /> 5 - 12 yr old
        </label><br />
        <label>
          <input type="radio" name="age-rating" value="13-18" /> 13 - 18 yr old
        </label><br />
        <label>
          <input type="radio" name="age-rating" value="18+" /> 18+ yr old
        </label><br />
        <label>
          <input type="radio" name="age-rating" value="no-preference" /> No age preference
        </label>
      </div>

      {/* Publish Date */}
      <label htmlFor="publish-date">Publish Date:</label>
      <select id="publish-date" name="publish-date">
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="older">Older</option>
      </select>

      {/* Page Count */}
      <label htmlFor="page-count">Page Count:</label>
      <select id="page-count" name="page-count">
        <option value="less-100">&lt; 100 pages</option>
        <option value="100-300">100 - 300 pages</option>
        <option value="300+">&gt; 300 pages</option>
      </select>
    </div>
  );
}

export default Survey;
