import { BrowserWindow, ipcMain, app, dialog } from 'electron'

export default () => {
  // 退出应用
  ipcMain.on('quit-app', () => {
    app.quit()
  })
  // 窗口最小化
  ipcMain.on('minimize-window', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) {
      window.minimize()
    }
  })
  // 窗口最大化
  ipcMain.on('maximize-window', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    }
  })
  // 选择目录
  ipcMain.handle('select-directory', async () => {
    const { filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    return filePaths ? filePaths[0] : null
  })
}
