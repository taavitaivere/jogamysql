const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')

const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))
app.use(express.static('public'));



const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected to joga_mysql db');
})
app.get('/', (req, res) => {
    let query = 'select * from article';
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
});
app.get('/article/:slug', (req, res) => {
    let query = `SELECT * , author.name as author_name, article.name as article_name FROM author  iNNER JOIN article ON author.id = article.author_id WHERE slug="${req.params.slug}"`
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('article', {
            articles: articles
        })
    })
});


app.listen(3000, () => {console.log('App s started at http://localhost:3000'); });