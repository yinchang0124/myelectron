var multer = require("multer");
var express = require('express');

var app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        var str = file.originalname.split('.');
        cb(null, Date.now()+'.'+str[1]);
    }
});
var upload = multer({ storage: storage });
app.post("/uploadImgs",upload.array("file",20),function(req,res,next){

    var arr = [];
    for(var i in req.files){

        arr.push(req.files[i].path);
    }
    res.json({
        code:200,
        data:arr
    })
})
