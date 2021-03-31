const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const passport = require('passport');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(routes);
app.listen(5000, () => {
  console.log('App listening on port 5000')
});
