var mongoose = require('mongoose');
var followingSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    summonerName: String,
    accountID: String,
    summonerID: String,
    dateFollowing: {type: Date, default: Date.now}
}, {collection: 'following'});

module.exports = followingSchema;