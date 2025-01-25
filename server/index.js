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

