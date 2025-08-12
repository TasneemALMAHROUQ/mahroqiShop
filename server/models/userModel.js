const db = require('../db'); 

async function createUser(name, email, password, role = 'user') {
  try {
    // حذف التشفير هنا — كلمة السر يجب أن تكون مشفرة قبل الإرسال إلى هذا الدالة
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at
    `;

    const values = [name, email, password, role];

    const res = await db.query(query, values);

    return res.rows[0]; 
  } catch (error) {
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const res = await db.query(query, [email]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  findUserByEmail,
};
