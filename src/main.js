import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

import VueToastr from "vue-toastr";

import 'animate.css';

import "@fortawesome/fontawesome-free/js/all"
import "@/assets/css/theme.css"

Vue.config.productionTip = false;

Vue.use(VueToastr, {
    defaultProgressBar: true,
    defaultPosition: "toast-bottom-left"
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')