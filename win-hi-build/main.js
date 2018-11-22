const {app, BrowserWindow} = require('electron');

let win;
function hi() {
    win = new BrowserWindow({width:800, height: 600});
    win.loadFile('hi.html');
}

app.on('ready', hi);