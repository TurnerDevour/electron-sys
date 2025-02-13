import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      // 关闭窗口
      closeWindow: () => void
      // 窗口最小化
      minimizeWindow: () => void
      // 窗口最大化
      maximizeWindow: () => void
    }
  }
}
