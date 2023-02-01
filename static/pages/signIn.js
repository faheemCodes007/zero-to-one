const FORM = document.querySelector("body > div > div > form")

document.body.onload = () => {
    let referrer = new URLSearchParams(location.search).get("referrer")
    FORM.setAttribute("action", `/session?referrer=${referrer}`)
    document.querySelector("#email").value = "admin@zerotoone.com"
    document.querySelector("#password").value = "Faheem_007"
    document.querySelector("body > div > div > form > button").click()
}