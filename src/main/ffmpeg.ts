import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffProbePath from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import { BrowserWindow } from 'electron'
// @ts-ignore
import { CompressOptions, MainProcessNoticeType } from '../renderer/src/type.ts'
import path from 'node:path'
import { renameSync } from 'fs'

ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffProbePath.path)

export class Ffmpeg {
  constructor(
    private window?: BrowserWindow,
    private options?: CompressOptions,
    private ffmpeg?: ffmpeg.FfmpegCommand
  ) {}

  init(win: BrowserWindow, options: CompressOptions) {
    this.window = win
    this.options = options
    this.ffmpeg = ffmpeg(this.options.file.path)
    return this
  }

  progressEvent(progress) {
    console.log('Processing: ' + progress.percent + '% done')
  }

  error(err) {
    console.log('An error occurred: ' + err.message)
  }

  end() {
    console.log('Processing finished !')
    renameSync(this.tempFile(), this.getSaveFilePath())
  }

  stop() {
    try {
      this.ffmpeg!.kill('SIGKILL')
      this.window!.webContents.send(
        'mainProgressNotice',
        MainProcessNoticeType.STOP
      )
    } catch (err) {
      this.window!.webContents.send(
        'mainProgressNotice',
        MainProcessNoticeType.ERROR,
        err
      )
    }
  }

  private getSaveFilePath() {
    const info = path.parse(this.options!.file.name)
    return path.join(this.options!.saveDirectory, `${info.name}${info.ext}`)
  }

  private tempFile() {
    return path.join(this.options!.saveDirectory, `.temp`)
  }

  run() {
    this.ffmpeg!.videoCodec('libx264')
      .format('mp4')
      .outputOptions('-crf', '23') // 设置 CRF 值为 23
      .fps(this.options!.fps)
      .size(this.options!.size)
      .on('progress', this.progressEvent.bind(this))
      .on('error', this.error.bind(this))
      .on('end', this.end.bind(this))
      .save(this.tempFile()) // 保存的文件路径
  }
}
