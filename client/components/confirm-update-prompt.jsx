import React from 'react';
import Form from '../containers/form.jsx'

const ConfirmUpdatePrompt = (props) => {
  const {
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

  const displayStyle = {
    display: confirmUpdate ? 'flex' : 'none'
  }

  const form = confirmUpdate 
    ? <Form
        activities={activities}
        types={types}
        difficulties={difficulties}
        selectedActivity={selectedActivityForUpdate}
        selectedType={selectedTypeForUpdate}
        selectedDifficulty={selectedDifficultyForUpdate}
        currentRoute={currentRouteForUpdate}
        selectedRating={selectedRatingForUpdate}
        currentLocation={currentLocationForUpdate}
        currentRegion={currentRegionForUpdate}
        currentCountry={currentCountryForUpdate}
        selectedStartDate={selectedStartDateForUpdate}
        selectedEndDate={selectedEndDateForUpdate}
        currentNote={currentNoteForUpdate}
        handleFormChange={handleUpdateFormChange}
        handleFormSubmit={handleEntryUpdate}
      />
    : null

  return (
    <div className="prompt-bg" style={displayStyle}>
      <div className="prompt" style={displayStyle}>
        <button onClick={() => handleConfirmUpdate(false)}>Nevermind</button>
        {form}
      </div>
    </div>
  );
}

export default ConfirmUpdatePrompt;
