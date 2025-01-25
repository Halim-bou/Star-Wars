import express from 'express';
import cors from 'cors';
import cookieParsr from 'cookie-parser';
import dotenv from 'dotenv';
import mariadb from 'mariadb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.Port || 3000;

app.use(cors({
	origin: 'http://localhost:5173',
	crdentials: true
}));
app.use(express.json());
app.use(cookieParser());

const pool = mariadb.createPool({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'abelboua',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME || 'star_wars',
	connectionLimit: 5
});

app.post('/api/auth/register', async (req, res) => {
	const { email, password } = req.body;

	try {
	  const conn = await pool.getConnection();
	  const users = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
	  if (users.length > 0) {
		conn.release();
		return res.status(400).json({ message: 'User already exists' });
	}
	  const hashedPassword = await bcrypt.hash(password, 10);
	  await conn.query(
		'INSERT INTO users (email, password) VALUES (?, ?)',
		[email, hashedPassword]
	);
    conn.release();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
	const { email, password } = req.body;

	try {
	  const conn = await pool.getConnection();
	  const users = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
	  conn.release();

	  if (users.length === 0) {
		return res.status(400).json({ message: 'Invalid credentials' });
	  }

	  const user = users[0];
	  const validPassword = await bcrypt.compare(password, user.password);

	  if (!validPassword) {
		return res.status(400).json({ message: 'Invalid credentials' });
	  }

	  const token = jwt.sign(
		{ id: user.id, email: user.email },
		process.env.JWT_SECRET || 'your-secret-key',
		{ expiresIn: '24h' }
	  );

	  res.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000
	  });

	  res.json({ user: { id: user.id, email: user.email } });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error' });
	}
  });

app.post('/api/auth/logout', (req, res) => {
	res.clearCookie('token');
	res.json({ message: 'Logged out successfully' });
  });

app.get('/api/comments/:contentType/:contentId', async (req, res) => {
	const { contentType, contentId } = req.params;

	try {
	  const conn = await pool.getConnection();
	  const comments = await conn.query(
		`SELECT c.*, u.email as user_email
		 FROM comments c
		 JOIN users u ON c.user_id = u.id
		 WHERE content_type = ? AND content_id = ?
		 ORDER BY created_at DESC`,
		[contentType, contentId]
	  );
	  conn.release();
	  res.json(comments);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error' });
	}
});

app.post('/api/comments', authenticateToken, async (req, res) => {
	const { contentType, contentId, comment } = req.body;

	try {
	  const conn = await pool.getConnection();
	  await conn.query(
		'INSERT INTO comments (content_type, content_id, user_id, comment) VALUES (?, ?, ?, ?)',
		[contentType, contentId, req.user.id, comment]
	  );

	  const comments = await conn.query(
		`SELECT c.*, u.email as user_email
		 FROM comments c
		 JOIN users u ON c.user_id = u.id
		 WHERE content_type = ? AND content_id = ?
		 ORDER BY created_at DESC`,
		[contentType, contentId]
	  );

	  conn.release();
	  res.json(comments);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error' });
	}
  });

  app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});