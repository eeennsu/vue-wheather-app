import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@/assets/main.css';

const app = createApp(App);

library.add(fas);
library.add(far)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
