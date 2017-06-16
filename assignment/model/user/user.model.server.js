var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model("UserModel", userSchema);


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;
userModel.findUserByGoogleId = findUserByGoogleId;
module.exports = userModel;


function createUser(user) {
    user.roles = ['USER'];
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    return userModel.update({_id: userId}, {
        $set: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}
function findAllUsers() {
    return userModel.find();
    
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}
