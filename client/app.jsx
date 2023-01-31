import React, {useState, useEffect} from 'react';
import Header from './containers/header.jsx';
import Form from './containers/form.jsx';
import Entries from './containers/entries.jsx';

/* -- MAIN APP -- */
const App = () => {
  // Create state for list of entries
  const [ entries, setEntries ] = useState([]);

  // Create state for form dropdown options
  const [ activities, setActivities ] = useState([]);
  const [ types, setTypes ] = useState([]);
  const [ difficulties, setDifficulties ] = useState([]);

  // Create state for form values
  const [ selectedActivity, setSelectedActivity ] = useState(null);
  const [ selectedType, setSelectedType ] = useState(null);
  const [ selectedDifficulty, setSelectedDifficulty ] = useState(null);
  const [ currentRoute, setCurrentRoute ] = useState('');
  const [ selectedRating, setSelectedRating ] = useState(null);
  const [ currentLocation, setCurrentLocation ] = useState('');
  const [ currentRegion, setCurrentRegion ] = useState('');
  const [ currentCountry, setCurrentCountry ] = useState('');
  const [ selectedStartDate, setSelectedStartDate ] = useState(null);
  const [ selectedEndDate, setSelectedEndDate ] = useState(null);
  const [ currentNote, setCurrentNote ] = useState('');

  // handler for updating state on change in form fields
  const handleFormChange = (e) => {
    if (e.target.name === 'activity') {
      setSelectedActivity(e.target.value);
      setSelectedType(null);
    }
    if (e.target.name === 'type') setSelectedType(e.target.value);
    if (e.target.name === 'difficulty') setSelectedDifficulty(e.target.value);
    if (e.target.name === 'route') setCurrentRoute(e.target.value);
    if (e.target.name === 'rating') setSelectedRating(e.target.value);
    if (e.target.name === 'location')setCurrentLocation(e.target.value);
    if (e.target.name === 'region') setCurrentRegion(e.target.value);
    if (e.target.name === 'country') setCurrentCountry(e.target.value);
    if (e.target.name === 'start-date') setSelectedStartDate(e.target.value);
    if (e.target.name === 'end-date') setSelectedEndDate(e.target.value);
    if (e.target.name === 'note') setCurrentNote(e.target.value);
  }

  // handler for submiting an entry
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    
    // set up request body
    const typeId = types.filter(type => type.type === selectedType)[0]._id
    const difficultyId = difficulties.filter(difficulty => difficulty.difficulty === selectedDifficulty)[0]._id

    const reqBody = {
      country: currentCountry,
      region: currentRegion,
      location: currentLocation,
      route: currentRoute,
      typeId: typeId,
      difficultyId: difficultyId,
      note: currentNote,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      rating: selectedRating
    }
    
    console.log(reqBody); //remove

    try {
      // send request
      const response = await fetch('/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      });
      if (response.status !== 201) {
        const error = await response.json();
        throw new Error(error);
      }
      else {
        const createdEntry = await response.json();
        // update entries state with created entry
        console.log('createdEntry', createdEntry)
        setEntries([...entries, ...createdEntry].sort((a, b) => {
          return new Date(b.start_date) - new Date(a.start_date)
        }));
      
        console.log('entries', entries)
        //todo
        // reset form values (need to set up values pulling from state?)
        // setSelectedActivity(null);
        // setSelectedType(null);
        // setSelectedDifficulty(null);
        // setCurrentRoute('');
        // setSelectedRating(null);
        // setCurrentLocation('');
        // setCurrentRegion('');
        // setCurrentCountry('');
        // setSelectedStartDate(null);
        // setSelectedEndDate(null);
        // setCurrentNote('');
      }
    }
    catch (err) {
      console.log(err);
      // todo: user side error handling?
    }
  }

  // Update list of entries on mount
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch('/entries');
      const newEntries = await response.json();
      
      setEntries(newEntries);
    }
    
    fetchEntries();
  }, []);

  // Update form dropdowns on mount
  useEffect(() => {
    const fetchDropdowns = async () => {
      const response = await fetch('/form');
      const formDropdowns = await response.json();
      
      setActivities(formDropdowns.activities);
      setTypes(formDropdowns.types);
      setDifficulties(formDropdowns.difficulties);
    }
  
    fetchDropdowns();
  }, []);

  // render form and entry containers, passing down their props
  return(
    <div id='main-container'>
      <Header />
      <Form
        activities={activities}
        types={types}
        difficulties={difficulties}
        selectedActivity={selectedActivity}
        selectedType={selectedType}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
      />
      <Entries
        entries = {entries}
      />
    </div>
  );
};

export default App;
