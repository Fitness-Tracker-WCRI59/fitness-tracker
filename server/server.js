const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = 3000;


// require controllers
const cookieController = require('./controllers/cookieController') 
const sessionController = require('./controllers/sessionController')
const userController = require('./controllers/userController')
const statsController = require('./controllers/statsController')

// const mongoURI = process.env.DB_URI
const mongoURI = 'mongodb+srv://danykdev:HayEN8YCrPSwYPqO@cluster0.iks6thq.mongodb.net/'



mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'fitness-tracker'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, '../dist')));

app.post('/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => res.status(200).json(res.locals));


// create user
app.post('/signup',
 userController.createUser, 
  sessionController.startSession, 
  cookieController.setSSIDCookie, 
  (req, res) => {
    res.status(200).json({successMessage: "Thanks for registering", user: res.locals.user});
  } );

  // check if user has active session when trying to access /main
app.get('/main',
 sessionController.isLoggedIn, 
 (req, res) => res.status(200).json({message: 'User is Logged In!'}))

 app.patch('/stats', userController.updateStats, (req, res) => { // redirecting to stats? 
  res.sendStatus(200)
 })

 app.get('/stats', statsController.getUserInfo, (req, res) => {
  res.status(200).json(res.locals.userInfo)
 })

// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'))
// })

app.delete('/logout', sessionController.endSession, cookieController.removeSSIDCookie, (req, res) => {
  res.status(200).json('Session has ended');
})

app.use((req, res) => res.status(404).send('Error page not found'))

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express global error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})