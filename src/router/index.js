import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const index = resolve => {
    require(['../components/index.vue'], resolve)
};
const consult = resolve => {
    require(['../components/consult.vue'], resolve)
};
const healthRecord = resolve => {
    require(['../components/healthRecord.vue'], resolve)
};
const personalCenter = resolve => {
    require(['../components/personalCenter.vue'], resolve)
};
const login = resolve => {
    require(['../components/login.vue'], resolve)
};
const register = resolve => {
    require(['../components/register.vue'], resolve)
}
const home = resolve => {
    require(['../components/home.vue'], resolve)
}
const hospitalPage = resolve => {
    require(['../components/hospitalPage/hospitalPage.vue'], resolve);
}
const acticle = resolve => {
    require(['../components/acticle/acticle.vue'], resolve);
}
const treatmentCardBind = resolve => {
    require(['../components/treatmentCardBind/treatmentCardBind.vue'], resolve);
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
        }, ]
    }, {
        path: '/hospitalPage/:info',
        component: hospitalPage
    },{
        path: '/acticle/:info',
        component: acticle
    },{
        path:'/treatmentCardBind',
        component:treatmentCardBind
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
