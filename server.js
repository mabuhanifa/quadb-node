const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
// const pool = require("./db.js");
const axios = require("axios");
const port = process.env.PORT || 3001;

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
  const final = arr.slice(0, 10);
  console.log(final);
  if (final.length > 0) {
    res.send(final);
  } 
  else{
    res.send(`final`);
  }
});

app.listen(port, () => {
  console.log(`App listening to port ${port} `);
});
