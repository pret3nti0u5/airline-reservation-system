const express = require('express');
// const passport = require('passport');
// const cookieSession = require('cookie-session');
const cors = require('cors');
const path = require('path');
// require('./db/mongoose');
// require('./middleware/passport-setup');
// const postssRoutes = require('./routes/api/postssRoutes.js');
// const authRoutes = require('./routes/api/authRoutes.js');
// const userRoutes = require('./routes/api/userRoutes.js');
const offersRoutes = require('./routes/api/offersRoutes.js');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
// app.use(
//   cookieSession({
//     maxAge: 4 * 60 * 60 * 1000,
//     keys: [process.env.cookieKey],
//   })
// );
app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use('/api/posts', postssRoutes);
// app.use('/api/user', userRoutes);
// app.use(authRoutes);
app.use('/api/offers', offersRoutes);

if (process.env.NODE_ENV === undefined) {
  app.get('*', (req, res) => {
    res.redirect('http://localhost:3000');
  });
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
