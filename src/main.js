import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
import './main.css'
import 'animate.css';
const app = createApp(App);

app.use(router);
app.use(TDesign);

app.mount('#app');