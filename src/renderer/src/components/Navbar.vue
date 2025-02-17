<script setup lang="ts">
import { useRouter } from 'vue-router'
import logo from '@renderer/assets/images/icon64.png'
import listImage from '@renderer/assets/images/list.png'
import closeImage from '@renderer/assets/images/close.png'
import expendImage from '@renderer/assets/images/expend.png'
import shrinkImage from '@renderer/assets/images/shrink.png'

const router = useRouter()

const toConfig = () => {
  router.push('/config')
}

const close = () => {
  window.api.quiteApp()
}

const shrink = () => {
  window.api.minimizeWindow()
}

const expand = () => {
  window.api.maximizeWindow()
}
</script>

<template>
  <div class="flex items-center w-full h-20 px-10 drag">
    <div class="flex flex-1 items-center">
      <div class="h-8 w-8">
        <el-image :src="logo" fit="cover" alt="logo" />
      </div>
      <h1 class="text-2xl ml-2 font-[ZhiMangXing]">绘压</h1>
    </div>

    <div class="flex items-center">
      <div class="h-6 w-6 cursor-pointer no-drag">
        <el-dropdown trigger="click">
          <el-image :src="listImage" fit="cover" alt="list" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toConfig">配置信息</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-divider direction="vertical" />
      <div class="h-6 w-6 cursor-pointer no-drag" @click="shrink">
        <el-image :src="shrinkImage" fit="cover" alt="shrink" />
      </div>
      <div class="h-6 w-6 mx-3 cursor-pointer no-drag" @click="expand">
        <el-image :src="expendImage" fit="cover" alt="expand" />
      </div>
      <div class="h-6 w-6 cursor-pointer no-drag" @click="close">
        <el-image :src="closeImage" fit="cover" alt="close" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
