import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import index from '../components/index'
import consult from '../components/consult'
import healthRecord from '../components/healthRecord'
import personalCenter from '../components/personalCenter'

const login = resolve => {
    require(['../components/login.vue'], resolve)
};

const register = resolve => {
    require(['../components/register.vue'], resolve)
}

const home = resolve => {
    require(['../components/home.vue'], resolve)
}

const routes = [
    { path: '/', redirect: '/index' },
    { path: '/login', component: login },
    { path: '/register', component: register }, {
        path: '/index',
        component: index,
        children: [{
            path: '/index/home',
            component: home
        }, {
            path: '/index/consult',
            component: consult
        }, {
            path: '/index/healthRecord',
            component: healthRecord
        }, {
            path: '/index/personalCenter',
            component: personalCenter
        }]
    }
]
const router = new Router({
    routes
})
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;
    next()
});
export default router;
