'use strict'

const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
let mainWindow = null

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    frame: false,
    height: 700,
    resizable: true,
    width: 900
    // width: 368
    //need to uncomment back in width
  })
  //one approach
  // mainWindow.loadURL('file://'+__dirname+'/app/index.html')
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
)

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
