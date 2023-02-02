const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const entryController = require('./controllers/entry-controller');
const formController = require('./controllers/form-controller');

// parse all request bodies
app.use(express.json());

// Get all entries route
app.get('/entries', 
  entryController.getEntries,
  (req, res) => {
    return res.status(200).json(res.locals.entries);
  });

// Create new entry route
app.post('/entries',
  entryController.setEntry,
  entryController.getEntries,
  (req, res) => {
    return res.status(201).json(res.locals.entries);
  });

// Update entry route
app.put('/entries', 
  entryController.deleteEntry,
  entryController.setEntry,
  entryController.getEntries,
  (req, res) => {
    return res.status(200).json(res.locals.entries);
  });

// Delete entry route
app.delete('/entries',
  entryController.deleteEntry,
  (req, res) => {
    return res.sendStatus(200);
  });

// Gets form values route
app.get('/form', 
  formController.getFormOptions,
  (req, res) => {
    return res.status(200).json(res.locals.formOptions)
  })

// Serve app and static files for production environments
if (process.env.NODE_ENV === 'production') {
	app.use('/client', express.static(path.resolve(__dirname, '..', 'client')));
	app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '..', 'client', 'index.html')));
}

// Catch-all route
app.use ('/', (req,res, next) =>{
  return next({
    log: 'Express catch all handler caught unknown route',
    status: 404,
    message: {err: 'Route not found'}
  });
});

// Default global error object & global error handler
const defaultErr = {
  log: 'Express error handler caught an unknown middleware error',
  status: 400,
  message: { err: 'An error occurred' }, 
};

app.use((err, req, res, next) => {
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
