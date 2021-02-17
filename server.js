const express = require('express');
const bodyPaser = require('body-parser');
const app = express();

const port = 5000 || process.env.PORT;


app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());

require('./routes/subjects.routes')(app);
require('./routes/grades.routes')(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})