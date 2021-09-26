import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import i18n from './i18n'
import mitt from 'mitt';

const emitter = mitt();

const app = createApp(App);

app.config.globalProperties.$emitter = emitter;

app.use(store);
app.use(router);
app.use(i18n);

app.mount('#app');
