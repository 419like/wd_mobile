import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        maskShow:false,
        userInfo:{},
        hzid:''
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
            state.hzid = '';
        },
        treatmentCardBind(state,value){
            state.hzid = value;
        }
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
        getHzid(state,getters){
            let hzid = state.hzid;
            return hzid;
        }
    }
})
export default store;