<template>
    <div class="login">
        <div class="center">
            <img class="logoImg" src="http://www.wondersgroup.com/wp-content/themes/wonders2016/images/logo.png">
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
            <span class="">忘记密码</span>
            <span class="register" @click="register()">注册</span>
        </div>
        <div class="otherLoginBox flex">
            <div class="flex1 center">
                <img class="icon" src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=309984969,696636847&fm=58">
                <div class="tip">微信</div>
            </div>
            <div class="flex1 center">
                <img class="icon" src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=535659886,848368851&fm=58">
                <div class="tip">QQ</div>
            </div>
        </div>
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
            goIndex(){
                this.$router.push({
                    path:'/index'
                })
            },
            register() {
                this.$router.push({
                    path: '/index/register'
                })
            },
            login() {
                let password = this.passwordFix(this.password);
                let params = {
                    sjh: this.number + '',
                    mm: password
                }
                this.api.Login(params)
                    .then(res => {
                        debugger
                        let loginObj = {
                            userId:res.appid,
                            userNum:params.sjh,
                            password:password
                        }
                        if(res.user&&res.user.length){
                            this.$store.commit('setBoundList',res.user);
                            for (var i = res.user.length - 1; i >= 0; i--) {
                                if(res.user[i].gxmc == '本人'){
                                    this.$store.commit('setHandleUser',res.user[i]);
                                    break;
                                }
                            }
                        }
                        this.$toast('登录成功！');
                        this.$store.commit('login',loginObj);
                        this.goback();
                    })
            }
        },
        created() {
            if (this.$store.getters.loginState) {
                this.$router.back();
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
