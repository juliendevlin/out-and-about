import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx'

/*
--PUNCH LIST--
  - submit several routes in one entry *
  - entry UI/conditional entry date appearance *
    first
      if first === previousfirst -> don't display
      if first === previouslast -> don't display
    last
      if last === first -> don't display
  - image upload
  - stars for rating
  - auto complete
  - refactor code

  - authentication
  - client + server side error handling
  - load a fixed amount of entries per page that you can toggle through
  - sort order for dropdowns
  - Map/stats
  - 3rd party integrations (lighterpack, etc)
*/

/*
-- COMPONENT MAP --
|-- Index
  |-- App 
    |-- Form 
    |-- Entries Container
      |-- Entry Items
      |-- Prompts
*/

const root = createRoot(document.getElementById('root'));
root.render(<App />)
