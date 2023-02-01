import React from 'react';
import Entry from '../components/entry.jsx'

/* -- ENTRIES CONTAINER -- */
const Entries = (props) => {
  // Destructure entries from state
  const { entries, handleEntryDelete } = props;

  // Intialize variables to track date from previous iteration when creating list
  let previousStartMonth = null;

  // Create list of entry items
  const entryItemList = entries.map(entry => {
    // convert dates to date objects
    const startDate = new Date(entry.start_date);
    const timestamp = new Date(entry.post_date).toLocaleString();
    let endDate;
    if (entry.end_date !== null) endDate = new Date(entry.end_date);

    // set boolean prop for whether the start month should be displayed on an entry or not
    let displayStartMonth;
    const currentStartMonth = startDate.getMonth()
    if (previousStartMonth === null || previousStartMonth !== currentStartMonth) {
      displayStartMonth = true;
      previousStartMonth = currentStartMonth;
    }
    else {
      displayStartMonth = false;
      previousStartMonth = currentStartMonth;
    }
    
    return (
      <Entry
        id={entry.entry_id}
        key={entry.entry_id}
        startYear={startDate.toLocaleString('default', { year: 'numeric' })}
        startMonth={startDate.toLocaleString('default', { month: 'short' }).toUpperCase()}
        startDay={startDate.toLocaleString('default', { day: 'numeric' })}
        endYear={endDate ? endDate.toLocaleString('default', { year: 'numeric' }) : null}
        endMonth={endDate ? endDate.toLocaleString('default', { month: 'short' }).toUpperCase() : null}
        endDay={endDate ? endDate.toLocaleString('default', { day: 'numeric' }) : null}
        activity={entry.activity}
        type={entry.type}
        route={entry.route}
        difficulty={entry.difficulty}
        rating={entry.rating}
        location={entry.location}
        region={entry.region}
        country={entry.country}
        note={entry.note}
        timestamp={timestamp}
        displayStartMonth={displayStartMonth}
        handleEntryDelete={handleEntryDelete}
      />
    );
  });

  // render entry items
  return(
    <div id="entry-item-container">
      {entryItemList}
    </div>
  );
}

export default Entries;

// dates
  // declare previous start date var outside of loop
  // declare displayMonth var outside of loop
  // if previous start date's month === current start date's month set displayMonth to flase
  // otherwise set to true

  // in component add class that displays svg conditionally