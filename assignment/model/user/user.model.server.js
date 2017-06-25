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
userModel.findUserByUsername = findUserByUsername;
userModel.findFriends = findFriends;
userModel.deleteFriend = deleteFriend;
userModel.addFriend = addFriend;
module.exports = userModel;

function addFriend(userId, friendId) {
    var friend = {
        id: friendId
    };
    return userModel.update({_id: userId}, {$push: {friends: friend}});


}
function deleteFriend(userId, friendId) {
    return userModel.update({_id: userId},  {$pull: {friends: {id: friendId}}})
}
function findFriends(userId) {
    return userModel.find({_id: userId}, {friends: 1});


}
function findUserByUsername(username) {
    return userModel.findOne({username: username});

}

function createUser(user) {
    user.roles = ['USER'];
    if (user.username === "admin") {
        user.roles.push('ADMIN');
    }
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findOne({_id: userId});
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
