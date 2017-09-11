import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        maskShow:false,
        userInfo:{},
        hzid:'',
        hzInfo:{},
        boundList:[],
        handleUser:'',
        pageTitle:'',
        backBtnHide:false,
    },
    mutations:{
        maskShow(state,value){
            state.maskShow = value;
        },
        login(state,value){
            debugger
        	window.localStorage.setItem("userInfo",JSON.stringify(value));
            state.userInfo = value;
        },
        loginOut(state){
        	window.localStorage.setItem("userInfo",JSON.stringify({}));
        	state.userInfo = {};
            state.boundList = [];
        },
        systemMessage(state,value){
            Vue.$toast(value);
        },
        setBoundList(state,value){
            state.boundList = value;
        },
        pushBoundItem(state,value){
            state.boundList.push(value);
        },
        removeBoundItem(state,value){
            for (var i =0; i<state.boundList.length; i++) {
                if(state.boundList[i].hzid == value){
                    if(state.boundList[i]==state.handleUser){
                        state.boundList.splice(i,1);
                        if(state.boundList.length){
                            state.handleUser = state.boundList[0];
                        }
                        return;
                    }
                }
            }
        },
        setHandleUser(state,value){
            state.handleUser = value;
        },
        setPageTitle(state,value){
            state.pageTitle = value;
        },
        setBackBtn(state,value){
            state.backBtnHide = value;
        },
    },
    getters:{
        pageTitle(state, getters){
            return state.pageTitle;
        },
        loginState(state, getters){
            let loginState = !!(state.userInfo.userId)
            return loginState;
        },
    	userNum(state,getters){
    		return state.userInfo.userNum;
    	},
        getUserInfo(state,getters){
            debugger
            return JSON.parse(window.localStorage.getItem("userInfo"));
        },
        userId(state, getters){
            let userId = state.userInfo.userId;
            return userId;
        },
        userInfo(state, getters){
            let userInfo = state.userInfo;
            return userInfo;
        },
        bindState(state, getters){
            let bindState = !!(state.hzid)
            return bindState;
        },
        getBoundList(state,getters){
            return state.boundList;
        },
        getHandleUser(state,getters){
            return state.handleUser;
        },
        backBtnHide(state,getters){
            return state.backBtnHide;
        },
    }
})
export default store;