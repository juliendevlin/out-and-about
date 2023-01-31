const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

entryController = require('./controllers/entry-controller');
formController = require('./controllers/form-controller');

app.use(express.json());

// get all entries route
app.get('/entries', 
  entryController.getEntries,
  (req, res) => {
    return res.status(200).json(res.locals.entries);
  });

// create new entry route
app.post('/entries',
  entryController.setEntry,
  entryController.getEntries,
  (req, res) => {
    return res.status(201).json(res.locals.entries);
  })

// update entry route
// todo

// delete entry route
// todo

// gets form values
app.get('/form', 
  formController.getFormOptions,
  (req, res) => {
    return res.status(200).json(res.locals.formOptions)
  })

// serve app and static files for production environments
if (process.env.NODE_ENV === 'production') {
	app.use('/client', express.static(path.resolve(__dirname, '..', 'client')));
	app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '..', 'client', 'index.html')));
}

// catch-all route
app.use ('/', (req,res, next) =>{
  return next({
    log: 'Express catch all handler caught unknown route',
    status: 404,
    message: {err: 'Route not found'}
  });
});

// default global error object
const defaultErr = {
  log: 'Express error handler caught an unknown middleware error',
  status: 400,
  message: { err: 'An error occurred' }, 
};

// global error handler
app.use((err, req, res, next) => {
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// start working on front end: get skeleton react-redux going?
// pretty things up a bit

// -> then UPDATE/DELETE
// -> then adding/reading multiple routes to one entry
// -> then auto complete? for locations + routes

// -> login/auth
// -> map/stats
// -> photo upload
