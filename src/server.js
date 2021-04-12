const express = require("express");
const cors = require("cors");
const passport = require('passport');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

require('./routes/routes')(app);

app.use(passport.initialize());

app.listen(5000, () => {
  console.log('App listening on port 5000')
});
