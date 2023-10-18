const dotenv = require("dotenv").config({
  path: `env/.${process.env.NODE_ENV}.env`,
}).parsed;
import { Pool } from "pg";

// DB
const pool = new Pool({
  user: dotenv.DB_USERNAME,
  host: dotenv.DB_HOST,
  database: dotenv.DB_NAME,
  password: dotenv.DB_PASSWORD,
  port: dotenv.DB_PORT,
});

export const create = async (userId, actionType, createdAt) => {
  const result = await pool.query(
    `INSERT INTO "actions-history" (user_id, action_type, created_at) VALUES ($1, $2, $3) RETURNING *`,
    [userId, actionType, createdAt]
  );
  return `Запись добавлена. ID записи: ${result.rows[0].id}`;
};

export const findByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM "actions-history" WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
};
