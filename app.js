const express = require('express');
const articlesRouter = require('./routes/articles');

const server = express();

server.listen(3000);

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static(__dirname + '/public'));
server.use('/articles', articlesRouter);