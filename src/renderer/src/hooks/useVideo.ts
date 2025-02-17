import { UploadRequestOptions } from 'element-plus'
import { useFileConfigStore } from '@renderer/store/modules/useFileStore'
import { VideoState } from '@renderer/type'
import { formatFileSize } from '@renderer/utils/tools'

export default () => {
  const fileConfigStore = useFileConfigStore()
  const fileConfig = fileConfigStore.fileConfig

  // 添加视频文件
  const addVideoFile = (fileOptions: UploadRequestOptions) => {
    console.log(fileOptions)
    const name = fileOptions.file.name
    const path = fileOptions.file.path
    const size = formatFileSize(fileOptions.file.size)

    fileConfig.fileList.push({
      name,
      path,
      size,
      progress: 0,
      state: VideoState.READY
    })
  }

  // 清空视频文件
  const clearVideoFile = () => {
    console.log('Clearing video file')
  }

  // 清空全部视频文件
  const clearAllVideoFiles = () => {
    console.log('Clearing all video files')
  }

  // 重置视频文件
  const resetVideoFile = () => {
    console.log('Resetting video file')
  }

  return { addVideoFile, clearVideoFile, clearAllVideoFiles, resetVideoFile }
}
