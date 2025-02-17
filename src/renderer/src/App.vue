<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Navbar from '@renderer/components/Navbar.vue'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <Navbar />
    <router-view />
  </el-config-provider>
</template>
