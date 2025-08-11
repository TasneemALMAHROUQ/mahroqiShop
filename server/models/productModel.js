const pool = require('../db');

const Product = {
  async getAll() {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create({ name, description, price, image_url, category, in_stock }) {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, image_url, category, in_stock)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, price, image_url, category, in_stock]
    );
    return result.rows[0];
  },

  async update(id, { name, description, price, image_url, category, in_stock }) {
    const result = await pool.query(
      `UPDATE products SET name=$1, description=$2, price=$3, image_url=$4, category=$5, in_stock=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [name, description, price, image_url, category, in_stock, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  }
};

module.exports = Product;
