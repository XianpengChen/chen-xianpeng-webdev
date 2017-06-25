var q = require('q');
const app = require('../../express');
const https = require('https');
const querystring = require('querystring');
var runePageModel = require('../model/runePage/runePage.model.server');
var userModel = require('../model/user/user.model.server');
var masteryPageModel = require('../model/masteryPage/masteryPage.model.server');

app.get('/api/lol/summoner/byname/:name', searchSummoner);
app.get('/api/lol/summoner/byAccountId/:accountId', searchRecentMatches);
app.get('/api/lol/champion/byChampionId/:championId', searchChampion);
app.get('/api/lol/runes/bySummonerId/:summonerId', searchRunes);
app.get('/api/lol/masteries/bySummonerId/:summonerId', searchMasteries);
app.post('/api/lol/addRunePage/:userId', addRunePage);
app.post('/api/lol/addMasteryPage/:userId', addMasteryPage);
app.get('/api/lol/runes/byuserId/:userId', getRunePages);
app.get('/api/lol/mastery/byuserId/:userId', getMasteryPages);
app.delete('/api/lol/deleteRunePage/:pageId', deletePage);
app.delete('/api/lol/deleteMasteryPage/:pageId', deleteMasteryPage);
app.get('/api/lol/rune/byRuneId/:runeId', getRune);
app.get('/api/lol/mastery/byMasteryId/:masteryId', getMastery);
app.get('/api/lol/finduserbyname/user/:name', findUserByUsername);
app.get('/api/lol/:userId/addfriend/:friendId', addFriend);

app.get('/api/user/findfriends/:userId', findFriends);

function findFriends(req, res) {
    var userId = req.params.userId;
    userModel
        .findFriends(userId)
        .then(function (friends) {
            res.json(friends);
        })

}

function addFriend(req, res) {
    var friendId = req.params.friendId;
    var userId = req.params.userId;
    userModel
        .addFriend(userId, friendId)
        .then(function (response) {
            res.send(response);
        })
}

function findUserByUsername(req, res) {
    var name = req.params.name;
    userModel
        .findUserByUsername(name)
        .then(function (user) {
            if (!user) {
                res.sendStatus(404);
            }
            else {
                res.json(user);
            }
        })
}
function deleteMasteryPage(req, res) {
    var pageId = req.params.pageId;
    masteryPageModel
        .deleteMasteryPage(pageId)
        .then(function (response) {
            res.send(response);
        })
}
function deletePage(req, res) {
    var pageId = req.params.pageId;
    runePageModel
        .deleteRunePage(pageId)
        .then(function (response) {
            res.send(response);
        })
}

function getMastery(req, res) {
    var masteryId = req.params.masteryId;
    lolSearchMastery(masteryId)
        .then(function (response) {
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function getRune(req, res) {
    var runeId = req.params.runeId;
    lolSearchRune(runeId)
        .then(function (response) {
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });

}

function getMasteryPages(req, res) {
    var userId = req.params.userId;
    masteryPageModel
        .findAllMasteryPagesForUser(userId)
        .then(function (pages) {
            res.json(pages);
        })
}

function getRunePages(req, res) {
    var userId = req.params.userId;
    runePageModel
        .findAllRunePagesForUser(userId)
        .then(function (pages) {
            res.json(pages);
        })
}

function addMasteryPage(req, res) {
    var page = req.body;
    var userId = req.params.userId;
    var mass = [];
    for (i = 0; i < page.masteries.length; i++) {
        var curr = page.masteries[i];
        var temp = {
            id: curr.id,
            rank: curr.rank
        };
        mass.push(temp);
    }
    var masteryPage = {
        pageName: page.name,
        pageID: page.id,
        masteries: mass
    };
    masteryPageModel
        .createMasteryPage(userId, masteryPage)
        .then(function (response) {
            res.sendStatus(200);
        });
}

function addRunePage(req, res) {
    var page = req.body;
    var userId = req.params.userId;
    var slots = [];
    for (u in page.slots) {
        var runeId = page.slots[u].runeId;
        slots.push(runeId);
    }
    var runePage = {
        pageName: page.name,
        pageID: page.id,
        slots: slots
    };
    runePageModel
        .createRunePage(userId, runePage)
        .then(function (response) {
            res.sendStatus(200);
        });
}
function searchChampion(req, res) {

    var championId = req.params.championId;
    lolSearchChampion(championId)
        .then(function (response) {
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function searchMasteries(req, res) {
    var summonerId = req.params.summonerId;
    lolSearchMasteries(summonerId)
        .then(function (response) {
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function searchRunes(req, res) {
    var summonerId = req.params.summonerId;
    lolSearchRunes(summonerId)
        .then(function (response) {
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function searchSummoner(req, res) {
    var name = req.params.name;
    lolSearchSummoner(name)
        .then(function (response) {
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);

        });
}
function searchRecentMatches(req, res) {
    var accountId = req.params.accountId;
    lolRecentMatches(accountId)
        .then(function (response) {
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}


function lolSearchMastery(masteryId) {
    var deferred = q.defer();
    https.get({
        host: 'na1.api.riotgames.com',
        path: '/lol/static-data/v3/masteries/'+masteryId+'?locale=en_US&tags=image&tags=masteryTree',

        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": "RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe",
            "Accept-Language": "en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            }
            catch (e) {
                deferred.reject({error: e});
            }
        });

    });
    return deferred.promise;

}




function lolSearchRune(runeId) {
    var deferred = q.defer();
    https.get({
        host: 'na1.api.riotgames.com',
        path: '/lol/static-data/v3/runes/'+runeId+'?tags=image&locale=en_US',

        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": "RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe",
            "Accept-Language": "en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            }
            catch (e) {
                deferred.reject({error: e});
            }
        });

    });
    return deferred.promise;

}

function lolSearchMasteries(summonerId) {
    var deferred = q.defer();
    https.get({
        host: 'na1.api.riotgames.com',
        path: '/lol/platform/v3/masteries/by-summoner/' + summonerId,

        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": "RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe",
            "Accept-Language": "en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            }
            catch (e) {
                deferred.reject({error: e});
            }
        });

    });
    return deferred.promise;

}

function lolSearchRunes(summonerId) {
    var deferred = q.defer();
    https.get({
        host: 'na1.api.riotgames.com',
        path: '/lol/platform/v3/runes/by-summoner/' + summonerId,

        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": "RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe",
            "Accept-Language": "en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            }
            catch (e) {
                deferred.reject({error: e});
            }
        });

    });
    return deferred.promise;
}


function lolSearchChampion(championId) {
    var deferred = q.defer();
    https.get({
        host: 'na1.api.riotgames.com',
        path: '/lol/static-data/v3/champions/'+championId+'?locale=en_US',

        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": "RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe",
            "Accept-Language": "en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            }
            catch (e) {
                deferred.reject({error: e});
            }
        });

    });
    return deferred.promise;
}

function lolRecentMatches(accountId) {
    var deferred = q.defer();
    https.get({
        host: 'na1.api.riotgames.com',
        path: '/lol/match/v3/matchlists/by-account/'+accountId+'/recent',

        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": "RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe",
            "Accept-Language": "en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            }
            catch (e) {
                deferred.reject({error: e});
            }
        });

    });
    return deferred.promise;

}

function lolSearchSummoner(name) {
    var deferred = q.defer();
    https.get({
        host: 'na1.api.riotgames.com',
        path: '/lol/summoner/v3/summoners/by-name/' + name,
        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": "RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe",
            "Accept-Language": "en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"

        }

    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            }
            catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}