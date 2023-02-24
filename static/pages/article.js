const ARTICLE = document.querySelector("body > div > div.left");

document.body.onload = async () => {
    let res = await fetch(
        `/getArticle?title=${location.pathname.split("/")[2]}`
    );
    let json = await res.json();
    let date = new Date(json.published);
    document.title = `${json.title} | ZeroToOne`
    ARTICLE.innerHTML += `<div class="article-info">
    <p class="author">Published By ${json.author} on ${date.getDate()}-${
        date.getMonth() + 1
    }-${date.getFullYear()}</p>
</div>
<div class="article-container">
    <div class="article-thumbnail">
        <img src="${json.thumbnail}" alt="">
    </div>
    <p class="article-image-alt">Glyph logo</p>
    <h1>${json.title}</h1>
    <div class="article-content">
    <p>${json.description}</p>
    </div>
    <img src="/images/banner.jpg" alt="">
    <p class="article-image-alt">Glyph logo</p>
    <div class="article-content">
    <p>${json.description}</p>
    </div>
</div>`;
};
