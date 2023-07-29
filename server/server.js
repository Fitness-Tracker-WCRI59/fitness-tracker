const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = 3000;


// const mongoURI = process.env.DB_URI
const mongoURI = 'mongodb+srv://jmabagat:WHH17fuJLbmCmqKo@cluster0.k6q6azw.mongodb.net/'

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'fitness_tracker'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../dist')));

app.post('/login', (req, res) => {
  // verify user --> start session --> set ssidcookie
  // redirect to /dashboard, on that get rout check if user has a session (handle in sessionController.isLoggedIn middleware) 
})

app.post('/signup', (req, res) => {
  // route for user to sign up. send to userController.createUser --> startSession --> setSSIDCookie. Then redirect to /dashboard
})

app.get('/dashboard', (req, res) => {
  // check if user is logged in
})



app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.use((req, res) => res.status(404).send('Error page not found'))

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express global error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  console.log(req, res);
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errorObj.status).json(errObj.message);
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})