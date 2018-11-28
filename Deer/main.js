const {app, BrowserWindow, ipcMain} = require("electron");
const path = require('path');
const url = require('url');
const os = require('os');
const isDev = require('electron-is-dev');
const windowState = require('electron-window-state');
const initLogger = require('./utils/logger');
const appInfo = require('./package.json');
const Store = require('electron-store');

if(isDev){
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
    });
}

let win;
let logger;

var electronStore = new Store();
global.electronStore = electronStore;

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.exit()
}

function createWindow() {
    let lastWindowState = windowState({
        defaultWidth: 800,
        defaultHeight: 600
    });

    win = new BrowserWindow({
        width: lastWindowState.width,
        height: lastWindowState.height,
        x: lastWindowState.x,
        y: lastWindowState.y,
        minWidth: 800,
        minHeight: 600,
        backgroundColor: '#F8F8FF',
        icon: './assets/images/Deer-128.png',
        show: false
    });
    logger.info('deer window is created');

    win.setMenu(null);

    win.loadFile(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file',
        slashes: true
    }));

    lastWindowState.manage(win);

    win.once('ready-to-show', () => {
        win.show();
        logger.info('Deer window is shown');

        // Show DevTools for debugging.
        if (isDev) {
            win.webContents.openDevTools({ mode: 'detach' })
        }
    });

    // Emitted when user clicks on close button.
    win.on('close', (e) => {
        // Prevents the window from closing
        e.preventDefault();

        win.webContents.send('close-main-window')
    });

    // Emitted when the window is closed.
    win.on('closed', () => {
        logger.info('Deer window is closed');

        // De-reference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// Installs developer tool extensions for debugging.
function installDevToolsExtensions () {
    const devtron = require('devtron');
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } =
        require('electron-devtools-installer');

    // Install React Developer Tool and Redux DevTool to debug React and Redux.
    const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
    extensions.forEach(extension => {
        installExtension(extension)
            .then((name) => logger.log(`Added Extension: ${name}`))
            .catch((err) => logger.log('An error occurred: ', err))
    });

    // Install devtron to debug Electron.
    devtron.install()
}

app.on('second-instance', () => {
    if (win) {
        if (win.isMinimized()) win.restore();
        win.focus()
    }
});

app.on('ready', () => {
    // Initialize logger
    logger = initLogger();
    logger.info(`${appInfo.name}(${appInfo.version}) has started on ` +
        `${os.type()}(${os.release()}) on ${os.platform()}(` +
        `${os.arch()})`);

    if (isDev) {
        installDevToolsExtensions()
    }

    // Create and load main window.
    createWindow()
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it's common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

ipcMain.on('close-confirm', () => {
    if (win !== null) {
        win.destroy()
    }
});
