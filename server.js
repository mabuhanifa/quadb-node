const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const pool = require("./db.js");
const axios = require("axios");
const port = 3001;

const cryptoRouter = require("./routes/cryptoRoute.js");



const fetchUser = async () => {
  const res = await axios.get("https://api.wazirx.com/api/v2/tickers");
  return await res.data;
};

// async function createTable() {
//   const query = `
//     CREATE TABLE crypto (
//       id SERIAL PRIMARY KEY,
//       data JSONB
//     );
//   `;

//   try {
//     await pool.query(query);
//     console.log('Table created successfully');
//   } catch (error) {
//     console.error('Error creating table:', error);
//   } finally {
//     pool.end();
//     console.log('Disconnected from the database');
//   }
// }

// createTable();



app.get("/crypto", async (req, res) => {
  const query = "SELECT * FROM crypto where id = 2";
  try {
    const result = await pool.query(query);
    res.send(result.rows[0].data);
  } catch (error) {
    console.error("Error reading data:", error);
  }
});

app.post("/api", async (req, res) => {
  const data = await fetchUser();
  const arr = [];

  for (const property in data) {
    arr.push({
      name: property,
      info: data[property],
    });
  }
  const final = arr
    .sort((a, b) => Number(b.info.sell) - Number(a.info.sell))
    .slice(0, 10);

  if (final.length > 0) {
    res.send(final);
  } else {
    res.send(`No data found`);
  }
  const mainData = JSON.stringify(final);

  try {
    const query = await pool.query(
      "INSERT INTO crypto (data) VALUES ($1) RETURNING *",
      [mainData]
    );
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
});

app.listen(port, () => {
  console.log(`App listening to port ${port} `);
});
