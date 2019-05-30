module.exports = function(app, path, db, request, cheerio) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'index.html'));
    });

    app.post('/searchTweet', (req, res) => {
        if(!req.body) return res.sendStatus(400);
        let insertObject = req.body;
        collection = db.collection(req.body.topic);
        let queryString = 'https://twitter.com/search?q=' + insertObject.topic + '&src=typd&lang=ru';
        let authors = [];
        let tweets = [];
        request(queryString, (err, res, body) => {
            if (err) throw err;

            let $ = cheerio.load(body);
            
            $('div.content>div.stream-item-header>a').each(function(i) {
                authors[i] = $(this).text();
            });
            $('div.content>div.js-tweet-text-container>p').each(function(i) {
                tweets[i] = $(this).text();
            });
            
        });
        
        for (let i = 0; i < authors.length; i++) {
            insertObject.author = authors[i];
            insertObject.text = tweets[i];
            insertObject.sentiment = '0';
            collection.insertOne(insertObject, (err, result) => {
                if (err) throw err;
            });
            console.log(insertObject);
        }

        res.json(req.body);
    });

    app.post('/getData', (req, res) => {
        let collection = db.collection(req.body.text);
        let count = collection.countDocuments({});
        
        console.log(collection.find().count());
        res.json(req.body);
    });
};