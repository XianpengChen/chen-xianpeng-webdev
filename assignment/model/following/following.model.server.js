var mongoose = require('mongoose');
var followingSchema = require('./following.schema.server');
var followingModel = mongoose.model('followingModel', followingSchema);

followingModel.createFollowing = createFollowing;
followingModel.findAllFollowingsForUser = findAllFollowingsForUser;
followingModel.findFollowingById = findFollowingById;
followingModel.deleteFollowing = deleteFollowing;

module.exports = followingModel;

function createFollowing(userId, following) {
    following._user = userId;
    return followingModel.create(following);
}

function findAllFollowingsForUser(userId) {
    return followingModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function findFollowingById(followingId) {
    return followingModel.findById(followingId);
}


function deleteFollowing(followingId) {
    return followingModel.remove({_id: followingId});
}