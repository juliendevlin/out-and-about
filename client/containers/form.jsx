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
    handleFormSubmit 
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

  // Render component with dropdown lists, controlled form component values and handlers
  return (
    <div id="form-container">
      <form>
        <div id="activity-container">
          <select id="activity" name="activity" value={selectedActivity} onChange={handleFormChange}>
            {activitiesList}
          </select>
        </div>

        <div className="route-countainer">
          <div className="route-container-row">
            <select id="type" name="type" value={selectedType} onChange={handleFormChange}>
              {typesList}
            </select>

            <input type="text" id="route" name="route" placeholder={convention} value={currentRoute} onChange={handleFormChange} />

            <select id="difficulty" name="difficulty" value={selectedDifficulty} onChange={handleFormChange}>
              {difficultiesList}
            </select>

            <select id="rating" name="rating" value={selectedRating} onChange={handleFormChange}>
              <option value="0">No rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
         
          <div className="route-container-row">
            <input type="text" id="location" name="location" placeholder="Location" value={currentLocation} onChange={handleFormChange} />
            <input type="text" id="region" name="region" placeholder="Region" value={currentRegion} onChange={handleFormChange} />
            <input type="text" id="country" name="country" placeholder="Country" value={currentCountry} onChange={handleFormChange} />
          </div>
        </div>

        <div id="entry-container">
          <div id="dates">
            <label htmlFor="start-date">Start Date</label>
            <input type="date" id="start-date" name="start-date" value={selectedStartDate} onChange={handleFormChange} />

            <label htmlFor="end-date">End Date</label>
            <input type="date" id="end-date" name="end-date" value={selectedEndDate} onChange={handleFormChange} />
          </div>

          <div id="note-container">
            <textarea id='note' name='note' placeholder="Scribbles..." value={currentNote} onChange={handleFormChange}></textarea>
          </div>

          <div>
            <button onClick={handleFormSubmit}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
