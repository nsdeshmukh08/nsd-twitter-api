
const express = require('express');        
const bodyParser = require('body-parser');
const cors = require('cors');
const Twit = require('twit');

const twitterConfig = require('../config');
const {searchTweets} = require('../route');

console.log(searchTweets);

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();    

router.get(searchTweets, function(req, res) {
    const searchStr = req.params.hashTag;

    const twitter = new Twit(twitterConfig);

    twitter.get('search/tweets', { q: `${searchStr} since:2011-07-11`, count:500 }, function(err, data, response) {
        res.json(data); 
    });  
});

app.use('/api', router);

app.listen(port);
