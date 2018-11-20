const {ipcMain, dialog, BrowserWindow, app} = require('electron');


function createwindow(){
    let win = new BrowserWindow({width: 800, height: 600});
    win.on('closed', () => {
        win = null
    });

// 加载远程URL
    //win.loadURL('https://github.com')
    win.loadFile('first.html');
}


ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, (file) => {
        if(file){
            event.sender.send('selected-dir', file);
        }
    });
});

app.on('ready', createwindow);