import {
  BrowserWindow,
  ipcMain,
  app,
  dialog,
  IpcMainInvokeEvent
} from 'electron'
import { Ffmpeg } from './ffmpeg.ts'
import { CompressOptions } from '../renderer/src/type.ts'

export default (win: BrowserWindow) => {
  const ffmpeg = new Ffmpeg()

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
  // 压缩
  ipcMain.handle(
    'compress',
    (_event: IpcMainInvokeEvent, options: CompressOptions) => {
      ffmpeg.init(win, options)
      ffmpeg.run()
    }
  )
  // 暂停
  ipcMain.on('stop', () => {
    ffmpeg.stop()
  })
}
