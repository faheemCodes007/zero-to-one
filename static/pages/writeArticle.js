const mainTitle = document.querySelector("#mainTitle")
const mainContent = document.querySelector("#mainContent")
const previewTitle = document.querySelector("body > div.article-preview > p.title-container")
const previewBody = document.querySelector("body > div.article-preview > div")
const addParagraph = document.querySelector("body > div.content-tools > i:nth-child(1)")
const contentPreview = document.querySelector("body > div.app > div.content-container > div")
const addImage = document.querySelector("body > div.content-tools > i:nth-child(2)")

document.body.onload = () => {
    mainTitle.addEventListener("input", (ev) => {
        ev.preventDefault()
        previewTitle.textContent = mainTitle.value;
    })
    addParagraph.addEventListener("click", (ev) => {
        ev.preventDefault();
        let p = document.createElement("p")
        p.classList += "content-paragraph"
        p.setAttribute("contentEditable", "true")
        contentPreview.appendChild(p)
        p.textContent = "Tap to edit..."
    })
    addImage.addEventListener("click", (ev) => {
        ev.preventDefault();
        let file = document.createElement("input")
        file.setAttribute("type", "file")
        file.setAttribute("accept", "image/*")
        file.click()
        file.onchange = (ev) => {
            let image = document.createElement("img")
            image.src = URL.createObjectURL(file.files[0])
            contentPreview.appendChild(image)
        }
    })
}