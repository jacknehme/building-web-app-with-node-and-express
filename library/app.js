var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sql = require('mssql');

var config = {
    user: 'books',
    //password: 'pluralsight1@',
    server: 'localhost\\Books',
    // You can use 'localhost\\instance' to connect to named instance
    database: 'Books',
    options: {
        // encrypt: true // Use this if you're on Windows Azure
    }
};

sql.connect(config, function(err) {
    console.log(err);
});

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);


app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.get('/books', function(req, res) {
    res.send('Hello Books');
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});