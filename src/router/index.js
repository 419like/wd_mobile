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
const introArticle = resolve => {
    require(['../components/introArticle/introArticle.vue'], resolve);
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
const visitDetai = resolve => {
    require(['../components/visitDetai/visitDetai.vue'], resolve);
}
const articlePage = resolve => {
    require(['../components/articlePage/articlePage.vue'], resolve);
}
const newsList = resolve => {
    require(['../components/newsList/newsList.vue'], resolve);
}
const treatmentNoticeList = resolve => {
    require(['../components/treatmentNoticeList/treatmentNoticeList.vue'], resolve);
}
const onlinePay = resolve => {
    require(['../components/onlinePay/onlinePay.vue'], resolve);
}
const mzfymx = resolve => {
    require(['../components/onlinePay/mzfymx.vue'], resolve);
}
const centerActiveList = resolve => {
    require(['../components/centerActiveList/centerActiveList.vue'], resolve);
}
const mzRecordDetails = resolve => {
    require(['../components/medicalRecord/mzRecordDetails.vue'], resolve);
}
const zyRecordDetails = resolve => {
    require(['../components/medicalRecord/zyRecordDetails.vue'], resolve);
}
const archives = resolve => {
    require(['../components/archives/archives.vue'], resolve);
}
const rePassword = resolve => {
    require(['../components/rePassword/rePassword.vue'], resolve);
}
const reSetPassword = resolve => {
    require(['../components/reSetPassword/reSetPassword.vue'], resolve);
}
const resetPasswordWithOld = resolve => {
    require(['../components/resetPasswordWithOld/resetPasswordWithOld.vue'], resolve);
}
const checkMode = resolve => {
    require(['../components/checkMode.vue'], resolve);
}
const routes = [{
        path: '/',
        redirect: '/checkMode'
    },{
        path: '/checkMode',
        component: checkMode
    },
    {
        path: '/login',
        component: login
    },
    {
        name:'register',
        path: '/register',
        component: register
    }, {
        path: '/index',
        component: index,
        children: [{
            name: 'home',
            path: '/index/home',
            component: home
        }, {
            path: '/index/medicalRecord',
            component: medicalRecord
        }, {
            path: '/index/healthRecord',
            component: healthRecord
        }, {
            name: 'personalCenter',
            path: '/index/personalCenter',
            component: personalCenter
        }, {
            name: 'hospitalPage',
            path: '/index/hospitalPage',
            component: hospitalPage
        }, {
            path: '/index/registerConfirm',
            component: registerConfirm
        }, {
            name: 'appointment',
            path: '/index/appointment',
            component: appointment
        }, {
            path: '/index/visitDetai',
            component: visitDetai
        }, {
            path: '/index/articlePage',
            component: articlePage
        }, {
            path: '/index/newsList',
            component: newsList
        }, {
            name: 'login',
            path: '/index/login',
            component: login
        }, {
            path: '/index/register',
            component: register
        }, {
            path: '/index/treatmentNoticeList',
            component: treatmentNoticeList
        }, {
            path: '/index/introArticle',
            component: introArticle
        }, {
            path: '/index/onlinePay',
            component: onlinePay
        }, {
            name: 'mzfymx',
            path: '/index/mzfymx',
            component: mzfymx
        }, {
            name: 'centerActiveList',
            path: '/index/centerActiveList',
            component: centerActiveList
        }, {
            name: 'mzRecordDetails',
            path: '/index/mzRecordDetails',
            component: mzRecordDetails
        }, {
            name: 'zyRecordDetails',
            path: '/index/zyRecordDetails',
            component: zyRecordDetails
        }, {
            name: 'archives',
            path: '/index/archives',
            component: archives
        }, {
            name: 'rePassword',
            path: '/index/rePassword',
            component: rePassword
        }, {
            name: 'reSetPassword',
            path: '/index/reSetPassword',
            component: reSetPassword
        }, {
            name: 'resetPasswordWithOld',
            path: '/index/resetPasswordWithOld',
            component: resetPasswordWithOld
        }]
    }, {
        path: '/treatmentCardBind',
        component: treatmentCardBind
    }, {
        path: '/boundEdit',
        component: boundEdit
    }, {
        path: '/editBoundInfo',
        component: editBoundInfo
    }
]
const router = new Router({
    // mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    router.app.$store.commit('setBackBtn', true)
    document.body.scrollTop = 0;
    next()
});
export default router;
