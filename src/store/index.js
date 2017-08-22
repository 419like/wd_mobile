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
    },
    mutations:{
        maskShow(state,value){
            state.maskShow = value;
        },
        login(state,value){
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
    },
    getters:{
    	loginState(state, getters){
    		let loginState = !!(state.userInfo.userId)
    		return loginState;
    	},
    	userNum(state,getters){
    		return state.userInfo.userNum;
    	},
    	localUserInfo(state,getters){
    		return JSON.parse(window.localStorage.getItem("userInfo"));
    	},
        userId(state, getters){
            let userId = state.userInfo.userId;
            return userId;
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
    }
})
export default store;