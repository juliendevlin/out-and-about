const db = require('../models/model');
const queries = require('../models/form-queries');

const formController = {}

// Queries database for form dropdown options
formController.getFormOptions = (req, res, next) => {
  db.query(queries.selectActivities)
    .then(activities => {
      res.locals.formOptions = {};
      res.locals.formOptions.activities = activities.rows;

      return db.query(queries.selectTypes);
    })
    .then(types => {
      res.locals.formOptions.types = types.rows;

      return db.query(queries.selectDifficulties);
    })
    .then(difficulties => {
      res.locals.formOptions.difficulties = difficulties.rows;

      return next();
    })
    .catch(err => {
      next({
        log: `ERROR - formController.getFormOptions: ${err}`,
        message: {err: 'Failed to retrieve form options from database. Check server log for details.'}
      });
    });
}

module.exports = formController