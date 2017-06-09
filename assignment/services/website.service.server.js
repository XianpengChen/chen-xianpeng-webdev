var app = require('../../express');
var websiteModel = require('../model/website/website.model.server');



app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.post('/api/assignment/user/:userId/website',createWebsite);
app.get('/api/website/:websiteId',findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);







var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        });
    // var resultSet = [];
    // for(var w in websites) {
    //     if(websites[w].developerId === req.params.userId) {
    //         // websites[w].created = new Date();
    //         // websites[w].updated = new Date();
    //         resultSet.push(websites[w]);
    //     }
    // }
    // res.json(resultSet);

}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsite(userId,website)
        .then(function (website) {
            res.json(website);
        });
    // website._id = (new Date()).getTime() + "";
    // websites.push(website);
    // res.sendStatus(200);

}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
    // var website = websites.find( function (website) {
    //     return website._id === websiteId;
    // });
    // res.send(website);

}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.sendStatus(200);
        });
    // var web = websites.find(function (website) {
    //     return website._id === websiteId;
    // })
    // web.name = website.name;
    // web.description = website.description;
    // res.sendStatus(200);

}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    websiteModel
        .deleteWebsite(websiteId)
        .then(function (status) {
            res.sendStatus(200);
        });

    // var website = websites.find(function (website) {
    //     return website._id === websiteId;
    // });
    // var index = websites.indexOf(website);
    // websites.splice(index, 1);
    // res.sendStatus(200);


}