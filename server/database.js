const getAllMenuItems = function (pool) {
  return pool
    .query(`SELECT * FROM menu;`)
    .then((result) => {
      console.log(result);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const createOrderId = function (pool) {
  return pool
    .query(`INSERT INTO orders DEFAULT VALUES RETURNING orders.id;`)
    .then((result) => {
      console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addToCart = function (orderId, itemId, pool) {
  return pool
    .query(
      `INSERT INTO order_items (menu_id, order_id) VALUES ($1, $2) RETURNING *;`,
      [itemId, orderId]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getOrderItems = function (orderId, pool) {
  return pool
    .query(
      `SELECT menu.id, count(menu.id) as quantity, menu.name, menu.photo_url, sum(menu.price) as item_price
      FROM menu
      JOIN order_items ON menu.id = order_items.menu_id
      WHERE order_id = $1
      GROUP BY menu.id;
      `,
      [orderId]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const removeAllFromCart = function (itemId, orderId, pool) {
  return pool
    .query(
      `
      DELETE FROM order_items
      WHERE menu_id = $1 AND order_id = $2;
      `,
      [itemId, orderId]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const removeOneFromCart = function (itemId, orderId, pool) {
  return pool
    .query(
      `
      DELETE FROM order_items
      WHERE order_items.id = (
        SELECT id from order_items
        WHERE menu_id = $1 AND order_id = $2
        LIMIT 1);`,
      [itemId, orderId]
    )
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getTotalPrice = function (orderId, pool) {
  return pool
    .query(
      `
      SELECT sum(menu.price) FROM order_items
      JOIN menu on order_items.menu_id = menu.id
      WHERE order_id = $1;`,
      [orderId]
    )
    .then((result) => {
      // console.log(result.rows[0].sum)
      return result.rows[0].sum;
    })
    .catch((err) => {
      console.log(err.message);
    });
};



//for sms system
const is_accepted = (id, bool, time) => {
  const sql =
    "UPDATE orders SET is_accepted = $2, time_est = $3 WHERE id = $1;";
  const args = [id, bool, time];
  client.query(sql, args);
};

const is_completed = (id, bool) => {
  const sql = "UPDATE orders SET is_done = $2 WHERE id = $1;";
  const args = [id, bool];
  client.query(sq, l, args);
};

const placeOrder = (pool, orderId, bool) => {
  return pool
    .query( ` UPDATE orders SET order_placed = $2 WHERE id = $1;`, [orderId, bool])
    .then((result) => {
      // console.log(result.rows[0].sum)
      console.log("from order database");
      console.log(result.rowCount);
      return result.rowCount;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const completedOrder = (pool, orderId, bool) => {
  return pool
    .query(
      `UPDATE orders SET order_ready = $2
  WHERE id = $1;`,
      [orderId, bool]
    )
    .then((result) => {
      // console.log(result.rows[0].sum)
      console.log("completed");
      console.log(result.rowCount);
      return result.rowCount;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const deleteFromOrderItemsIfOrderIsPlaced = (pool, orderId) => {
  return pool
    .query(`DELETE from order_items where order_id = $1`, [orderId])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });

};

const getOrderById = function (orderId, pool) {
  return pool
    .query(`SELECT * FROM orders WHERE id = $1`, [orderId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getAllMenuItems, createOrderId, addToCart, getOrderItems, removeAllFromCart, removeOneFromCart,
  getTotalPrice, is_accepted, is_completed, placeOrder, deleteFromOrderItemsIfOrderIsPlaced, completedOrder, getOrderById};

  // markOrderPlaced, markOrderCompleted
