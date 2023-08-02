const userController = {};
const { User } = require('../models/userModel')

userController.verifyUser = (req, res, next) => {
// we will be recieving username and password in the request body. check if username exists and if so check if password matches. If match set authenticated to true in res.locals and pass along to next middleware. otherwise call global error handler with message user not authenticated and status code 401.
    const { username, password } = req.body;
    User.findOne({ username }).then(user => {
        if (!user) {
            return next({
                log: 'error in userController.verifyUser',
                message: {
                  err: `No user found`
                }})
        }
            if (user.password === password) {
                res.locals = {
                    authenticated: true,
                    _id: user._id,
                }
                return next();
            } else {
                return next({
                    log: 'error in userController.verifyUser',
                    status: 401,
                    message: {
                      err: `User not authenticated`
                    }})
            }}).catch(err => next({
            log: 'error in userController.verifyUser',
            message: {
              err: `Error trying to find user: ${err}`
            }}))
}


userController.createUser = (req, res, next) => {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password || !firstName || !lastName)
    return next({
        log: 'Missing username/password in UserController.createUser',
        message : {err: 'An error occured'}
    })
    User.create({ 
        username, 
        password, 
        firstName, 
        lastName, 
    }) 
    .then((user) => {
        res.locals._id = user._id;
        return next();
    })
    .catch((err) => {
        return next({
            log: 'Error occurred in userController.createUser',
            message: {err:  `Error trying to create user: ${err}`},
        });
    });

};

userController.updateStats = (req, res, next) => {
    const { age: newAge, height: newHeight, sex: newSex, goal: newGoal, weight: newWeight } = req.body;
    const { ssid } = req.cookies;
    User.findByIdAndUpdate({_id: ssid}, {age: newAge, height: newHeight, sex: newSex, goal: newGoal, weight: newWeight}, {new: true})
    .then(user => {
        console.log(user);
        return next();
    }).catch(err => next({
        log: 'error in userController.updateStats',
        message: {
          err: `Error: ${err}`
        }}))
}




module.exports = userController;