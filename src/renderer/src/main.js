import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
import 'primeicons/primeicons.css';
import MyPreset from './assets/theme';

createApp(App).use(router).use(PrimeVue, { theme: {preset: MyPreset} }).use(DialogService).mount('#app')
