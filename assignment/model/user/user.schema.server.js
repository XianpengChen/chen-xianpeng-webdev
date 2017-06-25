var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    google: {
        id: String,
        token: String
    },
    friends:[{id: String, dateAdded: {type: Date, default: Date.now}}],
    roles: [{type:String, default: 'USER', enum:['USER', 'STUDENT', 'FACULTY', 'ADMIN']}],
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:"websiteModel"}],
    dateCreated: Date
}, {collection: "user"});

module.exports = userSchema;