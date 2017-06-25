var app = require('../../express');
var followingModel = require('../model/following/following.model.server');


app.get('/api/project/user/:userId/allFollowings', findAllFollowingsForUser);
app.post('/api/project/user/:userId', createFollowing);
app.get('/api/project/following/:followingId', findFollowingById);
app.delete('/api/project/following/:followingId', deleteFollowing);





function findAllFollowingsForUser(req, res) {
    var userId = req.params.userId;
    followingModel
        .findAllFollowingsForUser(userId)
        .then(function (followings) {
            res.json(followings);
        });

}

function createFollowing(req, res) {
    var following = req.body;
    var userId = req.params.userId;
    followingModel
        .createFollowing(userId,following)
        .then(function (following) {
            res.sendStatus(200);
        });


}

function findFollowingById(req, res) {
    var followingId = req.params.followingId;
    followingModel
        .findFollowingById(followingId)
        .then(function (following) {
            res.json(following);
        });

}


function deleteFollowing(req, res) {
    var followingId = req.params.followingId;

    followingModel
        .deleteFollowing(followingId)
        .then(function (status) {
            res.sendStatus(200);
        });



}