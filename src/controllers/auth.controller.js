const jwt = require('jwt-simple');
const { authSecret } = require('../../.env');
const knex = require('../database/db');
const bcrypt = require('bcrypt');

const signin = async (req, res) => {
  const userReq = { username: req.body.usuario, password: req.body.senha }
  const userDB = await knex('users')
    .where('username', userReq.username)
    .first()
    .catch(error => {
      console.log(error);
      return false;
    })

  if (!userDB) return res.status(401).send("Email/senha incorretos");

  const passwordMatches = await bcrypt.compare(userReq.password, userDB.senha).catch(() => false);
  
  if (!passwordMatches) return res.status(401).send("Email/senha incorretos");

  const DATE_NOW = Math.floor(Date.now() / 1000);
  const TOKEN_EXP_TIME = DATE_NOW + (60 * 60 * 24 * 3) // 60 *60 *24 *3 = 3 DAYS.

  const payload = {
    id: userDB.id,
    username: userDB.username,
    tipo: userDB.tipo,
    iat: DATE_NOW,
    exp: TOKEN_EXP_TIME
  }

  res.json({
    ...payload,
    token: jwt.encode(payload, authSecret)
  })
}

const validateToken = async (req, res) => {
  const userData = req.body || null;
  if(userData) {
    const token = jwt.decode(userData.token, authSecret);
    if(new Date(token.exp * 1000) > new Date()) {
      return res.send(true);
    }
  }
  return res.send(false)
}

module.exports = {
  signin,
  validateToken,
}