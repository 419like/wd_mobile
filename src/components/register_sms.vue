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
                    <label class="mint-button-text font18">发送验证码</label>
                </button>
            </div>
        </div>
        <div v-show="step==2">
            <mt-field v-model="code" label="验证码" placeholder="请输入验证码"></mt-field>
            <div class="btnCenter">
                <mt-button size="large" style="margin-bottom: 10px;" :disabled="sendAble" @click="reSendSms">{{secondCount}}秒 重新发送</mt-button>
                <button class="mint-button mint-button--primary mint-button--large green" @click="goStep(3)">
                    <!---->
                    <label class="mint-button-text font18">下一步</label>
                </button>
            </div>
        </div>
        <div v-show="step==3">
            <mt-field label="密码" placeholder="请输入密码" :type="passwordShow?'':'password'" v-model="password">
                <div class="showBtn" @click="transShow()">
                    <icon v-if="passwordShow" name="eye" scale="1.3"></icon>
                    <icon v-if="!passwordShow" name="eye-slash" scale="1.3"></icon>
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
        reSendSms(){
            this.confirmCode = parseInt(Math.random() * 10000) + ''
                    
                    let params = {
                        "xxlx": "PUB",
                        "jgid": "0",
                        "ywlx": "挂号",
                        "ywid": "1",
                        "sjhm": "15828051331",
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
                            }else{
                                this.$toast('验证码发送错误'+res.msg)
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
                    let loginObj = {
                        userId: res.id,
                        userNum: this.number,
                        password: password,
                    }
                    this.$store.commit('login', loginObj);
                    this.$router.back();
                })
        },
        count() {
            setTimeout(()=> {
                if (this.secondCount != 0) {
                    this.secondCount--;
                    this.count();
                }else{
                    this.sendAble = false;
                }
            },1000)
        },
        goStep(step) {
            
            if (step == 2) {
                if (this.number.length != 11 || this.number.charAt(0) != 1) {
                    this.$toast('请输入正确的手机号！')
                    return;
                } else {
                    this.confirmCode = parseInt(Math.random() * 10000) + ''
                    
                    let params = {
                        "xxlx": "PUB",
                        "jgid": "0",
                        "ywlx": "挂号",
                        "ywid": "1",
                        "sjhm": "15828051331",
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
                                this.step = step;
                                this.count();
                            }else{
                                this.$toast('验证码发送错误'+res.msg)
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
