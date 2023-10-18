const dotenv = require("dotenv").config({
  path: `env/.${process.env.NODE_ENV}.env`,
}).parsed;
const Pool = require("pg").Pool;

// DB
const pool = new Pool({
  user: dotenv.DB_USERNAME,
  host: dotenv.DB_HOST,
  database: dotenv.DB_NAME,
  password: dotenv.DB_PASSWORD,
  port: dotenv.DB_PORT,
});

export const create = async (user_id, action_type, created_at) => {
  const result = await pool.query(
    "INSERT INTO actions-history (user_id, action_type, created_at) VALUES ($1, $2, $3) RETURNING *",
    [user_id, action_type, created_at],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Запись добавлена. ID записи: ${results.rows[0].id}`);
    }
  );
};

export const findByUserId = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM actions-history WHERE user_id = $1",
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
  console.log(result);
  return result;
};
