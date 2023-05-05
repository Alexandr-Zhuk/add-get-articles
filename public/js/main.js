const articles = document.querySelector('.articles');
const addArticle = document.querySelector('.add-article-btn');
const artName = document.querySelector('input[name=article-name]');
const artText = document.querySelector('textarea[name=articleText]');
const tagSearch = document.querySelector('input[name=tag-searc-inp]');

let listArticles;
const renderArticles = async (listA) => {

    let html = '';

    listA.data.forEach((item) => {
        let tags = item.tags.join(', ');
       
        html += `<div class="article-item">
                    <div class="article-name">${item.name} <span class="span-tags">(${tags})</span></div>
                    <div class="article-text hidden">${item.text}</div>
                </div>`
    });

    articles.innerHTML = html;
};

const getArticleList = async () => {
    listArticles = await axios.get('/articles/list');
    renderArticles(listArticles);
};

getArticleList();

addArticle.addEventListener('click', async () => {
    listArticles = await axios.post('/articles/list', {nameArt: artName.value, textArt: artText.value});
    renderArticles(listArticles);
    artName.value = '';
    artText.value = '';
});


articles.addEventListener('click', (ev) => {
    if(ev.target.classList.contains('article-name')){
        const textArticle = ev.target.parentNode.querySelector('.article-text');
        const textAllArt = articles.querySelectorAll('.article-text');
        textAllArt.forEach((item) => {
            if(item === textArticle){
                item.classList.toggle('hidden');
            }else{
                item.classList.add('hidden');
            }
        });
    }
});

tagSearch.addEventListener('input', async () => {
    const tagsList = await axios.post('/articles/tags', {tag: tagSearch.value});
    renderArticles(tagsList);
});
