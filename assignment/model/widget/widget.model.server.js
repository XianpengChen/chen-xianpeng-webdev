var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

widgetModel.reorderWidget = reorderWidget;


module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        $set: {
            name: widget.name,
            text: widget.text,
            description: widget.description,
            url: widget.url,
            width: widget.width,
            height: widget.height,
            rows: widget.rows,
            size: widget.size,
            class: widget.class,
            icon: widget.icon,
            deletable: widget.deletable,
            formatted: widget.formatted
        }
    });
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {

}

