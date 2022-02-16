const getAllMenuItems = function (pool) {
  return pool
<<<<<<< HEAD
    .query(`SELECT * FROM menu;`, [])
=======
    .query(`SELECT * FROM menu;`)
>>>>>>> 4dd5b7987682525186ab43cca3628de414d2960d
    .then((result) => {
      console.log(result)
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

<<<<<<< HEAD
const addUser = function (pool, user) {
  return pool

    .query(`SELECT * FROM menu;`, [])

=======
const createOrderId = function(pool) {
  return pool
    .query(`INSERT INTO orders DEFAULT VALUES RETURNING orders.id;`)
    .then((result) => {
      console.log(result.rows)
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const addToCart = function(orderId ,itemId, pool) {
  return pool
    .query(`INSERT INTO order_items (menu_id, order_id) VALUES ($1, $2) RETURNING *;`, [itemId, orderId])
    .then((result) => {
      console.log(result.rows)
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const getOrderItems = function(orderId, pool) {
  return pool
    .query(
      `SELECT count(menu.id) as quantity, menu.name, menu.photo_url, menu.price 
      FROM menu
      JOIN order_items ON menu.id = order_items.menu_id
      WHERE order_id = $1
      GROUP BY menu.id;
      `, [ orderId])
>>>>>>> 4dd5b7987682525186ab43cca3628de414d2960d
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
<<<<<<< HEAD

}


const getAllOrderItems = function (pool, id) {
  return pool
    .query(`SELECT * from order_items
    JOIN orders on order_id = orders.id
    JOIN menu on menu.id = menu_id
    WHERE orders.id = ${id};`
  , [])
    .then((result) => {
      console.log(result)
=======
}

const removeAllFromCart = function(itemId, orderId, pool) {
  return pool
    .query(`
      DELETE FROM order_items
      WHERE menu_id = $1 AND order_id = $2;
      `, [itemId, orderId])
    .then((result) => {
>>>>>>> 4dd5b7987682525186ab43cca3628de414d2960d
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}


<<<<<<< HEAD
module.exports = { getAllMenuItems, addUser, getAllOrderItems }
=======
module.exports = { getAllMenuItems, createOrderId, addToCart, getOrderItems }
>>>>>>> 4dd5b7987682525186ab43cca3628de414d2960d
