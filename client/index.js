import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx'

/*
--PUNCH LIST--
  - update
  - delete:
      create confirm prompt
        create displayComfirmUpdate state
        onclick update button -> toggles displayComfirmUpdate
        create a div with yes/no buttons
          display style toggles with value of displayComfirmUpdate
          onclick yes button
            handle delete
            toggle displayConfirmUpdate
          onclick no button
            toggle displayConfirmUpdate
  - conditional entry date appearance *
  - submit several routes in one entry *
  - auto complete
  - stars for rating
  - collapsable form (expands and collapses from h1 tag)
  - refactor code (break down components)
  - authentication
  - UI/UX (reorder form to be location/act,type,route/dif,rating/dates/notes/button)
  - client + server side error handling
  - load a fixed amount of entries per page that you can toggle through
  - image upload
  - sort order for dropdowns
  - Map/stats
  - 3rd party integrations (lighterpack, etc)
*/

/*
-- COMPONENT MAP --
|-- Index
  |-- App 
    |-- Form Container
      |-- Form
    |-- Entries Container
      |-- Entry Items
*/

const root = createRoot(document.getElementById('root'));
root.render(<App />)
