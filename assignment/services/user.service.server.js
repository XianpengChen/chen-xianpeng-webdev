var app = require('../../express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var bcrypt = require("bcrypt-nodejs");

var userModel = require('../model/user/user.model.server');

passport.use(new LocalStrategy(localStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

app.get('/api/assignment/user', findUserByCredentials);
app.get('/api/assignment/user/:userId', findUserById);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', isAdmin, deleteUser);
app.delete('/api/assignment/unregister', unregister);
app.post('/api/assignment/login', passport.authenticate('local'), login);

app.get('/api/assignment/checkLoggedIn', checkLoggedIn);
app.get('/api/assignment/checkAdmin', checkAdmin);
app.post('/api/assignment/register', register);
app.post('/api/assignment/logout', logout);


app.delete("/api/user/:userId/friend/:friendId", deleteFriend);

app.get('/api/assignment/allUsers', isAdmin, findAllUsers);


app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));


function deleteFriend(req, res) {
    var userId = req.params.userId;
    var friendId = req.params.friendId;
    userModel
        .deleteFriend(userId, friendId)
        .then(function (response) {
            res.sendStatus(200);
        })
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                else if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }


            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}
function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            console.log(err);
        })
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}


function findUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        })


    // var user = users.find( function (user) {
    //     return user._id === userId;
    // });
    // res.send(user);
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (user !== null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
    //
    // for(var u in users) {
    //     var user = users[u];
    //     if (user.username === username &&
    //         user.password === password) {
    //         res.json(user);
    //         return;
    //     }
    // }
    // res.send(404);
}


function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        });
    // user._id = (new Date()).getTime() + "";
    // users.push(user);


}

function updateUser(req, res) {
    var user1 = req.body;
    var userId = req.params.userId;

    userModel
        .updateUser(userId, user1)
        .then(function (status) {
            res.sendStatus(200);
        });
    // for(u in users) {
    //     if(userId === users[u]._id) {
    //         users[u] = user1;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);

}
function deleteUser(req, res) {
    userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        })
    // var user = users.find(function (user) {
    //     return user._id === userId;
    //
    // });
    // var index = users.indexOf(user);
    // users.splice(index, 1);
    // res.sendStatus(200);

}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if (username && password) {
        return findUserByCredentials(req, res);
    }
    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        })
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}
