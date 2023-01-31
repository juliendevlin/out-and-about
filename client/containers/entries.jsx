import React from 'react';
import Entry from '../components/entry.jsx'

/* -- ENTRIES CONTAINER -- */
const Entries = (props) => {
  // destructure entries list prop
  const { entries } = props;

  // create list of entry items
  const entryItemList = entries.map(entry => {
    const startDate = new Date(entry.start_date);
    const timestamp = new Date(entry.post_date).toLocaleString();

    let endDate;
    if (entry.end_date !== null) endDate = new Date(entry.end_date);
    
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
