import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
import './main.css'
import 'animate.css';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const app = createApp(App);
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(TDesign);
app.use(pinia)

app.mount('#app');