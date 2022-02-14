const { Pool } = require('pg')
const pool = new Pool({
  user: 'youssefragab',
  password: '123',
  host: 'localhost',
  database: 'food_pickup_app'
});

const getAllMenuItems = function () {
  return pool
    .query(`SELECT * FROM menu_items;`, [])
    .then((result) => {
      console.log(result.rows)
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const addUser = function () {
  return pool
    .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [`${user.name}`, `${user.email}`, `${user.password}`])
    .then((result) => {
      console.log(result.rows)
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

}


module.exports = { getAllMenuItems, addUser }
