import axios from 'axios'
import store from '@/store'

// axios 配置
// axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://125.69.67.12:7080/hisapi';



//POST传参序列化
axios.interceptors.request.use((config) => {
    store.commit('maskShow', true)
    return config;
}, (error) => {
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    store.commit('maskShow', false)
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function fetch(url, params, config) {
    if (!config) {
        config = {};
    }
    if (!config.timeout) {
        config.timeout = 5000;
    }
    return new Promise((resolve, reject) => {
        axios({
                method: 'post',
                url: url,
                params: {
                    data: JSON.stringify(params)
                },
                config: config
            })
            .then(function(response) {
                resolve(response.data);
            }).catch(function(error) {
                store.commit('maskShow', false)
                reject(error);
            });
    })
}

export default {
    /**
     * 用户注册
     */
    Regist(params, config) {
            return fetch('/rest/commitData/080301/1', params)
        },
        /**
         * 用户登录
         */
        Login(params, config) {
            return fetch('/rest/queryDataBySql/080301/1', params)
        },
        /**
         * 获取机构列表
         */
        GetHisList(params, config) {
            return fetch('/rest/queryDataBySql/080101/1', params)
        },
        /**
         * 获取部门列表
         */
        getBMList(params, config) {
            return fetch('/rest/queryDataBySql/000204/1', params)
        },
        /**
         * 获取文章内容
         */
        getActicle(params, config) {
            return fetch('/rest/queryDataBySql/080104/1', params)
        },
}
