import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx'

/*
--PUNCH LIST--
  - controlled components
  - conditional entry date appearance
  - submit several routes in one entry
  - auto complete
  - update + delete
  - stars for rating
  - collapsable form
  - enable/disable form fields
  - authentication
  - UI/UX
  - client + server side error handling
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
