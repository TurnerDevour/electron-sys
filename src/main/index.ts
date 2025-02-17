import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon512 from '../../resources/icon512.png?asset'
import ipc from './ipc.ts'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // 不显示窗口
    frame: false, // 无边框窗口
    autoHideMenuBar: true, // 隐藏菜单栏
    resizable: false, // 不允许缩放
    ...(process.platform === 'linux' ? { icon512 } : { icon: icon512 }), // 使用 icon512.png 作为应用程序图标
    // 为了在开发中使用自动重载，禁用 nodeIntegration
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // 加载应用的 index.html
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 打开外部链接时使用默认浏览器
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  //基于 electron-vite cli 的渲染器的 HMR。
  //加载远程 URL 进行开发，或加载本地 html 文件进行生产。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 当 Electron 完成初始化并准备好创建浏览器窗口时，将调用此方法。某些 API 只能在此事件发生后使用。
app.whenReady().then(() => {
  // 为 Windows 设置应用用户模型 ID，以便在 Windows 10 上显示正确的应用图标和通知
  electronApp.setAppUserModelId('com.electron')

  // 开发中 F12 的默认打开或关闭 DevTools并在生产环境中忽略 CommandOrControl + R。
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // 监听渲染器进程的事件
  ipc()

  createWindow()

  app.on('activate', function () {
    //在 macOS 上，当单击 Dock 图标并且没有打开其他窗口时，通常会在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当所有窗口都关闭时退出，macOS 除外。在那里，应用程序及其菜单栏通常会保持活动状态，直到用户使用 Cmd + Q 明确退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在此文件中，您可以包含应用程序的特定主进程代码的其余部分。您也可以将它们放在单独的文件中，并在此处要求它们。
