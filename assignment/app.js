var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;





var connectionString = 'mongodb://localhost/webdev_summer1_2017';

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137281.mlab.com:37281/heroku_4vpqbtk2'; // user yours
}
mongoose.connect(connectionString);


require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');
app.get('/goodbye', sayHello);
app.get('/websites', sendWebsites);

function sendWebsites(req, res) {
    var websites = [
        {name:'facebook'},
        {name: 'twitter'},
        {name: 'linkedin'}
    ];
    res.send(websites);


}

function sayHello() {
    console.log('hello');

}



