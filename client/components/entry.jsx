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
    timestamp,
    // displayStartMonth,
    displayFirstMonth,
    displayLastMonth,
    handleConfirmUpdate,
    handleConfirmDelete
  } = props;

  return (
    <div className="entry">
      {/* <div className={displayStartMonth ? "entry-start-container month-banner-start" : "entry-item-start-container"}>
        <span className="entry-start-month">{displayStartMonth ? startMonth : null}</span>
        <span className="entry-start-year">{displayStartMonth ? startYear : null}</span>
      </div>

      <div className="entry-start-day">
        <span>{startDay}</span>
      </div> */}

      <div className={displayFirstMonth ? "entry-start-container month-banner-start" : "entry-item-start-container"}>
        <span className="entry-start-month">{
          displayFirstMonth 
            ? endMonth
              ? endMonth
              : startMonth 
            : null
          }</span>
        <span className="entry-start-year">{
          displayFirstMonth 
            ? endYear
              ? endYear
              : startYear
            : null
        }</span>
      </div>

      <div className="entry-start-day">
        <span>{endDay ? endDay : startDay}</span>
      </div>

      <div className="entry-header">
        <h1>{`${location} - ${region}, ${country}`}</h1>
        <h2>{activity}</h2>
        <h3>{`${route} - ${type} (${difficulty}) ${rating}/5`}</h3>
      </div>

      {/* <div className={endMonth !== null ? "entry-end-container month-banner-end" : "entry-end-container"}>
        <span className="entry-end-month">{endMonth}</span>
        <span className="entry-end-year">{endYear}</span>
      </div>

      <div className="entry-end-day">
        <span>{endDay}</span>
      </div> */}

      <div className={displayLastMonth ? "entry-end-container month-banner-end" : "entry-end-container"}>
        <span className="entry-end-month">{displayLastMonth ? startMonth : null}</span>
        <span className="entry-end-year">{displayLastMonth ? startYear : null}</span>
      </div>

      <div className="entry-end-day">
        <span>{endDay ? startDay : endDay}</span>
      </div>

      <div className="entry-content">
        <p>{note}</p>
        <small>{`Posted on ${timestamp}`}</small>
      </div>

      <button className="entry-buttons entry-edit" onClick={() => handleConfirmUpdate(id)}>
        <svg fill="rgb(64,64,64)" height="20px" width="20px" viewBox="0 0 306.637 306.637">
          <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
            l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"/>
          <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
            L265.13,75.602L231.035,41.507z"/>
        </svg>
      </button>

      <button className="entry-buttons entry-delete" onClick={() => handleConfirmDelete(id)}>
        <svg fill="rgb(84,84,84)" width="20px" height="20px" viewBox="0 0 485 485">
          <rect x="67.224" width="350.535" height="71.81"/>
          <path d="M417.776,92.829H67.237V485h350.537V92.829H417.776z M165.402,431.447h-28.362V146.383h28.362V431.447z M256.689,431.447
            h-28.363V146.383h28.363V431.447z M347.97,431.447h-28.361V146.383h28.361V431.447z"/>
        </svg>
      </button>
    </div>
  );
}

export default Entry;
