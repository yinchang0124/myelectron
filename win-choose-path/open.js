const {shell} = require('electron');


const fileManagerBtn = document.getElementById('open');

fileManagerBtn.addEventListener('click', () =>{
    shell.openItem('C:\\Users\\yc\\Desktop\\1.txt');

});
