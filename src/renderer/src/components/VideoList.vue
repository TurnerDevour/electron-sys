<script setup lang="ts">
import { useFileConfigStore } from '@renderer/store/modules/useFileStore'

const fileConfigStore = useFileConfigStore()
const fileConfig = fileConfigStore.fileConfig
</script>

<template>
  <div
    v-if="fileConfig.fileList.length > 0"
    class="border-2 border-[#10B981] mt-3"
  >
    <el-scrollbar> </el-scrollbar>
  </div>
  <div v-else class="border-dashed border-2 border-[#10B981] rounded-md mt-3">
    <el-empty description="暂无视频信息" />
  </div>
</template>

<style scoped lang="scss"></style>
