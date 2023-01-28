const express = require("express")
const app = express()
const http = require("http").createServer(app)
const Article = require("./model/article")
const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/articles")
mongoose.connection.on("open", () => {
    console.log("DB Connected.")
})

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + "/static/"))

app.get("/article", async (req, res) => {
    let article = new Article({
        title: "Why you should trust H&S Real Estate.",
        author: "Mr. Abdullah",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur fugit in illo nisi aut, facilis nostrum voluptatibus! Modi obcaecati aliquid rerum accusamus pariatur perspiciatis ipsa.",
        thumbnail: "/images/hslogo.png"
    })
    article.save().then(result => {
        console.log(result)
        res.status(201).send(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send({error: err})
    })
})

app.get("/getAllArticles", (req, res) => {
    Article.find().exec().then(doc => {
        if (doc.length === 0) {
            return res.status(404).send({message: "No articles found."})
        }
        return res.status(200).send(doc)
    })
})
app.get("/article/:article", (req, res) => {
    res.status(200).sendFile(__dirname + "/static/pages/article.html")

    // Article.find({title: req.params.article}).exec().then(doc => {
    //     res.status(200).send(doc)
    // }).catch(err => {
    //     console.log(err)
    //     res.status(500).send({error: err})
    // })
})



app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/static/pages/index.html")
})
app.use((req, res) => {
    res.status(404).sendFile(__dirname + "/static/pages/pageNotFound.html")
})

http.listen(PORT, () => {
    console.log(`Server is up on localhost:${PORT}`)
})