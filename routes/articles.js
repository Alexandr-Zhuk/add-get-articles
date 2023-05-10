const express = require('express');
const Ajv = require('ajv');

const ajv = new Ajv();

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

router.post('/personal/create', (req, res) => {
    const schema = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                minLength: 2,
                maxLength: 20
            },
            surname: {
                type: 'string',
                minLength: 2,
                maxLength: 20
            },
            age: {
                type: 'integer'   
            },
            email: {
                type: 'string',
                pattern: '^[a-z0-9_-]+@[a-z0-9]+\.[a-z]{2,6}$'
            },
            phone: {
                type: 'string',
                pattern: '^\\+380[0-9]{9}$'
            }
        },
        required: ['name', 'email', 'phone'],
        additionalProperties: false,
    };
    let data = req.body;

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid){
        res.json(validate.errors[0].message);
    }else{
        res.json('validated!');
    }
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