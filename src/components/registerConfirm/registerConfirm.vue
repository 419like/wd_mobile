<template>
    <div>
        <div class="inPageBody">
            <div style="margin-top:20px;">
                <div class="partTitle">
                    号别信息
                </div>
                <div class="partContent">
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
                        <div >
                            <span>日期：</span><span>{{registerInfo.shortDay}}({{registerInfo.day}})</span>
                        </div>
                        <div class="flex">
                            <!-- <div>上下午：</div> -->
                            <div class="box1"><mt-switch class="scaleY" v-model="timeValue" @change="timeChange()"></mt-switch></div>
                            <div>{{timeValue?'上午':'下午'}}</div>
                        </div>
                    </div>
                    <div>
                        <span>金额：</span><span>{{registerInfo.ghfy}}</span>
                    </div>
                </div>
            </div>
            <div style="margin-top:10px;">
                <div  class="partTitle">
                    就诊人员信息
                </div>
                <div class="partContent" style="position: relative;">
                    <div style="position:absolute;right:10px;top:5px;color:#3dbbaa;" @click="changeHandleUser();">
                        更换就诊人员
                    </div>
                    <div>
                        <span>姓名：</span><span>{{handleUser.hzxm}}</span>
                    </div>
                    <div>
                        <span>身份证号：</span><span>{{handleUser.sfzh}}</span>
                    </div>
                    <div>
                        <span>手机号：</span><span>{{handleUser.lxdh}}</span>
                    </div>
                    <div>
                        <span>地址：</span><span>{{handleUser.mph}}</span>
                    </div>
                </div>
            </div>
            <div v-if="registerInfo.number" style="margin-top:10px;">
                <div  class="partTitle">
                    挂号结果
                </div>
                <div class="partContent">
                    <div>
                        <span>订单号：</span><span>{{registerInfo.NO}}</span>
                    </div>
                    <div>
                        <span>挂号单号：</span><span>{{registerInfo.number}}</span>
                    </div>
                    <div>
                        <span>结果：</span><span>{{registerInfo.type?'成功':'失败，请到在线缴费中退费'}}</span>
                    </div>
                </div>
            </div>
            <div v-if="!registerInfo.number" style="margin-left:10%;width:80%;position: absolute;bottom: 10px;">
                <button class="mint-button mint-button--primary mint-button--large green" @click="sureCharge()">
                    <!---->
                    <label class="mint-button-text font18">挂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>
                </button>
            </div>
            <div v-if="registerInfo.number" style="margin-left:10%;width:80%;position: absolute;bottom: 10px;">
                <button class="mint-button mint-button--primary mint-button--large green" @click="sureCharge()">
                    <!---->
                    <label class="mint-button-text font18">查看记录</label>
                </button>
            </div>  
        </div>
        
        <zffs @confirmZffs="selectZffs" v-if="ChooseZffsShow"></zffs>
    </div>
</template>
<script type="text/javascript">
import mbSelect from '@/components/common/mbSelect/mbSelect.vue';
import zffs from '@/components/onlinePay/zffs.vue'
export default {
    data() {
            return {
                registerInfo:{},
                timeValue:true,
                ChooseZffsShow: false,
                param: {},
            }
        },
        methods: {
            changeHandleUser(){

            },
            selectZffs(a) {
                if (a == '1') {
                    this.param.lx = a;
                    // this.payForWx();
                } else if (a == '2') {
                    this.param.lx = a;
                    this.payForAlipay();
                } else if (!a) {

                }
                this.ChooseZffsShow = false;
            },
            payForAlipay() {
                var o = {"mc":"hadf","dm":"2131","xm":"张三"};
                let data  = encodeURI(JSON.stringify(o))
                this.$router.push({name:'alipay', params: {"data":data}})
            },
            payForWx() {
                this.api.getWxpay(this.param)
                .then(res => {
                    if (!res) {
                        this.$toast('服务器繁忙');
                        if (res.data.respCode == 'fail') {
                            this.$toast(res.data.respMsg);
                        } else {
                            let param = res.data;
                            this.onBridgeReady(param);
                        }
                    }
                });
            },
            timeChange(){
                console.log(this.timeValue);
            },
            sureCharge(item) {
                // if(this.registerInfo.ghfy!='0.00'){
                //     this.$messagebox('收费项目尚未建设，请谅解。')
                //     return;
                // }
                if(!this.timeValue){
                    this.registerInfo.time = this.registerInfo.shortDay+' 15:00:00'
                }
                let params = {
                    brxx: {
                        brid: this.$store.getters.getHandleUser.hzid
                    },
                    ghxx: {
                        ghapid: this.registerInfo.id,
                        jsfs: '现金',
                        ysje: this.registerInfo.ghfy,
                        yysj:this.registerInfo.time
                    }
                }
                if (params.ghxx.ysje == '0') {  // 金额为0，直接调用his
                    console.log(params)
                    this.api.register(params)
                    .then(res => {                       
                        if (res.code=='1') {
                            this.$toast('挂号成功！');
                        }else{
                            this.$toast('挂号失败,'+res.msg);
                        }
                        this.$set(this.$data.registerInfo, 'number',res.no);
                        console.log(res);
                    })
                } else { // 金额不为0，调用支付
                    // this.ChooseZffsShow = true;
                    let param = {
                        "ddlx": '1',
                        "jgid": '70',
                        "brid": '1406088',
                        "zffs": '1',
                        "total_fee": '0',
                        "mxxx": [],
                        "ghxx": JSON.stringify(params),
                    }
                    this.api.OrderGeneration(param)
                    .then(res => {
                        console.log(res);
                    })
   
                }
            },
            toPayUrl(mweb_url) {
                 window.location.href = mweb_url;
            },
            onBridgeReady(param) {             
                WeixinJSBridge.invoke(
                   'getBrandWCPayRequest', {
                       "appId" : param.appid,         
                       "timeStamp":  param.timeStamp,         
                       "nonceStr" :  param.nonceStr, 
                       "package" :  param.prepay_id,    
                       "signType" : "MD5",        
                       "paySign" :  param.sign 
                   },
                   function(res){  
                       if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                            this.$messagebox('支付成功');
                       } else {

                       }
                   }
                );
            },
        },
        components: {
            zffs
        },
        mounted() {
            this.$store.commit('setPageTitle','预约挂号确认');

            this.registerInfo = this.$route.query;
            console.log(this.handleUser);
            
        },
        computed:{

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
.partContent{
    margin-left:20px;
    font-size: 14px;
}
.partTitle{
    color:#3dbbaa;
    font-size: 16px;
    margin-left: 10px;
    border-bottom: 1px solid #B3B3B3
}
.t2{
    width:100%;
    font-size: 12px;
    color:#999999;
}
.item{
    padding:5px;
    border:1px solid #E6E6E6;
}


.modeHead{
    height:25px;
    width:100%;
    background: #CCCCCC;
    padding-top:6px;
}
.headTitle{
    margin-left:10px;
    font-size:14px;
    color:#7F7F7F;
}
</style>
