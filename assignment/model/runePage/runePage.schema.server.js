var mongoose = require('mongoose');
var runePageSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    pageName: String,
    pageID: String,
    slots:[{type: Number}],
    dateFollowing: {type: Date, default: Date.now}
}, {collection: 'runePage'});

module.exports = runePageSchema;