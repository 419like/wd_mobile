import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        maskShow:false
    },
    mutations:{
        maskShow(state,value){
        	debugger
            state.maskShow = value;
        }
    }
})
export default store;