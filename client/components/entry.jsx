import React from 'react';

/* -- ENTRY COMPONENT -- */
const Entry= (props) => {
  const { 
    id, 
    startYear, 
    startMonth, 
    startDay, 
    endYear, 
    endMonth, 
    endDay, 
    activity, 
    type, 
    route, 
    difficulty, 
    rating, 
    location, 
    region, 
    country, 
    note, 
    timestamp 
  } = props;

  return (
    <div id={`entry-item-${id}`} className="entry-item">
      <div className="entry-item-start-month-year-container">
        <span className="entry-item-start-month">{startMonth}</span>
        <span className="entry-item-start-year">{startYear}</span>
      </div>

      <div className="entry-item-start-day-container">
        <span>{startDay}</span>
      </div>

      <div className="entry-item-row1">
        <h1>{activity}</h1>
        <h2>{`${location} - ${region}, ${country}`}</h2>
        <h3>{`${route} - ${type} (${difficulty}) ${rating}/5`}</h3>
      </div>

      <div className="entry-item-end-month-year-container">
        <span className="entry-item-start-month">{endMonth}</span>
        <span className="entry-item-start-year">{endYear}</span>
      </div>

      <div className="entry-item-end-day-container">
        <span>{endDay}</span>
      </div>

      <div className="entry-item-row2">
        <p>{note}</p>
        <small>{`Posted on ${timestamp}`}</small>
      </div>

      <hr className="entry-item-divider" />
    </div>
  );
}

export default Entry;
