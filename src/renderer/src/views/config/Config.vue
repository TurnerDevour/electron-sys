<script setup lang="ts">
import { useFileConfigStore } from '@renderer/store/modules/useFileStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileConfigStore = useFileConfigStore()
const fileConfig = fileConfigStore.fileConfig

const handleSelectDirectory = async () => {
  const directory = await window.api.selectDirectory()
  if (directory) {
    fileConfig.saveFilePath = directory
  }
}

const handleBack = () => {
  router.push({ name: 'Home' })
}
</script>

<template>
  <div class="app-container">
    <div class="mb-2 bg-white p-4 shadow-sm rounded">
      <div class="mb-2">帧数：</div>
      <el-select
        v-model="fileConfig.frameRate"
        placeholder="请选择"
        style="width: 500px"
      >
        <el-option
          v-for="(item, index) in fileConfig.frameRateList"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </div>
    <div class="mb-2 bg-white p-4 shadow-sm rounded">
      <div class="mb-2">分辨率：</div>
      <el-select
        v-model="fileConfig.resolution"
        placeholder="请选择"
        style="width: 500px"
      >
        <el-option
          v-for="(item, index) in fileConfig.resolutionList"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </div>
    <div class="mb-2 bg-white p-4 shadow-sm rounded">
      <div class="mb-2">保存视频路径：</div>
      <el-input
        v-model="fileConfig.saveFilePath"
        placeholder="请选择"
        style="width: 500px"
        disabled
      />
      <el-button class="ml-2" type="primary" @click="handleSelectDirectory">
        选择目录
      </el-button>
    </div>
    <div class="w-full flex justify-center mt-16">
      <el-button class="mr-10" @click="handleBack">保存并返回</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
