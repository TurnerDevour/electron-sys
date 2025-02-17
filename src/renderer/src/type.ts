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
