const getAllMenuItems = function (pool) {
  return pool
    .query(`SELECT * FROM menu;`, [])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const addUser = function (pool, user) {
  return pool
    .query(`INSERT INTO users`, [`${user.email}`, `${user.password}`])
    .then((result) => {
      console.log(result.rows)
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

}


module.exports = { getAllMenuItems, addUser }
