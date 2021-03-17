const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
// const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

app.use(cookieParser('secret'));

// app.use(passport.initialize());
// app.use(passport.session());

// require('../config/passport.config.js')(passport);

// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user) => {
//     if (err) return err;
//     if (!user) res.send("Credenciais erradas!");
//     else {
//       req.logIn(user, err => {
//         if (err) return err;
//         res.send("Autenticação bem sucedida");
//         console.log(req.user); 
//       })
//     }
//   })(req,res,next)
// })

app.use(routes);
app.listen(5000, () => {
  console.log('App listening on port 5000')
});