<script setup lang="ts">
import useCompressed from '@renderer/hooks/useCompressed'
import useVideo from '@renderer/hooks/useVideo'

const { startCompress } = useCompressed()
const { clearAllVideoFiles, resetVideoFile } = useVideo()

const stopCompress = () => {
  console.log('stop compress')
}
</script>

<template>
  <div class="flex justify-center mt-3">
    <el-button type="primary" @click="startCompress">开始转码</el-button>
    <el-button type="primary" @click="stopCompress">停止转码</el-button>
    <el-button type="primary" @click="clearAllVideoFiles">清空全部</el-button>
    <el-button type="primary" @click="resetVideoFile">重置视频</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
