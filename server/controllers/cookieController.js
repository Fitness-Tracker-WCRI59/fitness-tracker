const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  // set cookie called ssid to user id after user has been authenticated
  // check if user id exists, if not call global error handler
  if (!res.locals._id) return next({
    log: 'error in cookieController.setSSIDCookie',
    message: {
      err: `Error user id undefined`
    }})
    res.cookie('ssid', res.locals._id, {
      httpOnly: true,
    })
    delete res.locals._id;
    return next();
}

module.exports = cookieController;