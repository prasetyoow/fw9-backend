const db = require('../helpers/db');

exports.getAllTransactionType = (cb) => {
  db.query('SELECT * FROM transaction_type', (err, res) => {
    cb(res.rows);
  });
};

exports.createTransactionType = (data, cb) => {
  const query = 'INSERT INTO transaction_type (name, description) VALUES ($1, $2) RETURNING *';
  const value = [data.name, data.description];
  db.query(query, value, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      cb(err);
    }
  });
};

exports.editTransactionType = (id, data, cb) => {
  const query = 'UPDATE transaction_type SET name=$1, description=$2 WHERE id=$3 RETURNING *';
  const value = [data.name, data.description, id];
  db.query(query, value, (err, res) => {
    if (res) {
      cb(err, res);
    } else {
      cb(err);
    }
  });
};

exports.deleteTransactionType = (id, cb) => {
  const query = 'DELETE FROM transaction_type WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};