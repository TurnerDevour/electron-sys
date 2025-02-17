import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    base: '/sys/',
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'], // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
      })
    ],
    server: {
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 引入全局变量
          api: 'modern-compiler',
          // 引入index.scss覆盖文件
          additionalData: `@use "@renderer/assets/scss/theme.scss" as *;`
        }
      }
    }
  }
})
