import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffProbePath from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'

ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffProbePath)

export default class Ffmpeg {
  constructor() {}
}
