const {app, BrowserWindow} = require('electron');

let win;
function creatWindow() {
    win = new BrowserWindow({height:600, width:800});
    win.loadFile('hello.html')
}

app.on('ready', creatWindow);