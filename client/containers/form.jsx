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
    purpose
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
    // display: displayMainForm ? 'block' : 'none',
    maxHeight: displayMainForm ? '475px' : '0px',
    backgroundColor: purpose === 'main' ? '#e8e0d5' : 'rgb(244,242,237)'
  }

  const submitText = purpose === 'main' ? 'LOG' : 'FIX';

  // Render component with dropdown lists, controlled form component values and handlers
  return (
    <div className="form-container" style={displayStyle}>
      <form>
        
        <div className="form-row">
          <input 
            className="form-input form-location" 
            type="text" 
            name="location" 
            placeholder="Location" 
            value={currentLocation} 
            onChange={handleFormChange} 
          />

          <input 
            className="form-input form-region" 
            type="text" 
            name="region" 
            placeholder="Region" 
            value={currentRegion} 
            onChange={handleFormChange} 
          />

          <input 
            className="form-input form-country" 
            type="text" 
            name="country" 
            placeholder="Country" 
            value={currentCountry} 
            onChange={handleFormChange} 
          />
        </div>

        <div className="small-gap"></div>

        <div className="form-row">
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
          />
        </div>

        <div className="form-row">
          <select className="form-input form-difficulty"  name="difficulty" value={selectedDifficulty} onChange={handleFormChange}>
            {difficultiesList}
          </select>

          <select className="form-input form-rating"  name="rating" value={selectedRating} onChange={handleFormChange}>
            <option value="0">No rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
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
