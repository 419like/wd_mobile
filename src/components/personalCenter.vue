<template>
    <div>
        <mt-header fixed :title=msg class="green"></mt-header>
        <div class="topBar"></div>
        <div class="personInfo">
            <img class="imgBox" :src=headImg @click="editInfo()">
            <span v-show="!number" class="unLogin" @click="goUrl('/login')">点击登录</span>
            <span v-show="number" class="unLogin" @click="showInfo()" v-text="number"></span>
        </div>
        <mt-cell title="设置" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <div class="footBar"></div>
        <mt-popup class="holePage" v-model="popupVisible" position="right">
            <div class="holePage">
                <mt-header fixed :title=msg class="green"></mt-header>
                <div class="holeHeight">
                    <div class="topBar"></div>
                    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
                    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
                    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
                    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
                    <mt-field label="网站" placeholder="请输入网址" type="url" v-model="website"></mt-field>
                    <mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>
                    <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
                    <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field>
                    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
                    <mt-field label="网站" placeholder="请输入网址" type="url" v-model="website"></mt-field>
                    <mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>
                    <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
                    <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field>
                    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
                    <mt-field label="网站" placeholder="请输入网址" type="url" v-model="website"></mt-field>
                    <mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>
                    <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
                    <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field>
                    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
                    <mt-field label="网站" placeholder="请输入网址" type="url" v-model="website"></mt-field>
                    <mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>
                    <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
                    <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                msg: '个人中心',
                list: [],
                headImg: 'http://www.czgongzuo.com/Files/PerPhoto/photoman.gif',
                number: '',
                popupVisible: false
            }
        },
        methods: {
            editInfo() {
                let _this = this;
                window.navigator.camera.getPicture(function(imageURI) {
                    _this.headImg = imageURI;
                }, takeFail, {
                    destinationType: window.Camera.DestinationType.FILE_URI
                });
            },
            goUrl(url) {
                this.$router.push({
                    path: url
                })
            },
            showInfo() {
                this.popupVisible = true;
            }
        },
        mounted() {
            if (window.config && window.config.userId) {
                this.number = window.config.userNum
            }
        },
        components: {

        },
}

//拍照成功后回调
function takeSuccess(imageURI) {
    console.log('success' + imageURI);
}

//失败后回调
function takeFail(message) {
    window.navigator.notification.alert("拍照失败，原因：" + message);
}
</script>
<style scoped>
.unLogin {
    position: absolute;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    width: 80px;
    text-align: center;
    left: 100px;
    top: 35px;
}

.topBar {
    height: 40px;
}

.footBar {
    height: 50px;
}

.personInfo {
    height: 120px;
    background: #3dbbaa;
    position: relative;
}

.imgBox {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 80px;
    height: 80px;
    background: #fff;
    border-radius: 50%;
}

.headImg {}
</style>
