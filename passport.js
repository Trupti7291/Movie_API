const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameFIeld: username,
    passwordField: password
},
    (username, password, callback) => {
        console.log(username + '' + password);
        Users.findOne({ Username: username }, (error, user) => {
            if (error) {
                console.error(error);
                return callback(error);
            }

            if (!user) {
                console.log('Incorrect username');
                return callback(null, false, { message: 'Incorrect username or password.' });
            }
            console.log('Finished');
            return callback(null, user);
        });
    }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtpPayload, callback) => {
    return Users.findById(jwtpPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            console.error(error);
            return callback(error);
        });
}));