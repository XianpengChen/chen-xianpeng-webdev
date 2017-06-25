var mongoose = require('mongoose');
var masteryPageSchema = require('./masteryPage.schema.server');
var masteryPageModel = mongoose.model('masteryPageModel', masteryPageSchema);

masteryPageModel.createMasteryPage = createMasteryPage;
masteryPageModel.findAllMasteryPagesForUser = findAllMasteryPagesForUser;
masteryPageModel.findMasteryPageById = findMasteryPageById;
masteryPageModel.deleteMasteryPage = deleteMasteryPage;

module.exports = masteryPageModel;

function createMasteryPage(userId, MasteryPage) {
    MasteryPage._user = userId;
    return masteryPageModel.create(MasteryPage);
}

function findAllMasteryPagesForUser(userId) {
    return masteryPageModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function findMasteryPageById(MasteryPageId) {
    return masteryPageModel.findById(MasteryPageId);
}


function deleteMasteryPage(MasteryPageId) {
    return masteryPageModel.remove({_id: MasteryPageId});
}