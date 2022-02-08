const express = ('express');
const router = express.Router();
const articleController = require ('../controllers/article');

router.get ('/', articleController.getAllArticles);
router.get ('/article/:slug', articleController.getArticlesBySlug);


module.exports = router;