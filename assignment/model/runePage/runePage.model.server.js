var mongoose = require('mongoose');
var runePageSchema = require('./runePage.schema.server');
var runePageModel = mongoose.model('runePageModel', runePageSchema);

runePageModel.createRunePage = createRunePage;
runePageModel.findAllRunePagesForUser = findAllRunePagesForUser;
runePageModel.findRunePageById = findRunePageById;
runePageModel.deleteRunePage = deleteRunePage;

module.exports = runePageModel;

function createRunePage(userId, RunePage) {
    RunePage._user = userId;
    return runePageModel.create(RunePage);
}

function findAllRunePagesForUser(userId) {
    return runePageModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function findRunePageById(RunePageId) {
    return runePageModel.findById(RunePageId);
}


function deleteRunePage(RunePageId) {
    return runePageModel.remove({_id: RunePageId});
}