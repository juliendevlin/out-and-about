import React, {useState, useEffect} from 'react';
import Header from './containers/header.jsx';
import Form from './containers/form.jsx';
import Entries from './containers/entries.jsx';

const App = () => {
  // State of existing entry records
  const [ entries, setEntries ] = useState([]);

  // State of form dropdown options
  const [ activities, setActivities ] = useState([]);
  const [ types, setTypes ] = useState([]);
  const [ difficulties, setDifficulties ] = useState([]);

  // State of controlled main form component
  const [ selectedActivity, setSelectedActivity ] = useState('');
  const [ selectedType, setSelectedType ] = useState('');
  const [ selectedDifficulty, setSelectedDifficulty ] = useState('');
  const [ currentRoute, setCurrentRoute ] = useState('');
  const [ selectedRating, setSelectedRating ] = useState(0);
  const [ currentLocation, setCurrentLocation ] = useState('');
  const [ currentRegion, setCurrentRegion ] = useState('');
  const [ currentCountry, setCurrentCountry ] = useState('');
  const [ selectedStartDate, setSelectedStartDate ] = useState('');
  const [ selectedEndDate, setSelectedEndDate ] = useState('');
  const [ currentNote, setCurrentNote ] = useState('');
  const [ starHover, setStarHover ] = useState(0);

  // State of controlled update form component
  const [ selectedActivityForUpdate, setSelectedActivityForUpdate ] = useState('');
  const [ selectedTypeForUpdate, setSelectedTypeForUpdate ] = useState('');
  const [ selectedDifficultyForUpdate, setSelectedDifficultyForUpdate ] = useState('');
  const [ currentRouteForUpdate, setCurrentRouteForUpdate ] = useState('');
  const [ selectedRatingForUpdate, setSelectedRatingForUpdate ] = useState(0);
  const [ currentLocationForUpdate, setCurrentLocationForUpdate ] = useState('');
  const [ currentRegionForUpdate, setCurrentRegionForUpdate ] = useState('');
  const [ currentCountryForUpdate, setCurrentCountryForUpdate ] = useState('');
  const [ selectedStartDateForUpdate, setSelectedStartDateForUpdate ] = useState('');
  const [ selectedEndDateForUpdate, setSelectedEndDateForUpdate ] = useState('');
  const [ currentNoteForUpdate, setCurrentNoteForUpdate ] = useState('');

  // State of popup prompts
  const [ confirmDelete, setConfirmDelete ] = useState(false);
  const [ confirmUpdate, setConfirmUpdate ] = useState(false);
  const [ displayMainForm, setDisplayMainForm ] = useState(false);

  // Handler to update state of controlled main form component values
  const handleFormChange = (e) => {
    if (e.target.name === 'activity') {
      setSelectedActivity(Number(e.target.value));

      const defaultType = types.filter(type => type.activity_id === Number(e.target.value))[0]._id
      setSelectedType(defaultType)

      const defaultDifficulty = difficulties.filter(difficulty => difficulty.type_id === defaultType)[0]._id
      setSelectedDifficulty(defaultDifficulty)
    }
    if (e.target.name === 'type') {
      setSelectedType(Number(e.target.value));
      setSelectedDifficulty(difficulties.filter(difficulty => difficulty.type_id === Number(e.target.value))[0]._id)
    }
    if (e.target.name === 'difficulty') setSelectedDifficulty(Number(e.target.value));
    if (e.target.name === 'route') setCurrentRoute(e.target.value);
    if (e.target.name === 'location')setCurrentLocation(e.target.value);
    if (e.target.name === 'region') setCurrentRegion(e.target.value);
    if (e.target.name === 'country') setCurrentCountry(e.target.value);
    if (e.target.name === 'start-date') setSelectedStartDate(e.target.value);
    if (e.target.name === 'end-date') setSelectedEndDate(e.target.value);
    if (e.target.name === 'note') setCurrentNote(e.target.value);

    if (e.target.id === 'star-1') setSelectedRating(1);
    if (e.target.id === 'star-2') setSelectedRating(2);
    if (e.target.id === 'star-3') setSelectedRating(3);
    if (e.target.id === 'star-4') setSelectedRating(4);
    if (e.target.id === 'star-5') setSelectedRating(5);
    if (e.target.id === 'star-clear') setSelectedRating(0);
  }

  // Handler to submit controlled main form component values and create new entry record
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create http request body with controlled form component values
    const entryToCreate = {
      country: currentCountry,
      region: currentRegion,
      location: currentLocation,
      route: currentRoute,
      typeId: selectedType,
      difficultyId: selectedDifficulty,
      note: currentNote,
      startDate: selectedStartDate,
      endDate: selectedEndDate === '' ? null : selectedEndDate,
      rating: selectedRating
    }

    try {
      // Send POST request
      const response = await fetch('/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entryToCreate)
      });

      if (response.status !== 201) {
        // Throw an error if request is not successful
        const error = await response.json();
        throw new Error(error.message);
      }
      else {
        // If successful, add the created entry to the state of entry records in the correctly sorted position
        const createdEntry = await response.json();

        setEntries([...entries, ...createdEntry].sort((a, b) => {
          return new Date(b.start_date) - new Date(a.start_date)
        }));
      
        // Reset controlled form component values
        const defaultActivity = activities[0]._id
        setSelectedActivity(defaultActivity);

        const defaultType = types.filter(type => type.activity_id === defaultActivity)[0]._id
        setSelectedType(defaultType);

        const defaultDifficulty = difficulties.filter(difficulty => difficulty.type_id === defaultType)[0]._id
        setSelectedDifficulty(defaultDifficulty);

        setCurrentRoute('');
        setSelectedRating(0);
        setCurrentLocation('');
        setCurrentRegion('');
        setCurrentCountry('');
        setSelectedStartDate('');
        setSelectedEndDate('');
        setCurrentNote('');
      }
    }
    catch (err) {
      // Console log any caught errors
      console.log(err);
    }
  }

  // Handler to display prompt to confirm update
  const handleConfirmUpdate = (entryId) => {
    if (entryId) {
    const selectedEntryForUpdate = entries.filter(entry => entry.entry_id === entryId)[0];

    setSelectedActivityForUpdate(selectedEntryForUpdate.activity_id);
    setSelectedTypeForUpdate(selectedEntryForUpdate.type_id);
    setSelectedDifficultyForUpdate(selectedEntryForUpdate.difficulty_id);
    setCurrentRouteForUpdate(selectedEntryForUpdate.route);
    setSelectedRatingForUpdate(selectedEntryForUpdate.rating);
    setCurrentLocationForUpdate(selectedEntryForUpdate.location);
    setCurrentRegionForUpdate(selectedEntryForUpdate.region);
    setCurrentCountryForUpdate(selectedEntryForUpdate.country);
    setSelectedStartDateForUpdate(selectedEntryForUpdate.start_date.substring(0, 10));
    setSelectedEndDateForUpdate(selectedEntryForUpdate.end_date ? selectedEntryForUpdate.end_date.substring(0, 10) : '');
    setCurrentNoteForUpdate(selectedEntryForUpdate.note);
    }

    setConfirmUpdate(entryId);
  }

  // Handler to update state of controlled update form component values
  const handleUpdateFormChange = (e) => {
    if (e.target.name === 'activity') {
      setSelectedActivityForUpdate(Number(e.target.value));

      const defaultType = types.filter(type => type.activity_id === Number(e.target.value))[0]._id
      setSelectedTypeForUpdate(defaultType)

      const defaultDifficulty = difficulties.filter(difficulty => difficulty.type_id === defaultType)[0]._id
      setSelectedDifficultyForUpdate(defaultDifficulty)
    }
    if (e.target.name === 'type') {
      setSelectedTypeForUpdate(Number(e.target.value));
      setSelectedDifficultyForUpdate(difficulties.filter(difficulty => difficulty.type_id === Number(e.target.value))[0]._id)
    }
    if (e.target.name === 'difficulty') setSelectedDifficultyForUpdate(Number(e.target.value));
    if (e.target.name === 'route') setCurrentRouteForUpdate(e.target.value);
    if (e.target.name === 'location')setCurrentLocationForUpdate(e.target.value);
    if (e.target.name === 'region') setCurrentRegionForUpdate(e.target.value);
    if (e.target.name === 'country') setCurrentCountryForUpdate(e.target.value);
    if (e.target.name === 'start-date') setSelectedStartDateForUpdate(e.target.value);
    if (e.target.name === 'end-date') setSelectedEndDateForUpdate(e.target.value);
    if (e.target.name === 'note') setCurrentNoteForUpdate(e.target.value);

    if (e.target.id === 'star-1') setSelectedRatingForUpdate(1);
    if (e.target.id === 'star-2') setSelectedRatingForUpdate(2);
    if (e.target.id === 'star-3') setSelectedRatingForUpdate(3);
    if (e.target.id === 'star-4') setSelectedRatingForUpdate(4);
    if (e.target.id === 'star-5') setSelectedRatingForUpdate(5);
    if (e.target.id === 'star-clear') setSelectedRatingForUpdate(0);
  }

  // Handler to update an entry
  const handleEntryUpdate = async (e) => {
    e.preventDefault();

    const entryToUpdate = {
      entryId: confirmUpdate,
      country: currentCountryForUpdate,
      region: currentRegionForUpdate,
      location: currentLocationForUpdate,
      route: currentRouteForUpdate,
      typeId: selectedTypeForUpdate,
      difficultyId: selectedDifficultyForUpdate,
      note: currentNoteForUpdate,
      startDate: selectedStartDateForUpdate,
      endDate: selectedEndDateForUpdate === '' ? null : selectedEndDateForUpdate,
      rating: selectedRatingForUpdate
    };

    try {
      const response = await fetch('/entries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entryToUpdate)
      })

      if (response.status !== 200) {
        // Throw an error if request is not successful
        const error = await response.json();
        throw new Error(error.message);
      }
      else {
        const updatedEntry = await response.json();

        const updatedEntries = [
          ...entries.filter(entry => entry.entry_id !== confirmUpdate),
          ...updatedEntry
        ]

        setEntries(updatedEntries.sort((a, b) => {
          return new Date(b.start_date) - new Date(a.start_date)
        }));

        setConfirmUpdate(false);
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // Handler to display prompt to confirm deletion
  const handleConfirmDelete = (entryId) => {
    setConfirmDelete(entryId);
  }

  // Handler to delete an entry
  const handleEntryDelete = async (entryId) => {
    // Create request body with passed in id of the entry
    const entryToDelete = { entryId }

    try {
      // Send DELETE request
      const response = await fetch('/entries', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entryToDelete)
      })

      if (response.status !== 200) {
        // Throw an error if request is not successful
        const error = await response.json();
        throw new Error(error);
      }
      else {
        // If successful, remove deleted entry from rendered list of entries
        setEntries(entries.filter((entry => entry.entry_id !== entryId)));

        // Remove confirm prompt
        setConfirmDelete(false);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  // Toggle handler for main form
  const toggleMainForm = () => {
    setDisplayMainForm(!displayMainForm);
  }

  const handleStarHover = (e) => {
    if (e.type === 'mouseenter') {
      if (e.target.id === 'star-1') setStarHover(1);
      if (e.target.id === 'star-2') setStarHover(2);
      if (e.target.id === 'star-3') setStarHover(3);
      if (e.target.id === 'star-4') setStarHover(4);
      if (e.target.id === 'star-5') setStarHover(5);
    }
    if (e.type === 'mouseleave') setStarHover(0);
  }

  // Fetch and update entry records state on mount
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch('/entries');
      const newEntries = await response.json();
      
      setEntries(newEntries);
    }
    
    fetchEntries();
  }, []);

  // Fetch and update form dropdowns state and set initial dropdown selections on mount
  useEffect(() => {
    const fetchDropdowns = async () => {
      const response = await fetch('/form');
      const formDropdowns = await response.json();
      
      setActivities(formDropdowns.activities);
      setTypes(formDropdowns.types);
      setDifficulties(formDropdowns.difficulties.sort((a, b) => a.sort - b.sort));

      const defaultActivity = formDropdowns.activities[0]._id
      setSelectedActivity(defaultActivity);

      const defaultType = formDropdowns.types.filter(type => type.activity_id === defaultActivity)[0]._id
      setSelectedType(defaultType);

      const defaultDifficulty = formDropdowns.difficulties.filter(difficulty => difficulty.type_id === defaultType)[0]._id
      setSelectedDifficulty(defaultDifficulty);
    }

    fetchDropdowns();
  }, []);

  // render Header, Form, and Entries containers
  return(
    <div id='main-container'>
      <Header />
      <div className="title" onClick={toggleMainForm}>
        <h1 className="">What mountains did you climb today?</h1>
        <img src="./assets/dropdown.svg" width="40px" />
      </div>
      <Form
        activities={activities}
        types={types}
        difficulties={difficulties}
        selectedActivity={selectedActivity}
        selectedType={selectedType}
        selectedDifficulty={selectedDifficulty}
        currentRoute={currentRoute}
        selectedRating={selectedRating}
        currentLocation={currentLocation}
        currentRegion={currentRegion}
        currentCountry={currentCountry}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        currentNote={currentNote}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
        displayMainForm={displayMainForm}
        purpose="main"
        handleStarHover={handleStarHover}
        starHover={starHover}
      />
      <div className="bottom-title"></div>
      <Entries
        entries={entries}
        confirmDelete={confirmDelete}
        handleConfirmDelete={handleConfirmDelete}
        handleEntryDelete={handleEntryDelete}
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
        handleStarHover={handleStarHover}
        starHover={starHover}
      />
      <div className='footer'></div>
    </div>
  );
};

export default App;
