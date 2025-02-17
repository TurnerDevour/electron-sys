import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// 渲染器的自定义 API
const api = {
  // 退出应用
  quiteApp: () => {
    ipcRenderer.send('quit-app')
  },
  // 窗口最小化
  minimizeWindow: () => {
    ipcRenderer.send('minimize-window')
  },
  // 窗口最大化
  maximizeWindow: () => {
    ipcRenderer.send('maximize-window')
  },
  // 选择目录
  selectDirectory: async () => {
    return await ipcRenderer.invoke('select-directory')
  }
}

// 只有在启用上下文隔离的情况下，才使用 'contextBridge' API 将 Electron API 暴露给渲染器，否则只需添加到 DOM 全局。
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
