const FEATUREDARTICLES = document.querySelector(
    "body > div > div.featured-container"
);
const MAINBANNERBUTTON = document.querySelector("a#mainBannerButton");
const BANNER = document.querySelector("body > div.app > div.banner");
const NAV = document.querySelector("body > nav");

document.body.onload = async () => {
    console.log("Here");
    let articles = await fetch("/getAllArticles");
    let json = await articles.json();
    for (let article of json) {
        MAINBANNERBUTTON.setAttribute(
            "href",
            `/article/${article.title.replaceAll(" ", "-")}`
        );
        FEATUREDARTICLES.innerHTML += `<div class="article-container">
        <a href="/article/${article.title.replaceAll(" ", "-")}">
            <img src=${article.thumbnail} alt="H&S Logo">
            <div class="info-container">
                <h1>
                    ${article.title}
                </h1>
                <p>
                ${article.description}
                </p>
            </div>
        </a>
    </div>
    `;
    }
};

document.body.onscroll = (ev) => {
    let height = BANNER.clientHeight;
    console.log(window.scrollY);
    // console.log(window.s)
    if (window.scrollY >= height) {
        NAV.setAttribute("whiteBackground", "true");
        return;
    }
    NAV.setAttribute("whiteBackground", "false");
};
