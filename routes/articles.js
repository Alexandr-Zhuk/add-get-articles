const express = require('express');

const router = express.Router();

const listArticles = [
    {id: 1, name: 'Article #1', text: 'This text about article #1', tags: ['programming', 'html', 'web']},
    {id: 2, name: 'Article #2', text: 'This text about article #2', tags: ['programming', 'css', 'web']},
    {id: 3, name: 'Article #3', text: 'This text about article #3', tags: ['programming', 'js']}
];

router.get('/', (req, res) => {
    res.render('articles');
});

router.get('/list', (req, res) => {
    res.json(listArticles);
});

router.post('/list', (req, res) => {
    listArticles.push({id: listArticles.length + 1, name: req.body.nameArt, text: req.body.textArt});
    res.json(listArticles);
});

router.post('/tags', (req, res) => {
    let searchTag = req.body.tag.toLowerCase();
    let filtredByTag = [];

    listArticles.forEach((item) => {
        item.tags.forEach((kut) => {
            if(kut.includes(searchTag) && searchTag !== ''){
                filtredByTag.push(item);
            }

            if(searchTag === ''){
                filtredByTag = listArticles;
            }
        })
    });
    
    res.json(filtredByTag);
});

module.exports = router;