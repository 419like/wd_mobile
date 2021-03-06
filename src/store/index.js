import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        maskShow: false,
        userInfo: {},
        hzid: '',
        hzInfo: {},
        boundList: [],
        handleUser: {},
        pageTitle: '',
        backBtnHide: false,
        appUserInfo: {},
        currentHis: {

        },
        openId:'',
        //1.机构调用 0.区域调用
        enterMode:0,
    },
    mutations: {
        setOpenid(state, value){
            console.log(value);
            window.localStorage.setItem("openId", JSON.stringify(value));
            state.openId = value;
        },
        setBackFun(state, value){
            window.app.goback = value;
        },
        setAppUserInfo(state, value) {
            
            window.localStorage.setItem("appUserInfo", JSON.stringify(value));
            
            state.appUserInfo = value;
        },
        setEnterMode(state, value) {
            
            window.localStorage.setItem("enterMode", JSON.stringify(value));
            state.enterMode = value;
        },
        maskShow(state, value) {
            state.maskShow = value;
        },
        login(state, value) {
            window.localStorage.setItem("userInfo", JSON.stringify(value));
            state.userInfo = value;
        },
        loginOut(state) {
            window.localStorage.setItem("appUserInfo", JSON.stringify({}));
            state.appUserInfo = {};
            // window.localStorage.setItem("enterMode", JSON.stringify({}));
            // state.enterMode = '';
            // window.localStorage.setItem("currentHis", JSON.stringify({}));
            // state.currentHis = {};
            window.localStorage.setItem("boundList", JSON.stringify([]));
            state.boundList = [];
            window.localStorage.setItem("handleUser", JSON.stringify({}));
            state.handleUser = {};
        },
        systemMessage(state, value) {
            Vue.$toast(value);
        },
        setBoundList(state, value) {
            window.localStorage.setItem("boundList", JSON.stringify(value));
            state.boundList = value;
        },
        pushBoundItem(state, value) {
            state.boundList.push(value);
            if (state.boundList.length == 1) {
                state.handleUser = state.boundList[0];
                window.localStorage.setItem("handleUser", JSON.stringify(state.handleUser));
            }

            window.localStorage.setItem("boundList", JSON.stringify(state.boundList));
        },
        removeBoundItem(state, value) {
            for (var i = 0; i < state.boundList.length; i++) {
                if (state.boundList[i].hzid == value) {
                    state.boundList.splice(i, 1);
                    if (state.boundList.length) {
                        state.handleUser = state.boundList[0];
                        window.localStorage.setItem("handleUser", JSON.stringify(state.handleUser));
                    }
                    window.localStorage.setItem("boundList", JSON.stringify(state.boundList));
                    return;
                }
            }
        },
        setHandleUser(state, value) {
            window.localStorage.setItem("handleUser", JSON.stringify(value));
            state.handleUser = value;
        },
        setPageTitle(state, value) {
            state.pageTitle = value;
        },
        setBackBtn(state, value) {
            state.backBtnHide = value;
        },
        setCurrentHis(state, value) {
            window.localStorage.setItem("currentHis", JSON.stringify(value));
            state.currentHis = value;
        },
        defineBackFun(state, value) {

        }
    },
    getters: {
        getOpenId(state, getters){
            state.openId = JSON.parse(window.localStorage.getItem("openId"));
            return state.openId;
        },
        getEnterMode(state, getters){
            return JSON.parse(window.localStorage.getItem("enterMode"));
        },
        getCurrentHis(state, getters) {
            let currentHis = JSON.parse(window.localStorage.getItem("currentHis"));
            state.currentHis = currentHis;
            return state.currentHis;
        },
        pageTitle(state, getters) {
            return state.pageTitle;
        },
        loginState(state, getters) {
            let appUserInfo = JSON.parse(window.localStorage.getItem("appUserInfo"));
            state.appUserInfo = appUserInfo;
            let loginState;
            if (state.appUserInfo && state.appUserInfo.userId) {
                loginState = state.appUserInfo.userId;
            } else {
                loginState = false;
            }
            return loginState;
        },
        userNum(state, getters) {
            return state.userInfo.userNum;
        },
        getUserInfo(state, getters) {
            return JSON.parse(window.localStorage.getItem("userInfo"));
        },
        userId(state, getters) {
            let userInfo = JSON.parse(window.localStorage.getItem("appUserInfo"))
            let userId = userInfo.userId ? userInfo.userId : '';
            return userId;
        },
        userInfo(state, getters) {
            let userInfo = state.userInfo;
            return userInfo;
        },
        bindState(state, getters) {
            let bindState = !!(state.hzid)
            return bindState;
        },
        getBoundList(state, getters) {
            let boundList = JSON.parse(window.localStorage.getItem("boundList"));
            if (!boundList) {
                boundList = [];
            }else{
                state.boundList = [];
                for (var i = 0; i < boundList.length; i++) {
                    state.boundList.push(boundList[i]);
                }
            }
            return state.boundList;
        },
        getHandleUser(state, getters) {
            let handleUser = JSON.parse(window.localStorage.getItem("handleUser"));
            if (!handleUser) {
                handleUser = {};
            }
            state.handleUser = handleUser;
            return state.handleUser;
        },
        getAppUserInfo(state, getters) {
            
            let appUserInfo = JSON.parse(window.localStorage.getItem("appUserInfo"));
            
            if (!appUserInfo) {
                appUserInfo = {};
            }
            
            state.appUserInfo = appUserInfo;
            return state.appUserInfo;
        },
        backBtnHide(state, getters) {
            return state.backBtnHide;
        },
    }
})
export default store;
