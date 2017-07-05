<template>
    <div>
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="topBar"></div>
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
            <mt-field label="验证码" placeholder="请输入验证码"></mt-field>
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
                number: ''
            }
        },
        methods: {
            register() {
                let password = this.passwordFix(this.password);
                debugger
                let params = {
                    sjh: this.number + '',
                    lx: "1",
                    mm: password
                }
                this.api.Regist(params)
                    .then(res => {
                        this.$toast('注册成功！')
                        window.config.userId = res.id;
                        window.config.userNum = this.number;
                        this.$router.back();
                    })
            },
            goStep(step) {
                this.step = step;
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
