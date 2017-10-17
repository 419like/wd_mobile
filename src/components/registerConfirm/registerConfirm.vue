<template>
    <div>
        <div class="inPageBody">
            <div style="margin-top:20px;">
                <div class="partTitle">
                    号别信息
                </div>
                <div class="partContent" style="margin-top:5px;">
                    <div>
                        <span>科室：</span><span>{{registerInfo.ksmc}}</span>
                    </div>
                    <div>
                        <span>医生：</span><span>{{registerInfo.ysxm}}</span>
                    </div>
                    <div>
                        <span>号类：</span><span>{{registerInfo.xmmc}}</span>
                    </div>
                    <div style="display: flex;">
                        <div>
                            <span>日期：</span><span>{{registerInfo.shortDay}}({{registerInfo.day}})</span>
                        </div>
                        <div class="flex">
                            <!-- <div>上下午：</div> -->
                            <div class="box1">
                                <mt-switch class="scaleY" v-model="timeValue" @change="timeChange()"></mt-switch>
                            </div>
                            <div>{{timeValue?'上午':'下午'}}</div>
                        </div>
                    </div>
                    <div>
                        <span>金额：</span><span>{{registerInfo.ghfy}}</span>
                    </div>
                </div>
            </div>
            <div style="margin-top:10px;">
                <div class="partTitle">
                    就诊人员信息
                </div>
                <div class="partContent" style="position: relative;margin-top:5px;">
                    <div style="position:absolute;right:10px;top:0px;color:#3dbbaa;" @click="changeHandleUser();">
                        更换就诊人员
                    </div>
                    <div>
                        <span>姓名：</span><span>{{tempHandleUser.hzxm}}</span>
                    </div>
                    <div>
                        <span>身份证号：</span><span>{{tempHandleUser.sfzh}}</span>
                    </div>
                    <div>
                        <span>手机号：</span><span>{{tempHandleUser.lxdh}}</span>
                    </div>
                    <div>
                        <span>地址：</span><span>{{tempHandleUser.mph}}</span>
                    </div>
                </div>
            </div>
            <div v-if="registerInfo.ddh" style="margin-top:10px;">
                <div class="partTitle">
                    挂号结果
                </div>
                <div class="partContent">
                    <div v-if="registerInfo.no">
                        <span>订单号：</span><span>{{registerInfo.ddh}}</span>
                    </div>
                    <div v-if="registerInfo.no">
                        <span>挂号单号：</span><span>{{registerInfo.no}}</span>
                    </div>
                    <div v-if="registerInfo.no">
                        <span>结果：</span><span class="red">{{registerInfo.type?'成功': registerInfo.warnMsg}}</span>
                    </div>
                    <div v-if="registerInfo.no">
                        <span class="tips red">请于{{registerInfo.time}}到院就诊</span>
                    </div>
                </div>
            </div>
            <div v-if="!registerInfo.no" style="margin-left:10%;width:80%;position: absolute;bottom: 10px;">
                <button class="mint-button mint-button--primary mint-button--large green" @click="sureCharge()">
                    <!---->
                    <label class="mint-button-text font18">挂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>
                </button>
            </div>
            <div v-if="registerInfo.no" style="margin-left:10%;width:80%;position: absolute;bottom: 10px;">
                <button class="mint-button mint-button--primary mint-button--large green">
                    <!---->
                    <label class="mint-button-text font18">查看记录</label>
                </button>
            </div>
        </div>
        <mt-popup class="holePage" v-model="treatManSelectVisible" position="right">
            <treat-man-select @change="treatManChange" @close="closeTreatManSelect" :chooseValue="treatManValue" :options="treatManOption"></treat-man-select>
        </mt-popup>
        <zffs @confirmZffs="selectZffs" v-if="ChooseZffsShow"></zffs>
    </div>
</template>
<script type="text/javascript">
import treatManSelect from '@/components/treatManSelect/treatManSelect.vue'
import zffs from '@/components/onlinePay/zffs.vue'
import { getUrlParams, checkBrowser }  from '@/util/util.js'
export default {
    data() {
        return {
            code: '',
            registerInfo: {},
            timeValue: true,
            ChooseZffsShow: false,
            param: {},
            treatManSelectVisible: false,
            treatManOption: [],
            treatManValue: '',
            tempHandleUser: {},
        }
    },
    created() {
        let lx = checkBrowser();
        let params = this.$route.query;
        if (lx !== '1') {
            if(params.code == '' || params.code == null) {
                this.getCode(params.jgid);
            } else {
                this.code = params.code;
            }
        } 
    },
    methods: {
        getCode(jgid) {
            this.api.GetAppId({"jgid": jgid})
                .then(res => {
                    if (res.code === '1') {
                        if (res.data.length) {
                            this.requestCode(res.data[0].appid);
                        } else {
                            this.$messagebox('此机构未开通微信公众号支付')
                        }
                    } else {
                        this.$toast('系统异常')
                    }
                }, err => {})
 
        },
        requestCode(appid) {
            let redirect_uri = encodeURIComponent(location.href);
            let url=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;  
            location.href=url; 
        },
        treatManChange(hzid) {
            debugger
            let treatManOption = this.$store.getters.getBoundList;
            for (var i = 0; i < treatManOption.length; i++) {
                if (treatManOption[i].hzid == hzid) {
                    debugger
                    this.tempHandleUser = treatManOption[i];
                    this.treatManSelectVisible = false;
                    return;
                }
            }
        },
        closeTreatManSelect() {
            this.treatManSelectVisible = false;
        },
        changeHandleUser() {
            let tempArr = [];
            let treatManOption = this.$store.getters.getBoundList;
            for (var i = 0; i < treatManOption.length; i++) {
                tempArr.push({
                    value: treatManOption[i].hzid,
                    label: treatManOption[i].hzxm,
                })
            }
            this.treatManOption = tempArr;
            this.treatManValue = this.tempHandleUser.hzid;
            this.treatManSelectVisible = true;
        },
        selectZffs(a) {
            let params = this.getGhxx(a);
                params.total_fee = '0.01';
            if (a === '1') {
                this.payForWx(params);
            } else if(a === '2') {
                this.payForAlipay(params);
            }
            this.ChooseZffsShow = false;
        },
        payForAlipay(params) {
            this.api.OrderGeneration(params)
                .then(res => {
                    if (res.code === '1' && res.msg === '成功') {
                        this.$set(this.registerInfo, 'ddh', res.Trade_No);
                        location.href = `http://localhost:3000/alipay.html?id=${res.id}`;
                        // this.$router.push({ name: 'alipay', query: { "data": data }})
                    } else if (res.code === '0') {
                        this.$messagebox(res.msg);
                    }
                }, err => {
                   this.$messagebox('挂号异常,请再次尝试或到窗口挂号');
                })
        },
        payForWx(params) {
            this.api.OrderGeneration(params)
                .then(res => {
                    if (res.code === '1' && res.msg === '成功') {
                        this.$set(this.registerInfo, 'ddh',res.Trade_No);
                        let lx = checkBrowser();
                        let param = {
                            id: res.id,
                            returnurl: location.href
                        }
                        if (lx == '1') {
                            param.bz = '1';
                        }
                        if (this.code) {
                            param.code = code;
                        }
                        this.api.getOnlinePay(param)
                            .then(res => {
                                if (res.code === '1') {
                                    this.startPay(res, lx);
                                }
                            }, err => {
                                this.$messagebox(err);
                            })
                    } else if (res.code === '0') {
                        this.$messagebox(res.msg);
                    }
                }, err => {
                   this.$messagebox('挂号异常,请再次尝试或到窗口挂号');
                })
        },
        startPay(res, lx) {
            if (lx == '1') {
                this.wxBridge(res.data);
            } else {
                location.href = res.data;
            }
        },
        wxBridge(data) {
            WeixinJSBridge.invoke('getBrandWCPayRequest',data, res => {
                    if(res.err_msg === 'get_brand_wcpay_request:ok'){
                        this.$messagebox('支付成功，返回订单列表！');
                        this.paySuccess();
                    } else if(res.err_msg === 'get_brand_wcpay_request:cancel'){
                        this.$toast('取消支付！');
                    } else {
                        alert(JSON.stringify(res));
                    }
                });
        },
        paySuccess() {

        },
        timeChange() {
            console.log(this.timeValue);
        },
        confirmPayment(data) {
            let param = {
                id: this.param.id,
                out_trade_no:  this.param.Trade_No,
                return_code: data?data.return_code:'',
                return_data: data?data.return_data:'',
                result_code: data?data.result_code:'',
                result_data: data?data.result_data:'',
            }
            this.api.ConfirmPayment(param)
                .then(res => {
                    this.registerInfo.type = +res.code;
                    if (res.code == '1') {
                        this.$set(this.registerInfo, 'no', res.msg);
                    } else {
                        if (res.msg.indexOf('重复挂号')) {
                            this.$set(this.registerInfo, 'warnMsg','失败, 今天已经挂过该号别，不能重复挂号');
                        } else {
                            this.$set(this.registerInfo, 'warnMsg','失败, 请到窗口挂号');
                        }
                    }
                }, err => {
                })
        },
        getGhxx(zffs) {
            if (!this.timeValue) {
                this.registerInfo.time = this.registerInfo.shortDay + ' 15:00:00'
            } else {
                this.registerInfo.time = this.registerInfo.shortDay + ' 09:00:00'
            }
            let params = {
                brxx: {
                    brid: this.tempHandleUser.hzid
                },
                ghxx: {
                    ghapid: this.registerInfo.id,
                    jsfs: '在线支付',
                    ysje: this.registerInfo.ghfy,
                    yysj: this.registerInfo.time
                }
            }
            return {
                "ddlx": '1',
                "jgid": this.registerInfo.jgid,
                "brid": this.tempHandleUser.hzid,
                "zffs": zffs?zffs:'1',
                "total_fee": params.ghxx.ysje,
                "body": '预约挂号',
                "scene_info": '预约挂号',
                "mxxx": [],
                "ghxx": JSON.stringify(params),
            }
        },
        sureCharge() {
            if (this.registerInfo.ghfy == '0.00' || this.registerInfo.ghfy == '0') { 
                let params = this.getGhxx();
                this.api.OrderGeneration(params)
                .then(res => {
                    if (res.code === '1' && res.msg === '成功') {
                        this.$set(this.registerInfo, 'ddh',res.Trade_No);
                        this.param = res;
                        this.confirmPayment(res);
                    }
                }, err => {
                    this.$messagebox(err);
                })
            } else {
                this.ChooseZffsShow = true;
            }
        },
        toPayUrl(mweb_url) {
            window.location.href = mweb_url;
        }
    },
    components: {
        zffs,
        treatManSelect
    },
    mounted() {
        this.$store.commit('setPageTitle', '预约挂号确认');

        this.registerInfo = this.$route.query;
        this.tempHandleUser = this.handleUser;
    },
    computed: {
        pageTitle() {
            return this.$store.getters.pageTitle;
        },
        handleUser() {
            return this.$store.getters.getHandleUser;
        },
    }
}

</script>
<style scoped>
.partContent {
    margin-left: 20px;
    padding-top: 15px;
    font-size: 14px;
}

.partTitle {
    color: #3dbbaa;
    font-size: 16px;
    margin-left: 10px;
    border-bottom: 1px solid #B3B3B3
}
.red{color:red;}
.t2{
    width:100%;
    font-size: 12px;
    color: #999999;
}

.item {
    padding: 5px;
    border: 1px solid #E6E6E6;
}
.tips{
    font-size: 16px;
    padding-left: 25px;
}
.modeHead {
    height: 25px;
    width: 100%;
    background: #CCCCCC;
    padding-top: 6px;
}

.headTitle {
    margin-left: 10px;
    font-size: 14px;
    color: #7F7F7F;
}

</style>
