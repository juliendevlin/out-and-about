import React from 'react';
import Entry from '../components/entry.jsx';
import ConfirmDeletePrompt from '../components/confirm-delete-prompt.jsx';
import ConfirmUpdatePrompt from '../components/confirm-update-prompt.jsx';

const Entries = (props) => {
  // Destructure entries from state
  const { 
    entries,
    confirmDelete,
    handleConfirmDelete, 
    handleEntryDelete,
    confirmUpdate,
    handleConfirmUpdate,
    activities,
    types,
    difficulties,
    selectedActivityForUpdate,
    selectedTypeForUpdate,
    selectedDifficultyForUpdate,
    currentRouteForUpdate,
    selectedRatingForUpdate,
    currentLocationForUpdate,
    currentRegionForUpdate,
    currentCountryForUpdate,
    selectedStartDateForUpdate,
    selectedEndDateForUpdate,
    currentNoteForUpdate,
    handleUpdateFormChange,
    handleEntryUpdate
  } = props;

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
        handleConfirmUpdate={handleConfirmUpdate}
        handleConfirmDelete={handleConfirmDelete}
      />
    );
  });

  // render entry items
  return(
    <div id="entry-item-container">
      {entryItemList}
      <ConfirmUpdatePrompt
        confirmUpdate={confirmUpdate}
        handleConfirmUpdate={handleConfirmUpdate}
        activities={activities}
        types={types}
        difficulties={difficulties}
        selectedActivityForUpdate={selectedActivityForUpdate}
        selectedTypeForUpdate={selectedTypeForUpdate}
        selectedDifficultyForUpdate={selectedDifficultyForUpdate}
        currentRouteForUpdate={currentRouteForUpdate}
        selectedRatingForUpdate={selectedRatingForUpdate}
        currentLocationForUpdate={currentLocationForUpdate}
        currentRegionForUpdate={currentRegionForUpdate}
        currentCountryForUpdate={currentCountryForUpdate}
        selectedStartDateForUpdate={selectedStartDateForUpdate}
        selectedEndDateForUpdate={selectedEndDateForUpdate}
        currentNoteForUpdate={currentNoteForUpdate}
        handleUpdateFormChange={handleUpdateFormChange}
        handleEntryUpdate={handleEntryUpdate}
      />
      <ConfirmDeletePrompt
        confirmDelete={confirmDelete}
        handleConfirmDelete={handleConfirmDelete}
        handleEntryDelete={handleEntryDelete}
      />
    </div>
  );
}

export default Entries;
