<script setup lang="ts">
import UploadVideoFile from '@renderer/components/UploadVideoFile.vue'
import Actions from '@renderer/components/Actions.vue'
import VideoList from '@renderer/components/VideoList.vue'
</script>

<template>
  <div class="app-container">
    <upload-video-file />
    <actions />
    <video-list />
  </div>
</template>

<style lang="scss" scoped></style>
