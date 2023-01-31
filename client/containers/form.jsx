import React from 'react';

/* -- FORM CONTAINER -- */
const Form = (props) => {
  // destrcture props
  const { 
    activities,
    types, 
    difficulties, 
    selectedActivity, 
    selectedType, 
    handleFormChange, 
    handleFormSubmit 
  } = props;

  // create dropdown list options for activities dropdown
  const activitiesList = activities.map(activity => {
    return (
      <option id={`activity-${activity._id}`} key={activity._id} value={activity.activity}>{activity.activity}</option>
    );
  })

  activitiesList.unshift(<option selected disabled hidden id="activity-0" key="0" value={null}>What mountain did you climb today?</option>);

  // create dropdown list options for types dropdown & set convention
  const typesList = types
    .filter(type => {
      return type.activity === selectedActivity;
    })
    .map(type => {
      return (
        <option id={`type-${type._id}`} key={type._id} value={type.type}>{type.type}</option>
      );
    });

  typesList.unshift(<option selected disabled hidden id="type-0" key="0" value={null}>Type</option>);

  const convention = types.reduce((acc, type) => {
    if (type.type === selectedType) return type.convention
    return acc;
  }, null);

  // create dropdown list options for difficulties dropdown
  const difficultiesList = difficulties
    .filter(difficulty => {
      return difficulty.type === selectedType;
    })
    .map(difficulty => {
      return (
        <option id={`difficulty-${difficulty._id}`} key={difficulty._id} value={difficulty.difficulty}>{difficulty.difficulty}</option>
      );
    })
  difficultiesList.unshift(<option selected disabled hidden id="difficulty-0" key="0" value={null}>Difficulty</option>);

  // render component
  return (
    <div id="form-container">
      <form>
        <div id="activity-container">
          {/* <label htmlFor="activity">What mountains did you climb today?</label> */}
          <select id="activity" name="activity" onChange={handleFormChange}>
            {activitiesList}
          </select>
        </div>

        <div className="route-countainer">
          <div className="route-container-row">
            {/* <label htmlFor="type">Type</label> */}
            <select id="type" name="type" onChange={handleFormChange}>
              {typesList}
            </select>

            {/* <label htmlFor="route">{convention}</label> */}
            <input type="text" id="route" name="route" placeholder={convention} onChange={handleFormChange} />

            {/* <label htmlFor="difficulty">Difficulty</label> */}
            <select id="difficulty" name="difficulty" onChange={handleFormChange}>
              {difficultiesList}
            </select>

            {/* <label htmlFor="rating">Rating</label> */}
            <select id="rating" name="rating" onChange={handleFormChange}>
              <option></option>
              <option selected disabled hidden value={null}>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
         
          <div className="route-container-row">
            {/* <label htmlFor="location">Location</label> */}
            <input type="text" id="location" name="location" placeholder="Location" onChange={handleFormChange} />

            {/* <label htmlFor="region">State/Region</label> */}
            <input type="text" id="region" name="region" placeholder="Region" onChange={handleFormChange} />

            {/* <label htmlFor="country">Country</label> */}
            <input type="text" id="country" name="country" placeholder="Country" onChange={handleFormChange} />
          </div>
        </div>

        <div id="entry-container">
          <div id="dates">
            <label htmlFor="start-date">Start Date</label>
            <input type="date" id="start-date" name="start-date" placeholder="test" onChange={handleFormChange} />

            <label htmlFor="end-date">End Date</label>
            <input type="date" id="end-date" name="end-date" onChange={handleFormChange} />
          </div>

          <div id="note-container">
            {/* <label htmlFor="note">Notes</label> */}
            <textarea id='note' name='note' placeholder="Scribbles..." onChange={handleFormChange}></textarea>
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
