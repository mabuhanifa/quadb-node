const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
// const pool = require("./db.js");
const axios = require("axios");
const port = 3000;

const fetchUser = async () => {
  const res = await axios.get("https://api.wazirx.com/api/v2/tickers");
  return await res.data;
};

app.get("/api", async (req, res) => {
  const data = await fetchUser();
  const arr = [];

  for (const property in data) {
    arr.push({
      name: property,
      info: data[property],
    });
  }
  const final = arr.sort(
    (a, b) => Number(b.info.sell) - Number(a.info.sell)
  ).slice(0, 10);

  if (final.length > 0) {
    res.send(final);
  } else {
    res.send(`No data found`);
  }
});

app.listen(port, () => {
  console.log(`App listening to port ${port} `);
});
