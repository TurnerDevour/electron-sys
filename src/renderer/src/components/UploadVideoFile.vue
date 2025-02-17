<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import useVideo from '@renderer/hooks/useVideo'

const { addVideoFile } = useVideo()
</script>

<template>
  <el-upload
    class="upload-container"
    action="#"
    :show-file-list="false"
    drag
    :http-request="addVideoFile"
    accept="video/*"
  >
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">拖拽文件到这里或者<em>点击上传</em></div>
  </el-upload>
</template>

<style scoped lang="scss"></style>
