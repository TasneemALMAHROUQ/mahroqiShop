// أعلى الملف
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'; 

async function register(req, res) {
  const {  name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' }); 
    }

 
    const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
    const hashed = await bcrypt.hash(password, rounds); // ← مهم
    const newUser = await User.createUser(name, email, hashed);

  
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role || 'user' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role || 'user' },
      token
    });
  } catch (error) {
    
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Email already registered' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = { register, login };
