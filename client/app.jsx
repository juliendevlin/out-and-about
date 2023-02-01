import React, {useState, useEffect} from 'react';
import Header from './containers/header.jsx';
import Form from './containers/form.jsx';
import Entries from './containers/entries.jsx';

/* -- MAIN APP -- */
const App = () => {
  // State of existing entry records
  const [ entries, setEntries ] = useState([]);

  // State of form dropdown options
  const [ activities, setActivities ] = useState([]);
  const [ types, setTypes ] = useState([]);
  const [ difficulties, setDifficulties ] = useState([]);

  // State of conrolled form component
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

  // Handler to update state of controlled form component values
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
    if (e.target.name === 'rating') setSelectedRating(Number(e.target.value));
    if (e.target.name === 'location')setCurrentLocation(e.target.value);
    if (e.target.name === 'region') setCurrentRegion(e.target.value);
    if (e.target.name === 'country') setCurrentCountry(e.target.value);
    if (e.target.name === 'start-date') setSelectedStartDate(e.target.value);
    if (e.target.name === 'end-date') setSelectedEndDate(e.target.value);
    if (e.target.name === 'note') setCurrentNote(e.target.value);
  }

  // Handler to submit controlled form component values and create new entry record
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
      endDate: selectedEndDate,
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
        throw new Error(error);
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

  // Handler to delete an entry
  const handleEntryDelete = async (entryId) => {

    // Create request body with passed in id of the entry
    const entryToDelete = { entryId }

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
    }
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
      setDifficulties(formDropdowns.difficulties);

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
    // Drill down dropdown options, controlled form component values and handlers into Form
    // Drill down entries records into Entries
  return(
    <div id='main-container'>
      <Header />
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
      />
      <Entries
        entries = {entries}
        handleEntryDelete={handleEntryDelete}
      />
    </div>
  );
};

export default App;
