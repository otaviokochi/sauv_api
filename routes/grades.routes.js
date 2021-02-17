module.exports = app => {
  app.post('/grades')
  app.get('/grades')
  app.get('/grade/:id')
  app.put('/grade/:id')
  app.delete('/grade/:id')
}