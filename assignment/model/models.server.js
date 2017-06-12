// module.exports = function() {
//
//     var mongoose = require("mongoose");
//     var mongojs  = require('mongojs');
//
//     var connectionString = 'mongodb://localhost/webdev_summer1_2017';
//
//     if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
//         var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
//         var password = process.env.MLAB_PASSWORD_WEBDEV;
//         connectionString = 'mongodb://' + username + ':' + password;
//         connectionString += '@ds137281.mlab.com:37281/heroku_4vpqbtk2'; // user yours
//     }
//     mongoose.connect(connectionString);
//
//     mongojs('WAM');
//
//     var model = {
//         userrModel   : require("./user/user.model.server")(),
//         websiteModel : require("./website/website.model.server")(),
//         pageModel    : require("./page/page.model.server")(),
//         widgetModel       : require("./widget/widget.model.server")(),
//         mongojs          : mongojs
//     };
//     return model;
// };
