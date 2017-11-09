<template>
    <div class="login">
        <div class="center" style="margin-bottom: 25px;">
            <span style="font-size: 34px;color:#666666;font-weight: bold;">{{api.indexTitle}}</span>
        </div>
        <mt-field label="用户名" placeholder="请输入电话号码" v-model="number"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" v-model="password" type="password"></mt-field>
        <div class="centerBtn">
            <button class="mint-button mint-button--primary mint-button--large green" @click="login()">
                <!---->
                <label class="mint-button-text font18">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</label>
            </button>
        </div>
        <div class="extra">
            <span style="color:#7F7F7F;" @click="forgetPassword();">忘记密码</span>
            <span class="register" @click="register()">注册</span>
        </div>
        <img src="../assets/company_logo.png" style="width:60%;position: absolute;bottom: 10px;left:20%;">
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            msg: '登录',
            list: [],
            number: '',
            password: ''
        }
    },
    methods: {
        forgetPassword() {
            this.$router.push({
                name: 'rePassword'
            })
        },
        goIndex() {
            this.$router.push({
                path: '/index'
            })
        },
        register() {
            this.$router.push({
                path: '/index/register'
            })
        },
        login() {
            if (!this.number) {
                this.$toast('账号不能为空');
                return;
            }
            if (!this.password) {
                this.$toast('密码不能为空');
                return;
            }
            let password = this.passwordFix(this.password);
            let params = {
                sjh: this.number + '',
                mm: password
            }
            this.api.Login(params)
                .then(res => {
                    
                    if (res.code == 1) {
                        let loginObj = {
                            userId: res.appid,
                            userNum: params.sjh,
                            password: password
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
                        
                        this.$emit('loginoutEvent');
                        if (this.$store.getters.getOpenId) {
                            let param = {
                                sjh: this.number,
                                bsh: this.$store.getters.getOpenId,
                                lx: '2',
                            }
                            this.bondOpenid(param);
                        } else {
                            this.$router.push({
                                name: 'home'
                            })
                        }

                    } else {
                        this.$toast(res.msg);
                    }
                })
        },
        bondOpenid(params) {
            this.api.bondOpenid(params)
                .then(
                    res => {
                        
                        if (res.code == 1) {
                            this.$toast('绑定微信账号成功！');

                        } else {
                            this.$toast('绑定微信账号失败！' + res.msg)
                        }
                        this.checkMode()
                    })
        },
        checkMode() {
            if (this.$store.getters.getEnterMode == 1) {
                this.$router.push({
                    name: 'hospitalPage',
                    query: {
                        id: this.$store.getters.getCurrentHis.id,
                        dyms: 1
                    }
                })
                return;
            }
            this.$router.push({
                name: 'home'
            })
        }
    },
    created() {
        if (this.$route.query.number) {
            this.number = this.$route.query.number;
        }
        ;
        console.log(this.$store.getters.getAppUserInfo);
        if (this.$store.getters.loginState) {
            if (this.$store.getters.getOpenId) {
                
                let param = {
                    sjh: this.$store.getters.getAppUserInfo.userNum,
                    bsh: this.$store.getters.getOpenId,
                    lx: '2',
                }
                this.bondOpenid(param);
            } else {
                this.$router.push({
                    name: 'home'
                })
            }

        }
    },
    components: {

    },
}

</script>
<style scoped>
.logoImg {
    width: 80%;
}

.tip {
    color: #808080;
}

.icon {
    width: 60px;
}

.otherLoginBox {
    padding-top: 20px;
    margin-top: 50px;
    border-top: 1px solid #B3B3B3;
}

.extra {
    padding: 10px;
}

.register {
    float: right;
    color: #408000;
}

.login {
    margin-top: 50px;
    margin-left: 20px;
    margin-right: 20px;
}

.menuBtn {
    height: 30px;
}

.topBar {
    height: 40px;
}

.footBar {
    height: 44px;
}

</style>
