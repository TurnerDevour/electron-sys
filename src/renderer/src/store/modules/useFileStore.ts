import { defineStore } from 'pinia'
import { ref } from 'vue'
import { VideoType } from '@renderer/type'

export const useFileConfigStore = defineStore(
  'fileConfig',
  () => {
    const fileConfig = ref({
      saveFilePath: '', // 保存路径
      // 视频分辨率配置
      resolutionList: [
        '1920x1080',
        '1280x720',
        '720x480',
        '640x480',
        '320x240'
      ],
      resolution: '1920x1080', // 分辨率
      frameRateList: ['60', '50', '30', '25', '24'], // 帧率列表
      frameRate: '60', // 帧率
      fileList: [] as VideoType[]
    })

    return {
      fileConfig
    }
  },
  {
    persist: true
  }
)
