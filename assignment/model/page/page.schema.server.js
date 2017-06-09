var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: "websiteModel"},
    name: String,
    title: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'page'});

module.exports = pageSchema;
