var app = require('../../express');

var pageModel = require('../model/page/page.model.server');


app.post('/api/website/:websiteId/page',createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);



var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];


function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
    // page._id = (new Date()).getTime() + "";
    // page.websiteId = websiteId;
    // pages.push(page);
    // res.sendStatus(200);

}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        });
    // var resultSet = [];
    // for(var w in pages) {
    //     if(pages[w].websiteId === websiteId) {
    //         resultSet.push(pages[w]);
    //     }
    // }
    // res.send(resultSet);

}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        })
    // var page = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    // res.send(page);

}
function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.sendStatus(200);
        });
    // var pag = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    // pag.name = page.name;
    // pag.description = page.description;
    // res.sendStatus(200);

}
function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        });
    // var pag = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    // var index = pages.indexOf(pag);
    // pages.splice(index, 1);
    // res.sendStatus(200);

}
