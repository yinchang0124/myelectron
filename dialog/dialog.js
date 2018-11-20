const {ipcRenderer, shell} = require('electron');
const selectDirBtn = document.getElementById('select-dir');
const openwechat = document.getElementById('open')

selectDirBtn.addEventListener('click', () => {
   ipcRenderer.send('open-file-dialog');
});

ipcRenderer.on('selected-dir', (event, path) => {
    document.getElementById('selected-file').innerHTML = `你已选择: ${path}`
});





const fileManagerBtn = document.getElementById('open');

fileManagerBtn.addEventListener('click', () =>{
    shell.openItem('/home/yc/run.sh');

});

var path1 = '/home/yc/2.txt';
shell.openItem(path1);

