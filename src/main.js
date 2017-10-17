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

import 'babel-polyfill';
const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.filter('formatAmount', v => {
    if (!v) return 0;
    return (+v).toFixed(2);
});


Vue.prototype.goback = function() {
    if(router.history.current.path=='/index/personalCenter'){
        router.push({
            path:'/index/home'
        })
    }else{
        router.back();
    }
    
}
Vue.prototype.completeImgSrc = function(content,addStr) {
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /src=[\'"]?([^\'"]*)[\'"]?/i;
    let tarr = content.match(imgReg);
    if(!tarr){
        tarr = [];
    }
    for (var i = 0; i < tarr.length; i++) {
        let src = tarr[i].match(srcReg);
        if (src[1].indexOf('http') < 0) {
            let tempStr = addStr + src[1];
            content = content.replace(src[1], tempStr);
        }
    }
    return content;
}
Vue.prototype.goUrl = function(url){
    this.$router.push({
        path:'/index/'+url
    })
}
Vue.prototype.goArticle = function(id,title){
    this.$router.push({
        path:'/index/articlePage',
        query:{
            id:id,
            title:title
        }
    })
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


