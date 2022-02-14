const { Pool } = require('pg')
const pool = new Pool({
  user: 'youssefragab',
  password: '123',
  host: 'localhost',
  database: 'food_pickup_app'
});

const getAllMenuItems = function() {
  return pool
    .query(`SELECT * FROM menu;`, [])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

exports.getAllMenuItems = getAllMenuItems;
