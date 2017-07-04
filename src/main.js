import Vue from 'vue'


import axios from 'axios';
Vue.prototype.axios = axios;

import 'vue-awesome/icons'

import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

import router from './router'

import VueResource from 'vue-resource'
Vue.use(VueResource);


import App from './App'

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/css/index.css'
Vue.use(MintUI);


const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')


Vue.prototype.goback = function() {
    router.back();
}

Vue.prototype.passwordFix = function(word) {
    var len = 64 - word.length;
    for (var i = 0; i < len; i++) {
        word = word + '0'
    }
    return word;
}

document.addEventListener('deviceready', function() {
    console.log('deviceready');
}, false);


window.config = {
    rootUrl: 'http://125.69.67.12:7080/hisapi'
}

