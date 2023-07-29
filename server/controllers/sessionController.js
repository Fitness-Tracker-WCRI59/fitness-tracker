const sessionController = {};

sessionController.startSession = (req, res, next) => {
    // will be called after user has been authenticated. will be receiving user._id.$
    // use session documents in db for now - look at other options after this is setup
    // create a new session document who has a cookieId set to users id. 
}

sessionController.isLoggedIn = (req, res, next) => {
    // verify if user has an ssid cookie and if they have an active session in db.
}