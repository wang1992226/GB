// import './assets/main.css'

import {createApp} from 'vue'
// import axios from "axios"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'
import App from './App.vue'
import config from "../config"
// import vue from "@vitejs/plugin-vue";

const app = createApp(App)
// if (typeof window.process === 'object' && window.process.type === 'renderer') {
//     // 这是在Electron的渲染进程中
//     const {ipcRenderer} = require('electron');
//     // 创建一个全局方法或变量
//     app.config.globalProperties.$globalIpcRenderer = {
//         send: ipcRenderer.send.bind(ipcRenderer),
//         on: ipcRenderer.on.bind(ipcRenderer),
//     };
//
// } else {
//     // 这可能是在浏览器环境中
//     console.error('Electron环境未检测到，无法使用ipcRenderer');
// }

app.config.silent = true
app.config.globalProperties.$CONFIG = config;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
window.ASYNC_VALIDATOR_NO_WARNING = 0

console.warn = () => {};


app
    .use(ElementPlus)
    .use(router)
    // .use(axios)
    .mount('#app')


