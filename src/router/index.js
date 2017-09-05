import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const index = resolve => {
    require(['../components/index.vue'], resolve)
};
const medicalRecord = resolve => {
    require(['../components/medicalRecord/medicalRecord.vue'], resolve)
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
const appointment = resolve => {
    require(['../components/appointment/appointment.vue'], resolve);
}
const boundEdit = resolve => {
    require(['../components/boundEdit/boundEdit.vue'], resolve);
}
const editBoundInfo = resolve => {
    require(['../components/editBoundInfo/editBoundInfo.vue'], resolve);
}
const registerConfirm = resolve => {
    require(['../components/registerConfirm/registerConfirm.vue'], resolve);
}
const visitDetai  = resolve => {
    require(['../components/visitDetai/visitDetai.vue'], resolve);
}
const articlePage  = resolve => {
    require(['../components/articlePage/articlePage.vue'], resolve);
}
const newsList  = resolve => {
    require(['../components/newsList/newsList.vue'], resolve);
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
            path: '/index/medicalRecord',
            component: medicalRecord
        }, {
            path: '/index/healthRecord',
            component: healthRecord
        }, {
            path: '/index/personalCenter',
            component: personalCenter
        }, {
            path: '/index/hospitalPage',
            component: hospitalPage
        }, {
            path: '/index/registerConfirm',
            component: registerConfirm
        }, {
            path:'/index/appointment',
            component:appointment
        }, {
            path:'/index/visitDetai',
            component:visitDetai
        }, {
            path:'/index/articlePage',
            component:articlePage
        }, {
            path:'/index/newsList',
            component:newsList
        }]
    },{
        path: '/acticle/:info',
        component: acticle
    },{
        path:'/treatmentCardBind',
        component:treatmentCardBind
    },{
        path:'/boundEdit',
        component:boundEdit
    },{
        path:'/editBoundInfo',
        component:editBoundInfo
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
