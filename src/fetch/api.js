import axios from 'axios'
import store from '@/store'

// axios 配置
// axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://125.69.67.12:7080/hisapi';
axios.defaults.baseURL = 'http://172.16.110.168:8080/testapi';
// axios.defaults.baseURL = 'http://192.168.1.84:8080/wdphis/';
// 





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
        data: {
          data: JSON.stringify(params)
        },
        timeout: config.timeout,
        transformRequest: [function(data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
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
    // debugger
    // return fetch('/rest/queryDataBySql/080301/1', params)
    params.lx = '1';
    return fetch('/rest/commitData/080301/2', params)
  },
  /**
   * 获取就诊卡绑定信息
   */
  getTreatmentCardInfo(params, config) {
    return fetch('/rest/queryDataBySql/080201/2', params)
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
  /**
   * 验证身份证和姓名对应
   */
  checkBind(params, config) {
    return fetch('/rest/queryDataBySql/080201/1', params)
  },
  /**
   * 绑定用户
   */
  treatmentCardBind(params, config) {
    return fetch('rest/commitData/080201/1', params)
  },
  /**
   * 获取排班列表
   */
  getWorkList(params, config) {
    return fetch('rest/queryDataBySql/010301/1', params)
  },
  /**
   * 获取挂号收费信息
   */
  getRegisterCharging(params, config) {
    return fetch('rest/queryDataBySql/010301/2', params)
  },
  /**
   * 生成收费单号
   */
  getRegisterNum(params, config) {
    return fetch('rest/queryDataBySql/010301/7', params)
  },
  /**
   * 门诊挂号
   */
  register(params, config) {
    return fetch('rest/commitData/080201/2', params)
  },


}
