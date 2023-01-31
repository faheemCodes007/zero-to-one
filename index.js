const express = require("express");
const app = express();
const http = require("http").createServer(app);
const Article = require("./model/article");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const randomBytes = require("crypto").randomBytes;
const USER = require("./model/user");

mongoose.connect("mongodb://127.0.0.1:27017/articles");
mongoose.connection.on("open", () => {
    console.log("DB Connected.");
});

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(__dirname + "/static/"));

let validatedSessions = {};

app.get("/article", async (req, res) => {
    let article = new Article({
        title: "Why you should trust ERA Real Estate",
        author: "Mr. Abdullah",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur fugit in illo nisi aut, facilis nostrum voluptatibus! Modi obcaecati aliquid rerum accusamus pariatur perspiciatis ipsa.",
        thumbnail: "/images/hslogo.png",
    });
    article
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

app.get("/getAllArticles", (req, res) => {
    Article.find()
        .exec()
        .then((doc) => {
            if (doc.length === 0) {
                return res.status(404).send({ message: "No articles found." });
            }
            return res.status(200).send(doc);
        });
});
app.get("/article/:article", (req, res) => {
    res.status(200).sendFile(__dirname + "/static/pages/article.html");

    // Article.find({title: req.params.article}).exec().then(doc => {
    //     res.status(200).send(doc)
    // }).catch(err => {
    //     console.log(err)
    //     res.status(500).send({error: err})
    // })
});
app.get("/getArticle", (req, res) => {
    let { title } = req.query;
    console.log(title);
    Article.find({ title: title.replaceAll("-", " ") })
        .exec()
        .then((doc) => {
            console.log(doc);
            return res.status(200).send(doc[0]);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err });
        });
    // res.status(200).send({ message: "Done" });
});

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/static/pages/index.html");
});
app.get("/signIn", (req, res) => {
    let referer = req.query.referer || "/";
    let session = req.cookies["session"];
    if (validatedSessions[session]) {
        res.status(200).redirect(referer);
        return;
    }
    res.status(200).sendFile(__dirname + "/static/pages/signIn.html");
});
app.post("/session", async (req, res) => {
    let referer = req.query.callback || "/";
    var user = await USER.find({ email: req.body.email })
        .select(" -createdAt -__v")
        .exec();
    if (user.length === 0) {
        res.status(404).send({
            message: "No account was associated with this email.",
        });
        return;
    }
    user = user[0];
    try {
        var correct = await bcrypt.compare(req.body.password, user.password);
    } catch (err) {
        console.log(err);
    }
    if (correct) {
        let cookie = randomBytes(32).toString("hex");
        user["password"] = undefined;
        validatedSessions[cookie] = user;
        res.status(200).cookie("session", cookie).redirect(referer);
        return;
    }
    res.status(401).send({ message: "Wrong password." });
});
// app.get("/register", (req, res) => {
//     let salt = bcrypt.genSaltSync()
//     let hash = bcrypt.hashSync("Faheem_007", salt)
//     let user = new USER({
//         name: "Muhammad Faheem",
//         email: "admin@zerotoone.com",
//         password: hash,
//     })
//     user.save().then(doc => {
//         console.log(doc)
//         res.status(200).send(doc)
//     }).catch(err => {
//         res.status(500).send({error: err})
//     })
// })
app.use((req, res) => {
    res.status(404).sendFile(__dirname + "/static/pages/pageNotFound.html");
});

http.listen(PORT, () => {
    console.log(`Server is up on localhost:${PORT}`);
});
