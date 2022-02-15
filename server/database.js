const getAllMenuItems = function (pool) {
  return pool
    .query(`SELECT * FROM menu;`, [])
    .then((result) => {
      console.log(result)
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const addUser = function (pool, user) {
  return pool

    .query(`SELECT * FROM menu;`, [])

    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

}


const getAllOrderItems = function (pool, id) {
  return pool
    .query(`SELECT * from order_items
    JOIN orders on order_id = orders.id
    JOIN menu on menu.id = menu_id
    WHERE orders.id = ${id};`
  , [])
    .then((result) => {
      // console.log(result)
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}


module.exports = { getAllMenuItems, addUser, getAllOrderItems }
