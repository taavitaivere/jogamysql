const express = require('express');
const router = express.Router();
const articleController = require ('../controllers/author');

router.get ('/:id', articleController.getAllArticlesByAuthor);

module.exports = router;