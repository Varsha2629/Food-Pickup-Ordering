const getAllMenuItems = function (pool) {
  return pool
    .query(`SELECT * FROM menu;`)
    .then((result) => {
      console.log(result)
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

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

const addToCart = function(pool, orderId ,itemId) {
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

const getOrderItems = function(pool, orderId) {
  return pool
    .query(
      `SELECT menu.name, menu.photo_url, menu.price 
      FROM menu
      JOIN order_items ON menu.id = order_items.menu_id
      WHERE order_id = $1;
      `, [ orderId])
    .then((result) => {
      console.log(result.rows)
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}


module.exports = { getAllMenuItems, createOrderId, addToCart, getOrderItems }