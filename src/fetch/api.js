import axios from 'axios'

// axios 配置
// axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://125.69.67.12:7080/hisapi';

// //POST传参序列化
// axios.interceptors.request.use((config) => {
//     console.log(config);
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// //返回状态判断
// axios.interceptors.response.use((res) => {
//     console.log(res);
//     return res;
// }, (error) => {
//     return Promise.reject(error);
// });

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        debugger
        axios({
                method: 'post',
                url: url,
                params: {
                    data: JSON.stringify(params)
                }
            })
            .then(function(response) {
                resolve(response.data);
            }).catch(function(error) {
                reject(error)
            });
    })
}

export default {
    /**
     * 用户注册
     */
    Regist(params) {
        return fetch('/rest/commitData/080301/1', params)
    },
    /**
     * 用户登录
     */
    Login(params) {
        return fetch('/rest/queryDataBySql/080301/1', params)
    },
}
