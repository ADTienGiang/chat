const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const router = require('./routes/index');
const passport = require('passport');
const socketIOConfig = require('./controllers/chatController');

const db = require('./models');
const Message = db.Message;

//session 
app.use(session({
  secret: 'keynguyenthevan2001.dev.2023',
  resave: false,
  saveUninitialized: false
}));
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
//facebook, google
require('./passport/passport-facebook')(passport);
require('./passport/passport-google')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors()); // Đặt cors middleware trước router
app.use(router);

const server = http.createServer(app);
socketIOConfig(server); // Sử dụng module socket.js để cấu hình Socket.IO

app.use(express.static('dist'));

app.use(cookieParser()); //Parse cookie
const port = 3000;
server.listen(port, () => {
  console.log(`API đang chạy: http://localhost:${port}/`);
});
