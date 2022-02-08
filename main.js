const { app, BrowserWindow, remote } = require('electron');
const { readdirSync, statSync }  = require('fs');
const { join } = require('path');

const baseLocation = './manga-1';

function createWindow() {
    let win = new BrowserWindow({
        width: 1800,
        height: 1200,
        webPreferences: {
            enableRemoteModule: true,
            contextIsolation : false,
            nodeIntegration: true
        }
    })

    win.toggleDevTools()
    win.loadFile('./public/index.html')
}
app.on('ready', createWindow)
