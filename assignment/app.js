var app = require('../express');



require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');
app.get('/goodbye', sayHello);
app.get('/websites', sendWebsites);

function sendWebsites(req, res) {
    var websites = [
        {name:'facebook'},
        {name: 'twitter'},
        {name: 'linkedin'}
    ];
    res.send(websites);


}

function sayHello() {
    console.log('hello');

}



app.get('/api/poc/summoner/byname', findSummonerByName);

function findSummonerByName(req, res) {
    var name = req.query['summonerName'];
    var api_key = 'RGAPI-271339a7-cb43-48d7-9b89-199d99017ebe';
    var url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + name + '?api_key=' + api_key;





}