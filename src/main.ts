import { createApp } from 'vue'
import App from './App.vue'
//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import pinia from "./store";
import router from "./router";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')