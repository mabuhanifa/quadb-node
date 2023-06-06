const { Pool } = require("pg");
require("dotenv").config();

//creating connection to database
const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  ssl: `true`,
});

(async () => {
  try {
    await pool.connect();
    console.log("Postgresql is connected");
  } catch (error) {
    console.log(error);
  }
})();

module.exports = pool;