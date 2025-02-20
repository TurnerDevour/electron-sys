// 主线程通知类型
export enum MainProcessNoticeType {
  ERROR = 'error',
  END = 'end',
  PROGRESS = 'progress',
  DIRECTORY_CHECK = 'directory_check',
  STOP = 'stop'
}

// 视频状态
export enum VideoState {
  READY = 'ready',
  COMPRESS = 'compress',
  ERROR = 'error',
  FINISH = 'finish',
  STOP = 'stop'
}

export type VideoType = {
  name: string
  path: string
  size: string
  progress: number
  state: VideoState
}

export type CompressOptions = {
  file: VideoType
  fps: number
  size: string
  videoBitrate: number
  saveDirectory: string
}
