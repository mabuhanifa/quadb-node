const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const pool = require("./db.js");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening to port ${port} `);
});
