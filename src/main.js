import Vue from 'vue'


import store from '@/store'


import axios from 'axios';
Vue.prototype.axios = axios;

import 'vue-awesome/icons'

import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

import router from './router'

import api from '@/fetch/api.js';
Vue.prototype.api = api;

import App from './App'

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/css/index.css'
Vue.use(MintUI);

import md5 from 'js-md5';

const app = new Vue({
    router,
    store,
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
    word = md5(word);
    return word;
}

document.addEventListener('deviceready', function() {
    console.log('deviceready');
}, false);


window.config = {
    userId:'',
    userNum:'',
    rootUrl: 'http://125.69.67.12:7080/hisapi'
}

