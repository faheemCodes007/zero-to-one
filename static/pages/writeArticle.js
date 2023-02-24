const mainTitle = document.querySelector("#mainTitle")
const mainContent = document.querySelector("#mainContent")
const previewTitle = document.querySelector("body > div.article-preview > p.title-container")
const previewBody = document.querySelector("body > div.article-preview > div")

mainTitle.addEventListener("input", (ev) => {
    ev.preventDefault()
    previewTitle.textContent = mainTitle.value;
})