module.exports = app => {
  app.post('/subjects')
  app.get('/subjects')
  app.get('/subject/:id')
  app.put('/subject/:id')
  app.delete('/subject/:id')
}