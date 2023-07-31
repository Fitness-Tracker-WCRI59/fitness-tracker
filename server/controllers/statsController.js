const statsController = {};
const { User, Stats } = require('../models/userModel')


// statsController.addStats = (req, res, next) => {

//     const { username, age, sex, height, weight, goal } = req.body;
    
//     if (!age || !sex || !weight || !goal)
//     return next({
//         log: 'Missing inputs in UserController.createUser',
//         message : {err: 'An error occured'}
//     })

//     User.find({username: username})
// }

statsController.updateStats = (req, res, next) => {
    console.log(req.cookies);
    const { goal: newGoal, weight: newWeight } = req.body;
    const { ssid } = req.cookies;
    User.findByIdAndUpdate({_id: ssid}, {goal: newGoal, weight: newWeight}, {new: true})
    .then(user => {
        console.log(user);
        // user.goal = goal;
        // user.weight = weight;
        return next();
    }).catch(err => next({
        log: 'error in statsController.updateStats',
        message: {
          err: `Error: ${err}`
        }}))
}

statsController.getUserInfo = (req, res, next) => {
  console.log(req);
  const {ssid} = req.cookies;
  User.findById({_id: ssid})
  .then(user => {
    console.log(user);
    const { firstName, lastName, age, sex, height, weight, goal } = user;
    res.locals.userInfo = { firstName, lastName, age, sex, height, weight, goal }
    return next();
  }).catch (err => next({
    log: 'error in statsController.getCookies',
        message: {
          err: `Error: ${err}`
  }}))

}


module.exports = statsController;