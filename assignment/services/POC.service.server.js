var q = require('q');
const app = require('../../express');
const https = require('https');
const querystring = require('querystring');

app.get('/api/lol/summoner/byname/:name', searchSummoner);
app.get('/api/lol/summoner/byAccountId/:accountId', searchRecentMatches);

var api_key = 'RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe';

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
        //'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Dryus?api_key=RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe'
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