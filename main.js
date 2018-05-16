'use strict'

const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
let mainWindow = null
const idler = require('./idler')


app.on('ready', function () {
  mainWindow = new BrowserWindow({
    frame: false,
    height: 700,
    resizable: true,
    //set resizable to false
    // width: 900
    width: 368,
    icon: path.join(__dirname, 'img/icons/png/apple-icon-60x60.png')
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

  const sendIdleUpdate = msg => mainWindow.webContents.send('idle-update', msg)
  idler.on('update', sendIdleUpdate)
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
