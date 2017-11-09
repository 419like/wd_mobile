import axios from 'axios'
import store from '@/store'


// import sysConfig1 from 'sysConfig1'
// let sysConfig = JSON.parse(eval(sysConfigText.split("=")[1]));



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

export function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(function(response) {
        console.log(response)
        resolve(response.data);
      })
      .catch(function(error) {
        console.log(error)
        store.commit('maskShow', false)
        if (error.message.indexOf('timeout') >= 0) {
          store.commit('systemMessage', '连接超时，请检查网络。');
        }
        reject(error);
      });
  })
}

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
        if (error.message.indexOf('timeout') >= 0) {
          store.commit('systemMessage', '连接超时，请检查网络。');
        }
        reject(error);
      });
  })
}
let sysConfig;
export default {
  initConfig(data) {
    debugger
    sysConfig = data;
    if (sysConfig.currentServer.rootUrl) {
      axios.defaults.baseURL = sysConfig.currentServer.rootUrl;
      axios.defaults.imgUrl = sysConfig.currentServer.imgUrl;
      axios.defaults.jgid = sysConfig.currentServer.jgid;

      store.commit('setCurrentHis', { id: axios.defaults.jgid });
      // document.title = sysConfig.currentServer.indexTitle;
      document.title = '健康门户';
    }
  },
  indexTitle() {
    return sysConfig.currentServer.indexTitle;
  },
  getPersonArchives(params) {
    return fetch('/rest/queryDataBySql/080501/1', params)
  },
  /*
   * 获取个人一天住院费用详情
   */
  getZyfyOneDay(params) {
    return fetch('/rest/queryDataBySql/080401/14', params)
  },
  /*
   * 获取个人所有住院费用记录
   */
  getZyfyjl(params) {
    return fetch('/rest/queryDataBySql/080401/13', params)
  },
  /*
   * 获取个人门诊费用记录明细
   */
  getMzfymx(params) {
    return fetch('/rest/queryDataBySql/080401/15', params)
  },
  /*
   * 获取个人门诊费用记录
   */
  getMzfyjl(params) {
    return fetch('/rest/queryDataBySql/080401/12', params)
  },
  /*
   * 获取个人所有门诊就诊记录
   */
  getMzjzjl(params) {
    return fetch('/rest/queryDataBySql/080401/11', params)
  },
  /*
   * 获取APPID
   */
  GetAppId(params) {
    return fetch('/rest/queryDataBySql/080401/10', params)
  },
  /*
   * 支付成功，通知后台，写入his
   */
  ConfirmPayment(params) {
    return fetch('/rest/commitData/080401/5', params)
  },
  /**
   * 订单取消
   */
  OrderCancel(params) {
    return fetch('/rest/commitData/080401/6', params)
  },
  /**
   * 订单更新
   */
  OrderUpdate(params) {
    return fetch('/rest/commitData/080401/4', params)
  },
  /**
   * 订单生成
   */
  OrderGeneration(params) {
    return fetch('/rest/commitData/080401/2', params)
  },
  /**
   * 异常订单
   */
  GetYcjl(params) {
    return fetch('/rest/queryDataBySql/080401/9', params);
  },
  /**
   * 门诊费用明细
   */
  GetMzfymx(params) {
    return fetch('/rest/queryDataBySql/080401/5', params);
  },
  /**
   * 支付记录明细
   */
  GetZfjlmx(params) {
    return fetch('/rest/queryDataBySql/080401/7', params)
  },
  /**
   * 支付记录
   */
  GetZfjl(params) {
    return fetch('/rest/queryDataBySql/080401/6', params)
  },
  /**
   * 待支付记录  存储过程查询，并做相关处理 
   */
  GetDzfjl(params) {
    return fetch('/rest/commitData/080401/3', params)
  },
  /**
   * 待缴费记录
   */
  GetCffy(params) {
    return fetch('/rest/queryDataBySql/080401/4', params);
  },
  /**
   * 获取支付结果
   */
  getResultPay(params) {
    return fetch('/rest/queryDataBySql/080401/8', params);
  },
  /**
   * 支付退款
   * @params {JSON} 参数id
   */
  payRefund(params) {

  },
  /**
   * 在线支付
   * @params {JSON} 参数id,return_url
   */
  getOnlinePay(params) {

    // let baseurl = 'http://www.hw-family.com/hisapi/rest/h5payopenid';
    let url = sysConfig.currentPayServer.baseUrl + `?code=${params.code}&bz=${params.bz}&id=${params.id}&returnurl=${encodeURIComponent(params.returnurl)}`;
    return get(url);
  },

  /**
   * 获取微信openid
   * 
   */
  getOpenid(params) {
    // let baseurl = 'http://www.hw-family.com/hisapi/rest/h5payopenid';
    let url = sysConfig.currentPayServer.baseUrl + `openid?code=${params.code}&jgid=${params.jgid}`;
    return get(url);
  },
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
    // 
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
    return fetch('/rest/queryDataBySql/080101/2', params)
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
   * 解绑用户
   */
  treatmentCardunBind(params, config) {
    return fetch('rest/commitData/080201/1', params)
  },
  /**
   * 获取排班列表
   */
  getWorkList(params, config) {
    return fetch('rest/queryDataBySql/080304/1', params)
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
  /**
   * 获取挂号信息
   */
  getRegisterList(params, config) {
    return fetch('rest/queryDataBySql/080401/2', params)
  },
  /**
   * 获取门诊和住院信息
   */
  getVisitingList(params, config) {
    return fetch('rest/queryDataBySql/080401/3', params)
  },
  /**
   * 获取门诊和住院信息
   */
  searchUserList(params, config) {
    return fetch('rest/queryDataBySql/080201/3', params)
  },
  /**
   *  注册his用户
   */
  registHisUser(params, config) {
    return fetch('rest/commitData/080201/3', params)
  },
  /**
   *  更新his用户
   */
  updateHisUser(params, config) {
    return fetch('rest/commitData/080201/4', params)
  },
  /**
   *  获取患者信息
   */
  getPatientInfo(params, config) {
    return fetch('rest/queryDataBySql/080201/4', params)
  },
  /**
   *  获取机构文章列表
   */
  getArticleList(params, config) {
    return fetch('rest/queryDataBySql/080104/3', params)
  },
  /**
   * 获取文章详情
   */
  getActicleDetail(params, config) {
    return fetch('/rest/queryDataBySql/080104/4', params)
  },
  /**
   * 获取部门列表
   */
  getDepartmentList(params, config) {
    return fetch('/rest/queryDataBySql/080102/1', params)
  },
  /**
   * 获取可选部门列表
   */
  getDepartmentSelectList(params, config) {
    return fetch('/rest/queryDataBySql/080102/2', params)
  },
  /**
   * 获取可选部门列表
   */
  getDoctorSelectList(params, config) {
    return fetch('/rest/queryDataBySql/080103/2', params)
  },
  /**
   * 获取人员列表
   */
  getPersonList(params, config) {
    return fetch('/rest/queryDataBySql/080103/1', params)
  },
  /**
   * 根据对象id和类型查询其介绍文章信息
   */
  getIntro(params, config) {
    return fetch('/rest/queryDataBySql/080104/5', params)
  },
  /**
   * 根据用户id查询部分用户信息
   */
  getUserInfo(params, config) {
    return fetch('/rest/queryDataBySql/080201/5', params)
  },
  /**
   * 根据用户id查询部分用户信息
   */
  getAreaList(params, config) {
    return fetch('/rest/queryDataBySql/080201/6', params)
  },
  /**
   * 根据用户id查询部分用户信息
   */
  getParentsArea(params, config) {
    return fetch('/rest/queryDataBySql/080201/7', params)
  },
  /**
   * 根据用户id查询部分用户信息
   */
  getHisInfo(params, config) {
    return fetch('/rest/queryDataBySql/080101/3', params)
  },
  /**
   * 获取短信验证
   */
  getSms(params, config) {
    return fetch('/rest/sendSms', params)
  },
  /**
   * 修改用户密码
   */
  reSetPassword(params, config) {
    return fetch('rest/commitData/080201/5', params)
  },
  /**
   * 用旧密码修改用户密码
   */
  resetPasswordWithOld(params, config) {
    return fetch('rest/commitData/080201/6', params)
  },
  /**
   * 检查号码是否已注册
   */
  checkNumRegister(params, config) {
    return fetch('rest/queryDataBySql/080201/8', params)
  },
  /**
   * 微信openid登录
   */
  searchOpenid(params, config) {
    return fetch('rest/commitData/080301/3', params)
  },
  /**
   * 微信openid登录
   */
  bondOpenid(params, config) {
    return fetch('rest/commitData/080301/4', params)
  },
}
