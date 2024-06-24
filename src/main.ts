import { createApp } from 'vue'
import App from './App.vue'
//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import "./permission";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import pinia from "./store";

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')