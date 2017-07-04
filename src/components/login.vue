<template>
    <div class="login">
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="center">
            <img class="logoImg" src="http://www.wondersgroup.com/wp-content/themes/wonders2016/images/logo.png">
        </div>
        <mt-field label="用户名" placeholder="请输入电话号码"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
        <div class="loginBtn">
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
                list: []
            }
        },
        methods: {
            register() {
                this.$router.push({
                    path: 'register'
                })
            },
            login() {
                this.$router.back();
            }
        },
        components: {

        }
}
</script>
<style scoped>
.logoImg{
    width:80%;
}
.tip{
    color:#808080;
}
.icon {
    width: 60px;
}

.otherLoginBox {
    padding-top: 20px;
    margin-top:50px;
    border-top: 1px solid #B3B3B3;
}

.extra {
    padding: 10px;
}

.loginBtn {
    margin: 10px;
}

.register {
    float: right;
    color: #408000;
}

.login {
    margin-top: 100px;
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
