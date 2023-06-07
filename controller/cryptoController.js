const pool = require("../db");

const getResponse = async (req, res) => {
  try {
    res.send(`<h1>Welcome to Crypto API</h1>`);
  } catch (error) {
    console.error("Error getting response:", error);
  }
};

const getCrypto = async (req, res) => {
  const query = "SELECT * FROM crypto where id = 2";
  try {
    const result = await pool.query(query);
    res.send(result.rows[0].data);
  } catch (error) {
    console.error("Error reading data:", error);
  }
};

module.exports = { getResponse, getCrypto };
