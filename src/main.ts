import { createApp } from 'vue'
import App from './App.vue'
//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import pinia from "./store";


const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.mount('#app')