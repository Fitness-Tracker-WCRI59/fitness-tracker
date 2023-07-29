const userController = {};


userController.verifyUser = (req, res, next) => {
// we will be recieving username and password in the request body. check if username exists and if so check if password matches. If match set authenticated to true in res.locals and pass along to next middleware. otherwise call global error handler with message user not authenticated and status code 401.
}