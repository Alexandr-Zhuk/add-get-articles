const articles = document.querySelector('.articles');
const addArticle = document.querySelector('.add-article-btn');
const artName = document.querySelector('input[name=article-name]');
const artText = document.querySelector('textarea[name=articleText]');


console.log(artText);

const renderArticles = async () => {
    const listArticles = await axios.get('/articles/list');

    console.log(listArticles);

    let html = '';

    listArticles.data.forEach((item) => {
        html += `<div class="article-item">
                    <div class="article-name">${item.name}</div>
                    <div class="article-text hidden">${item.text}</div>
                </div>`
    });

    articles.innerHTML = html;

    
};

renderArticles();

addArticle.addEventListener('click', async () => {
    const newArticle = await axios.post('/articles/list', {nameArt: artName.value, textArt: artText.value});
    renderArticles();
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
        console.log(textAllArt);
        
    }
});
