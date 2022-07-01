const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const mongoose=require('mongoose');
const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

mongoose.connect("mongodb+srv://sumandev:aBosU15RXTGZYkKq@cluster0.4du2i.mongodb.net/durbinpro?retryWrites=true&w=majority", {useNewUrlParser: true})
.then(() => console.log('mongodb running on 27017'))
.catch(err => console.log((err)))

app.post("/extract-text", (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        res.send(result.text);
    });
});

app.listen(3000);