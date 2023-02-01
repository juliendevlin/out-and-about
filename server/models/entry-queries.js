module.exports = {
  // select all from all tables, ordered by entry PK
  selectAll: `
    SELECT
      entry_routes._id AS entry_routes_id,
      entry_routes.entry_id,
      entries.start_date,
      entries.end_date,
      types.activity_id,
      activities.activity,
      routes.type_id,
      types.type,
      types.convention,
      entry_routes.route_id,
      routes.route,
      routes.difficulty_id,
      difficulties.difficulty,
      routes.location_id,
      locations.location,
      locations.region_id,
      regions.region,
      locations.country_id,
      countries.country,
      entry_routes.rating,
      entries.note,
      entries.post_date

    FROM entry_routes
      INNER JOIN entries ON entries._id = entry_routes.entry_id
      INNER JOIN routes ON routes._id = entry_routes.route_id
      INNER JOIN types ON types._id = routes.type_id
      INNER JOIN activities ON activities._id = types.activity_id
      INNER JOIN locations ON locations._id = routes.location_id
      INNER JOIN regions ON regions._id = locations.region_id
      INNER JOIN countries ON countries._id = locations.country_id
      INNER JOIN difficulties ON difficulties._id = routes.difficulty_id 
    `,
  // select a country
  selectCountry: `
    SELECT * 
      FROM countries

    WHERE country = ($1)
  `,
  // select a region
  selectRegion: `
    SELECT * 
      FROM regions
  
    WHERE region = ($1)
  `,
  // select a location
  selectLocation: `
    SELECT * 
      FROM locations

    WHERE location = ($1)
      AND region_id = ($2) 
      AND country_id = ($3)
  `,
  // select a route
  selectRoute: `
    SELECT * 
      FROM routes
    
    WHERE route = ($1)
      AND type_id = ($2)
      AND difficulty_id = ($3) 
      AND location_id = ($4)
  `,
  // insert a country
  insertCountry: `
    INSERT INTO countries (country)
      VALUES ($1)

    RETURNING _id
  `,
  // insert a region
  insertRegion: `
    INSERT INTO regions (region)
      VALUES ($1)

    RETURNING _id
  `,
  // insert a location
  insertLocation: `
    INSERT INTO locations (location, region_id, country_id)
      VALUES ($1, $2, $3)

    RETURNING _id
  `,
  // insert a route
  insertRoute: `
    INSERT INTO routes (route, type_id, difficulty_id, location_id)
      VALUES ($1, $2, $3, $4)

    RETURNING _id
  `,
  // insert an entry
  insertEntry: `
    INSERT INTO entries (note, start_date, end_date, user_id)
      VALUES ($1, $2, $3, $4)

    RETURNING _id
  `,
  // insert an entry route
  insertEntryRoute: `
    INSERT INTO entry_routes (entry_id, route_id, rating)
      VALUES ($1, $2, $3)
  `,
  // remove entry routes
  removeEntryRoutes:`
    DELETE FROM entry_routes
    WHERE entry_routes.entry_id = ($1)
  `,
  // remove entry
  removeEntry:`
    DELETE FROM entries
    WHERE entries._id = ($1)
  `
}