<template>
    <div>
        <div class="margin20 flex center font14">
            <div class="flex1">
                1输入手机号
            </div>
            <div class="flex1">
                2输入验证码
            </div>
            <div class="flex1">
                3设置密码
            </div>
        </div>
        <mt-progress :value=33.3*step>
        </mt-progress>
        <div v-show="step==1">
            <mt-field label="电话号码" placeholder="请输入电话号码" v-model="number"></mt-field>
            <div class="btnCenter">
                <button class="mint-button mint-button--primary mint-button--large green" @click="goStep(2)">
                    <!---->
                    <label class="mint-button-text font18">下一步</label>
                </button>
            </div>
        </div>
        <div v-show="step==2">
            <div style="position:relative;">
                <mt-field v-model="code" label="验证码" placeholder="验证码"></mt-field>
                <div style="position:absolute;right:5px;top:10px;">
                    <mt-button size="small" style="margin-bottom: 10px;width:140px;" :disabled="sendAble" @click="reSendSms">{{secondCount?(secondCount+'秒')+'后重新发送':'发送验证码'}} </mt-button>
                </div>
            </div>
            <div class="btnCenter">
                <button class="mint-button mint-button--primary mint-button--large green" @click="goStep(3)">
                    <!---->
                    <label class="mint-button-text font18">下一步</label>
                </button>
            </div>
        </div>
        <div v-show="step==3">
            <mt-field label="密码" placeholder="请输入密码" :type="passwordShow?'':'password'" v-model="password">
                <div class="showBtn" @click="transShow()">
                    <svg v-if="passwordShow" viewBox="0 0 1024 1024" class="svgIcon" style="height:30px;fill:#7F7F7F;">
                        <path d="M0 491.52s460.8 580.608 1024 0C460.8-80.384 0 491.52 0 491.52z m506.368 200.192a196.608 196.608 0 1 1 194.048-196.608 195.072 195.072 0 0 1-194.048 196.608z"></path>
                        <path d="M431.104 495.104a76.288 75.264 90 1 0 150.528 0 76.288 75.264 90 1 0-150.528 0Z"></path>
                    </svg>
                    <svg v-if="!passwordShow" viewBox="0 0 1024 1024" class="svgIcon" style="height:30px;fill:#7F7F7F;">
                        <path d="M310.272 477.696a189.952 189.952 0 0 1 175.104-153.6 222.72 222.72 0 0 1 84.992 7.68l58.88-51.2C314.368 217.088 77.824 409.6 9.216 473.6a27.136 27.136 0 0 0 0 39.936A832 832 0 0 0 204.8 651.776l112.128-99.328a158.208 158.208 0 0 1-6.656-74.752zM819.2 342.528l-119.808 107.008a157.696 157.696 0 0 1 5.632 70.656 189.952 189.952 0 0 1-168.448 153.6A222.72 222.72 0 0 1 454.144 665.6L399.36 716.8c171.008 30.208 383.488-3.072 614.4-200.704a27.648 27.648 0 0 0 0-43.008A994.304 994.304 0 0 0 819.2 342.528zM518.144 563.2a54.784 54.784 0 0 0 22.528-9.216c43.52-29.696 46.08-51.2 44.032-67.072l208.896-183.296a35.84 35.84 0 0 0 0-54.784 47.616 47.616 0 0 0-61.952 0l-204.8 181.76a80.384 80.384 0 0 0-55.808 6.656 76.288 76.288 0 0 0-34.304 33.792 57.856 57.856 0 0 0-3.584 42.496l-190.464 169.472a35.84 35.84 0 0 0 0 54.784 47.616 47.616 0 0 0 61.952 0L498.688 563.2a73.728 73.728 0 0 0 19.456 0z"></path>
                    </svg>
                </div>
            </mt-field>
            <div class="btnCenter">
                <button class="mint-button mint-button--primary mint-button--large green" @click="register()">
                    <!---->
                    <label class="mint-button-text font18">确定</label>
                </button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            msg: '注册',
            list: [],
            step: 1,
            passwordShow: false,
            password: '',
            number: '',
            confirmCode: '',
            sendAble: true,
            secondCount: 30,
            code: '',
            timer: '',
        }
    },
    methods: {
        reSendSms() {
            this.confirmCode = (Math.random() + '').substring(2, 6)
            let params = {
                "xxlx": "PUB",
                "jgid": "0",
                "ywlx": "挂号",
                "ywid": "1",
                "sjhm": this.number,
                "xxnr": {
                    "name": "用户",
                    "date": "2017-09-19",
                    "type": "验证请求",
                    "telnum": this.confirmCode
                }
            }
            this.api.getSms(params)
                .then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        this.$toast('验证码已发送')
                        this.secondCount = 30;
                        this.count();
                    } else {
                        this.$toast('验证码发送错误' + res.msg)
                    }
                })
        },
        register() {
            if (this.password.length < 6) {
                this.$toast('密码长度需六位以上！');
                return;
            }
            let password = this.passwordFix(this.password);
            let params = {
                sjh: this.number + '',
                lx: "1",
                mm: password
            }

            this.api.Regist(params)
                .then(res => {
                    this.$toast('注册成功！')
                    if (this.$store.getters.getOpenId) {
                        let param = {
                            sjh:this.number,
                            bsh:this.$store.getters.getOpenId,
                            lx:'2',
                        }
                        this.bondOpenid(param);
                    }
                    // let loginObj = {
                    //     sjh: this.number,
                    //     mm: password,
                    // }
                    // this.login(loginObj)
                })
        },
        bondOpenid(params){
            this.api.bondOpenid(params)
            .then(
                res=>{
                    
                    if(res.code==1){
                        this.$toast('绑定成功！');

                    }else{
                        this.$toast('绑定失败！'+res.msg)
                    }
                })
        },
        login(obj) {
            let params = obj;
            this.api.Login(params)
                .then(res => {
                    if (res.code == 1) {
                        let loginObj = {
                            userId: res.appid,
                            userNum: params.sjh,
                            password: params.mm
                        }
                        if (res.user) {
                            this.$store.commit('setBoundList', res.user);
                            for (var i = res.user.length - 1; i >= 0; i--) {
                                if (res.user[i].gxmc == '本人') {
                                    this.$store.commit('setHandleUser', res.user[i]);
                                    break;
                                }
                            }
                        }
                        this.$toast('登录成功！');
                        res.appuser[0].userId = loginObj.userId;
                        res.appuser[0].userNum = loginObj.userNum;
                        res.appuser[0].password = loginObj.password;
                        this.$store.commit('setAppUserInfo', res.appuser[0]);
                        this.$router.push({
                            name: 'index'
                        })
                    } else {
                        this.$toast(res.msg);
                    }
                })
        },
        count() {
            setTimeout(() => {
                if (this.secondCount != 0) {
                    this.secondCount--;
                    this.count();
                } else {
                    this.sendAble = false;
                }
            }, 1000)
        },
        getSms(step) {
            this.confirmCode = (Math.random() + '').substring(2, 6)
            // 省钱模式
            // console.log(this.confirmCode);
            // this.$toast('验证码已发送')
            // this.step = step;
            // this.count();
            // 花钱模式
            let params = {
                "xxlx": "CHKCODE",
                "jgid": this.$store.getters.getCurrentHis.id,
                "ywlx": "注册",
                "ywid": "1",
                "sjhm": this.number,
                "xxnr": {
                    "type": "注册用户",
                    "code": this.confirmCode
                }
            }
            this.api.getSms(params)
                .then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        this.$toast('验证码已发送')
                        this.step = step;
                        this.count();
                    } else {
                        this.$toast('验证码发送错误' + res.msg)
                    }
                })
        },
        goStep(step) {
            if (step == 2) {
                if (this.number.length != 11 || this.number.charAt(0) != 1) {
                    this.$toast('请输入正确的手机号！')
                    return;
                } else {
                    let params = {
                        sjh: this.number
                    }
                    this.api.checkNumRegister(params)
                        .then(res => {
                            
                            if (res.data.length) {
                                this.$messagebox.confirm('', {
                                    message: '该号码已注册，去登录？',
                                    title: '提示',
                                    confirmButtonText: '去登录',
                                    cancelButtonText: '留在本页'
                                }).then(() => {
                                    this.$router.push({
                                        name: 'login',
                                        query: {
                                            number: this.number
                                        }
                                    })
                                });
                            } else {
                                this.getSms(step);
                            }
                        })

                }
            }
            if (step == 3) {
                if (this.code.length != 4) {
                    this.$toast('请输入正确的验证码！')
                    return;
                } else {
                    if (this.code == this.confirmCode) {
                        this.step = step;
                    } else {
                        this.$toast('验证码错误，请重输。')
                    }
                }
            }
        },
        transShow() {
            this.passwordShow = !this.passwordShow;
        }
    },
    components: {

    }
}

</script>
<style scoped>
.showBtn {
    position: absolute;
    right: 30px;
    top: -10px;
    font-size: 20px;
    color: #999999;
    width: 20px;
    height: 20px;
}

.btnCenter {
    margin: 10px;
}

.register {
    float: right;
    color: #408000;
}

</style>
