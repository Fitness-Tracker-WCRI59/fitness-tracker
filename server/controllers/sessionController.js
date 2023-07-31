const sessionController = {};
const Session = require('../models/sessionModel.js')

sessionController.startSession = (req, res, next) => {
    // will be called after user has been authenticated. will be receiving user._id.$
    // use session documents in db for now - look at other options after this is setup
    // create a new session document who has a cookieId set to users id. 
    if (!res.locals._id) return next({
        log: 'error in sessionController.StartSession',
        message: {
          err: `Error user id undefined`
        }})
    Session.find({cookieId: res.locals._id}).then(session => {
      console.log(session)
      if (session.length) return next();
      else {
        Session.create({ cookieId: res.locals._id }).then(user => {
            return next();
        }).catch(err => next({
            log: 'error in sessionController.StartSession',
            message: {
              err: `Error creating session in db: ${err}`
            }}));
      }
    }).catch(err => next({
      log: 'error in sessionController.StartSession',
      message: {
        err: `Error finding session in db: ${err}`
      }}))
}

sessionController.isLoggedIn = (req, res, next) => {
    // verify if user has an ssid cookie and if they have an active session in db.
    Session.findOne({ cookieId: req.cookies.ssid }) 
    .then((session) => {
      if(!session) return res.redirect('/');
      else {
        return next()
      }
    })
    .catch((err) => {
      return next({
        log: 'Error occurred in sessionController.isLoggedIn',
        message: {err: 'An error occurred'},
      });
    });
}

module.exports = sessionController;