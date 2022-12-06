const express =  require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();

mongoose.connect("mongodb+srv://gautam:gautam123@cluster0.xorxp.mongodb.net/ShortUrl_react", {
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