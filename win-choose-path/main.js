const {app, BrowserWindow}= require('electron');
//const autoUpdater = require("electron-updater").autoUpdater;

let win;
function createWindow() {
    win = new BrowserWindow({height:600, width:800});
    win.loadFile("choose-path.html");
}
// autoUpdater.setFeedURL('http://localhost:8899/');
// autoUpdater.checkForUpdates();
// autoUpdater.on('update-downloaded', function () { //下载完成后执行 quitAndInstall
//
//     autoUpdater.quitAndInstall(); //关闭软件并安装新版本
// });

app.on("ready", createWindow);