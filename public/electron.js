const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const isDev = require('electron-is-dev')

let splashWindow
let mainWindow

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 340,
    height: 340,
    frame: false
  })
  splashWindow.loadURL(
    `file://${path.join(__dirname, '../public/splash.html')}`
  )
  splashWindow.on('closed', () => (mainWindow = null))
}

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 })
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', () => {
  createSplashWindow()
  setTimeout(() => {
    splashWindow.close()
    createWindow()
  }, 3000)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
