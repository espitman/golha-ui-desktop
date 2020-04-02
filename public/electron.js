const electron = require('electron')
const app = electron.app
// const globalShortcut = electron.globalShortcut
const BrowserWindow = electron.BrowserWindow
const screen = electron.screen

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
  const { width } = screen.getPrimaryDisplay().workAreaSize
  const winWidth = Math.floor(width * 0.9)
  const winHeight = Math.floor((winWidth * 9) / 16)

  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    frame: false,
    titleBarStyle: 'hidden',
    resizable: false
  })
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', () => {
  // globalShortcut.register('CmdOrCtrl+R', () => {})
  // globalShortcut.register('Tab', () => {})
  createWindow()
  // createSplashWindow()
  // setTimeout(() => {
  //   splashWindow.close()
  //   createWindow()
  // }, 3000)
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
