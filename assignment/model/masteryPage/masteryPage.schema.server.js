var mongoose = require('mongoose');
var masteryPageSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    pageName: String,
    pageID: String,
    masteries:[{id: Number, rank: Number}],
    dateFollowing: {type: Date, default: Date.now}
}, {collection: 'masteryPage'});

module.exports = masteryPageSchema;