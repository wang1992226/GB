import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) =>{
  const env = loadEnv(mode,process.cwd(),'')
  return {
    plugins: [
      vue(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/style/style.scss";`
        }
      }
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: "9000",//端口
      // host: "localhost",//ip地址例如192.168.1.177
      host: '0.0.0.0',
      // open: true,//服务启动时自动在浏览器中打开应用
      // 反向代理配置
      // proxy: { //配置代理
      //   '/api': {
      //     target: "https://api.yizhijiao.cn",//例子:http://192.168.1.177:8080 或测试服务器https://xxxx.com
      //     changeOrigin: true,///设置访问目标地址允许跨域
      //     rewrite: (p) => p.replace(/^\/api/, '')
      //   },
      // }
    },
    define:{
      __APP_ENV__:JSON.stringify(env.APP_ENV),
      "process.env":env
    }
  }
})
