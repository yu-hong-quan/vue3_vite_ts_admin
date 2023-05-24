import { createApp } from 'vue';
import App from '@/App.vue';
import 'element-plus/dist/index.css';

// 获取当前环境变量
console.log(import.meta.env);


// 获取应用实例
const app = createApp(App);
// 将应用挂载到挂载点上
app.mount('#app');
