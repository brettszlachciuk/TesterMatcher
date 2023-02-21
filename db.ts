import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Connect to the database using mysql2.
 */
export const db = mysql.createConnection({
  multipleStatements: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
