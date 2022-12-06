const express =  require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();

mongoose.connect("mongodb+srv://harsh-developer:aA12345678@cluster0.lxbes.mongodb.net/urlShortnerDB", {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}));

app.get("/", async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render("index", {shortUrls: shortUrls});
})

app.post("/shortUrls", async(req, res) => {
    await ShortUrl.create({longUrl: req.body.fullUrl})
    res.redirect("/")
})

app.get("/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne ({shortUrl: req.params.shortUrl});
    if(shortUrl === null){
        return res.sendStatus(404)
    }
    // shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.longUrl);
})

app.listen(process.env.PORT || 3000);