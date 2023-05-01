const express = require('express');

const router = express.Router();

const listArticles = [
    {id: 1, name: 'Article #1', text: 'This text about article #1'},
    {id: 2, name: 'Article #2', text: 'This text about article #2'}
];

router.get('/', (req, res) => {
    res.render('articles');
});

router.get('/list', (req, res) => {
    res.json(listArticles);
});

router.post('/list', (req, res) => {
    listArticles.push({id: listArticles.length + 1, name: req.body.nameArt, text: req.body.textArt});
    console.log(listArticles);
    res.json(listArticles);
});

module.exports = router;