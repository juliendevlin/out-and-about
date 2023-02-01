const db = require('../models/model');
const queries = require('../models/entry-queries')

const entryController = {}

// Get entry info from all columns in database, ordered by entry start date
entryController.getEntries = (req, res, next) => {
  // Check if entry id stored in locals, if so add a where condition to query for that entry, if not query for all entries
  let selectQuery = queries.selectAll;
  const queryParams = [];

  if (Object.hasOwn(res.locals, 'entryId')) {
    selectQuery += 'WHERE entry_routes.entry_id = ($1) ';
    queryParams.push(res.locals.entryId);
  }
  
  selectQuery += 'ORDER BY entries.start_date DESC';

  // Query for all columns in all tables and save to locals
  db.query(selectQuery, queryParams)
  .then(data => {
    res.locals.entries = data.rows;
    return next();
  })
  .catch(err => {
    return next({
      log: `ERROR - entryController.getEntries: ${err}`,
      message: {err: 'Failed to retrieve entries from database. Check server log for details.'}
    });
  });
}

entryController.setEntry = (req, res, next) => {
  // Initialize variables for storage during transaction
  let regionId;
  let countryId;
  let locationId;
  let routeId;
  let entryId;

  // Destrcture request body properties to use for transaction
  const { country, region, location, route, typeId, difficultyId, note, startDate, endDate, rating } = req.body;

  // Begin transaction
  db.query('BEGIN')
    // Search for country, insert if not found
    .then(() => db.query(queries.selectCountry, [country]))
    .then(countryQuery => {
      if (countryQuery.rows[0]) return countryQuery; 
      return db.query(queries.insertCountry, [country]);
    })
    // Search for region, insert if not found
    .then(countryQuery => {
      countryId = countryQuery.rows[0]._id;
      return db.query(queries.selectRegion, [region]);
    })
    .then(regionQuery => {
      if (regionQuery.rows[0]) return regionQuery;
      return db.query(queries.insertRegion, [region]);
    })
    // Search for location, insert if not found
    .then(regionQuery => {
      regionId = regionQuery.rows[0]._id;
      return db.query(queries.selectLocation, [location, regionId, countryId]);
    })
    .then(locationQuery => {
      if (locationQuery.rows[0]) return locationQuery;
      return db.query(queries.insertLocation, [location, regionId, countryId]);
    })
    // Search for route, insert if not found
    .then(locationQuery => {
      locationId = locationQuery.rows[0]._id;
      return db.query(queries.selectRoute, [route, typeId, difficultyId, locationId]);
    })
    .then(routeQuery => {
      if (routeQuery.rows[0]) return routeQuery;
      return db.query(queries.insertRoute, [route, typeId, difficultyId, locationId]);
    })
    // Insert entry
    .then(routeQuery => {
      routeId = routeQuery.rows[0]._id;
      return db.query(queries.insertEntry, [note, startDate, endDate, 1]);
    })
    // Insert entry route
    .then(entryQuery => {
      entryId = entryQuery.rows[0]._id;
      return db.query(queries.insertEntryRoute, [entryId, routeId, rating]);
    })
    // Commit the transaction
    .then(() => {
      return db.query('COMMIT')
    })
    // Store the entry id
    .then(() => {
      res.locals.entryId = entryId;
      return next();
    })
    // Catch any errors from the transaction
    .catch(err => {
      return next({
        log: `ERROR - entryController.setEntries: ${err}`,
        message: {err: 'Failed to create entry in database. Check server log for details.'}
      });
    });
}

// Deletes an entry from database
entryController.deleteEntry = (req, res, next) => {
  // Destructure entry ID for entry to delete
  const { entryId } = req.body;

  // Delete database records of the entry from entry_routes and the entry record from entries
  db.query('BEGIN')
    .then(() => db.query(queries.removeEntryRoutes, [entryId]))
    .then(() => db.query(queries.removeEntry, [entryId]))
    .then(() => next())
    .catch((err) => {
      next({
        log: `ERROR - entryController.deleteEntries: ${err}`,
        message: {err: 'Failed to delete entry in database. Check server log for details.'}
      });
    });
}

module.exports = entryController;
