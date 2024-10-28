const express = require('express');
const fileUpload = require('express-fileupload')

const app = express();

app.use(fileUpload())

app.post('/upload', (req, res) => {
    console.log("request came to me /upload");
    if (req.files === null) {
        return res.status(400).json({
            message: "no file uploaded"
        })
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, error => {
        if (error) {
            console.log("error: " + error)
            return res.status(500).send(error)
        }
        res.json({
            fileName: file.name,
            filePath: `/uploads/${file.name}`
        })
    })
})
app.listen(5000, () => console.log("server started on port: " + 5000));