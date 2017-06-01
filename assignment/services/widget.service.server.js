var app = require('../../express');

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;

    widgets.push(widget);
    res.sendStatus(200);

}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    var resultSet = [];
    for(var w in widgets) {
        if(widgets[w].pageId === pageId) {
            resultSet.push(widgets[w]);
        }
    }
    res.send(resultSet);

}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.send(widget);

}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    var widg = widgets.find(function (widget) {
        return widget._id = widgetId;
    });
    widg.size = widget.size;
    widg.text = widget.text;
    widg.width = widget.width;
    widg.url = widget.url;
    res.sendStatus(200);

}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id = widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);

}