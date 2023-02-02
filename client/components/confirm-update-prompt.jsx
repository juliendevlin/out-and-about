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
        displayMainForm={true}
        purpose="update"
      />
    : null

  return (
    <div className="prompt-bg" style={displayStyle}>
      <div className="prompt" style={displayStyle}>
        <svg className="cancel" onClick={() => handleConfirmUpdate(false)} width="40px" height="40" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>
        </svg>
        {/* <img className="cancel" src="./assets/x.svg" width="40px" onClick={() => handleConfirmUpdate(false)} /> */}
        {form}
      </div>
    </div>
  );
}

export default ConfirmUpdatePrompt;
