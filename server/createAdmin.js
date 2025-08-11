require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./db');

async function createAdmin() {
  const name = 'Admin User';
  const email = 'admintasneem@example.com';
  const password = 'admin3328'; 
  const role = 'admin';

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role
    `;

    const values = [name, email, hashedPassword, role];

    const res = await db.query(query, values);

    console.log('Admin user created:', res.rows[0]);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();
