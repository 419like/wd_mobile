<template>
    <div>
        <mt-header fixed :title=msg class="green"></mt-header>
        <div class="topBar"></div>
        <div class="personInfo">
            <img class="imgBox" :src=headImg @click="editInfo()">
            <span v-show="!loginState" class="unLogin" @click="goUrl('/login')">点击登录</span>
            <span v-show="loginState" class="Login" @click="showInfo()" v-text="userNum"></span>
        </div>
        <div v-show="!bindState">
            <mt-cell title="就诊卡绑定" label="" is-link @click.native="showTreatmentCard()"></mt-cell>
        </div>
        <div v-show="bindState">
            <mt-cell title="就诊卡信息(已绑定)" label="" is-link @click.native="showTreatmentCard()" ></mt-cell>
        </div>
        
        <mt-cell title="设置" label="描述信息" is-link @click.native="showConfig()"></mt-cell>
        <div class="footBar"></div>
        <mt-popup class="holePage" v-model="personinfoVisible" position="right">
            <personinfo @close="closeInfo" />
        </mt-popup>
        <mt-popup class="holePage" v-model="personConfigVisible" position="right">
            <person-config @close="closeConfig" />
        </mt-popup>
    </div>
</template>
<script type="text/javascript">
import personinfo from '@/components/personinfo';
import personConfig from '@/components/personConfig';
export default {
    data() {
            return {
                msg: '个人中心',
                list: [],
                headImg: 'http://www.czgongzuo.com/Files/PerPhoto/photoman.gif',
                number: '',
                personinfoVisible: false,
                personConfigVisible:false
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
                this.personinfoVisible = true;
            },
            closeInfo() {
                this.personinfoVisible = false;
            },
            showConfig() {
                this.personConfigVisible = true;
            },
            closeConfig() {
                this.personConfigVisible = false;
            },
            showTreatmentCard(){
                this.$router.push({
                    path:'/treatmentCardBind',
                })
            }
        },
        created() {
        },
        mounted() {
        },
        components: {
            personinfo,personConfig
        },
        computed: {
            loginState() {
                return this.$store.getters.loginState;
            },
            userNum(){
                return this.$store.getters.userNum;
            },
            bindState(){
                return this.$store.getters.bindState;
            }
        }
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
.Login {
    position: absolute;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    width: 110px;
    text-align: center;
    left: 100px;
    top: 35px;
}

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
