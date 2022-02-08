const con = require('../utils/db');

const getAllArticles = ('/', (req, res) =>{
    let query ="SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
});

const getArticlesBySlug = ('/article/:slug', (req,res) =>{
    let query = `SELECT * , author.name as author_name, article.name as article_name FROM author  iNNER JOIN article ON author.id = article.author_id WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err,result) => {
        if (err) throw err;
        article = result
        res.render('article', {
            article: article
        })
    })
});

module.exports = {
    getAllArticles,
    getArticlesBySlug
}