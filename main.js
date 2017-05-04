var dev = false;
if (process.argv[2] === 'dev') dev = true;

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  if (dev) {
    //Set up dev environment
    win.webContents.openDevTools()

    var express = require('express')
    var app = express()

    app.get('/CMSwindow', function (req, res) {
      res.sendFile(__dirname + '/localApp.json')
    })

    app.listen(3000, function () {
      console.log('Server listening on port 3000')
    })
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
