const FEATUREDARTICLES = document.querySelector(
    "body > div > div.featured-container"
);
const MAINBANNERBUTTON = document.querySelector("a#mainBannerButton");
const BANNER = document.querySelector("body > div.app > div.banner");
const NAV = document.querySelector("body > nav");
const AUTHLINK = document.querySelector("body > nav > div > a:nth-child(4)");
const LOADER = document.querySelector("#circularLoader")

document.body.onload = async () => {
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
                <p class="author">${article.author}</p>
                <p>
                ${article.description}
                </p>
            </div>
        </a>
    </div>
    `;
    }
    let isSignedIn = await fetch("/isSignedIn", {
        credentials: "include",
        method: "POST",
    });
    let user = await isSignedIn.json();
    if (isSignedIn.status === 200) {
        AUTHLINK.textContent = "Log Out";
        AUTHLINK.setAttribute("href", "/signOut?referrer=/");
        LOADER.style.display = "none"
    } else {
        AUTHLINK.textContent = "Sign In"
        AUTHLINK.setAttribute("href", "/signIn?referrer=/")
        LOADER.style.display = 'none'
    }
};

document.body.onscroll = (ev) => {
    let height = BANNER.clientHeight;
    if (window.scrollY >= height) {
        NAV.setAttribute("whiteBackground", "true");
        return;
    }
    NAV.setAttribute("whiteBackground", "false");
};
