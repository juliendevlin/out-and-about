import React from 'react';

/* -- FORM CONTAINER -- */
const Form = (props) => {
  // Destructure drilled props: dropdown options, controlled form component values, handlers
  const { 
    activities,
    types, 
    difficulties, 
    selectedActivity, 
    selectedType,
    selectedDifficulty,
    currentRoute,
    selectedRating,
    currentLocation,
    currentRegion,
    currentCountry,
    selectedStartDate,
    selectedEndDate,
    currentNote,
    handleFormChange, 
    handleFormSubmit,
    displayMainForm,
    purpose,
    handleStarHover,
    starHover
  } = props;

  // Create dropdown options for activities, types and difficulties based on state values
  const activitiesList = activities.map(activity => {
    return (
      <option key={activity._id} value={activity._id}>{activity.activity}</option>
    );
  })

  const typesList = types.filter(type => type.activity_id === Number(selectedActivity))
    .map(type => {
      return (
        <option key={type._id} value={type._id}>{type.type}</option>
      );
    });

  const difficultiesList = difficulties.filter(difficulty => difficulty.type_id === Number(selectedType))
    .map(difficulty => {
      return (
        <option key={difficulty._id} value={difficulty._id}>{difficulty.difficulty}</option>
      );
    })

  // Set placeholder value for route field of form based on the currently selected type
  let convention; 
  if (types[0]) convention = types.filter(type => type._id === Number(selectedType))[0].convention;

  const displayStyle = {
    maxHeight: displayMainForm ? '475px' : '0px',
    backgroundColor: purpose === 'main' ? '#e8e0d5' : 'rgb(244,242,237)'
  }

  const submitText = purpose === 'main' ? 'LOG' : 'FIX';

  // set up star ratings for form
  let starRating = [];
  for (let i = 1; i <= 5; i++) {
    starRating.push(
      <svg
        key={i}
        id={`star-${i}`}
        className="form-star"
        onClick={handleFormChange}
        onMouseEnter={handleStarHover}
        onMouseLeave={handleStarHover}
        width="25px" 
        height="25px" 
        viewBox="5 5 58 58" 
        fill={starHover >= i || selectedRating >= i ? "rgb(31,81,63)" : "rgb(150,150,150)"}
      >
        <path d="M32.001,9.188l5.666,17.438l18.335,0l-14.833,10.777l5.666,17.438l-14.834,-10.777l-14.833,10.777l5.666,-17.438l-14.834,-10.777l18.335,0l5.666,-17.438Z"/>
      </svg>
    );
  }

  if (selectedRating !== 0) starRating.push(
    <span key="clear" id="star-clear" className="form-star-clear" onClick={handleFormChange}>Clear</span>
  );

  // Render component with dropdown lists, controlled form component values and handlers
  return (
    <div className="form-container" style={displayStyle}>
      <form>
        
        <div className="form-row">
          <svg className="addRowButton" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H13V4Z" fill="rgb(31, 125, 63)" />
          </svg>

          <input 
            className="form-input form-location" 
            type="text" 
            name="location" 
            placeholder="Location" 
            value={currentLocation} 
            onChange={handleFormChange} 
            autoComplete="off"
          />

          <input 
            className="form-input form-region" 
            type="text" 
            name="region" 
            placeholder="Region" 
            value={currentRegion} 
            onChange={handleFormChange}
            autoComplete="off"
          />

          <input 
            className="form-input form-country" 
            type="text" 
            name="country" 
            placeholder="Country" 
            value={currentCountry} 
            onChange={handleFormChange}
            autoComplete="off"
          />
        </div>

        <div className="small-gap"></div>

        <div className='route-row'>
          <div className="form-row">
            <svg className="addRowButton" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H13V4Z" fill="rgb(31, 125, 63)" />
            </svg>

            <select className="form-input form-activity" name="activity" value={selectedActivity} onChange={handleFormChange}>
              {activitiesList}
            </select>

            <select className="form-input form-type" name="type" value={selectedType} onChange={handleFormChange}>
                {typesList}
            </select>

            <input 
              className="form-input form-route" 
              type="text"  
              name="route" 
              placeholder={convention} 
              value={currentRoute} 
              onChange={handleFormChange} 
              autoComplete="off"
            />
          </div>
        
          <div className="form-row form-row-rating">
            <select className="form-input form-difficulty"  name="difficulty" value={selectedDifficulty} onChange={handleFormChange}>
              {difficultiesList}
            </select>

            {starRating}
          </div>
        </div>

        <div className="big-gap"></div>

        <div className="form-row">
          <label htmlFor="start-date">Start Date</label>
          <input 
            type="date" 
            className="form-input form-start-date" 
            name="start-date" 
            value={selectedStartDate} 
            onChange={handleFormChange} 
          />

          <label htmlFor="end-date">End Date</label>
          <input 
            type="date" 
            className="form-input form-end-date" 
            name="end-date" 
            value={selectedEndDate} 
            onChange={handleFormChange} 
          />
        </div>

        <textarea 
          className='form-row form-input form-note' 
          name='note' 
          placeholder="Scribbles..." 
          value={currentNote} 
          onChange={handleFormChange}>
        </textarea>
        {/* <input className="test" type="file" accept="image/*"></input> */}
        <div className="form-submit-container">
          <button className="form-submit" onClick={handleFormSubmit}>
            <img src="./assets/plus.svg" width="18px"/>
            {submitText}
          </button>
        </div>

      </form>
    </div>
  );
}

export default Form;
