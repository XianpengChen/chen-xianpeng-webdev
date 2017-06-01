var app = require('../../express');


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
    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    res.sendStatus(200);

}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var resultSet = [];
    for(var w in pages) {
        if(pages[w].websiteId === websiteId) {
            resultSet.push(pages[w]);
        }
    }
    res.send(resultSet);

}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    res.send(page);

}
function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    var pag = pages.find(function (page) {
        return page._id === pageId;
    });
    pag.name = page.name;
    pag.description = page.description;
    res.sendStatus(200);

}
function deletePage(req, res) {
    var pageId = req.params.pageId;
    var pag = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(pag);
    pages.splice(index, 1);
    res.sendStatus(200);

}
