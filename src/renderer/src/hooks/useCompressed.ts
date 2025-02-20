import { useFileConfigStore } from '@renderer/store/modules/useFileStore'
import { VideoState, VideoType } from '@renderer/type'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

export default () => {
  const fileConfigStore = useFileConfigStore()
  const fileConfig = fileConfigStore.fileConfig
  const currentVideo = ref<VideoType>()
  const isRun = ref<boolean>(false)

  // 验证
  const validate = () => {
    let messageText = ''
    if (fileConfig.saveFilePath.trim() === '') {
      messageText = '视频保存目录不能为空'
    }
    if (fileConfig.fileList.length === 0) {
      messageText = '请选择视频文件'
    }
    if (!currentVideo.value && fileConfig.fileList.length != 0) {
      messageText = '视频压缩完毕'
    }
    if (messageText) {
      ElMessage({ message: messageText, type: 'warning', grouping: true })
    }
    return messageText === ''
  }

  // 获取当前需要压缩的视频
  const getCompressFile = () => {
    currentVideo.value = fileConfig.fileList.find(
      (video) => video.state == VideoState.READY
    )
    if (currentVideo.value) {
      currentVideo.value.state = VideoState.COMPRESS
    } else {
      isRun.value = false
    }
  }

  const startCompress = () => {
    fileConfig.fileList.forEach((video) => {
      if (video.state === VideoState.STOP) {
        video.state = VideoState.READY
      }
    })
    getCompressFile()
    if (!validate()) return
    window.api.compress({
      file: { ...currentVideo.value! },
      fps: Number(fileConfigStore.fileConfig.frameRate),
      size: fileConfigStore.fileConfig.resolution,
      saveDirectory: fileConfigStore.fileConfig.saveFilePath
    })
  }

  const run = () => {
    if (isRun.value) return
    isRun.value = true
    startCompress()
  }

  return { run, isRun }
}
