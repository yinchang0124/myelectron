const {app, BrowserWindow} = require("electron");
let win;
function create() {
    win = new BrowserWindow({height:600, width:800});
    win.loadFile("hzh.html");
}

app.on("ready",  create);