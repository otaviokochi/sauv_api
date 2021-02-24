const express = require('express');
const bodyPaser = require('body-parser');
const app = express();
var cors = require('cors')

const port = 5000 || process.env.PORT;

app.use(cors())
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());

require('./routes/subjects.routes')(app);
require('./routes/grades.routes')(app);

app.get('/', function (req, res) {
  res.send({ api: 'RUNNING!' })
})

//TESTA GET
app.get('/test', function (req, res) {
  res.send({ testGet: 'success' })
})

//TESTA PATCH
app.patch('/test', function (req, res) {
  res.send(res.json({ ok: 'SUCCESS ON PATCH' }))
})

//TESTA POST
app.post('/test', function (req, res) {
  res.send(res.json({ ok: 'SUCCESS ON POST' }))
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
