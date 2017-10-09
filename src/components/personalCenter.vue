<template>
    <div>
        <div class="personInfo" style="display: flex;">
            <div style="width:120px;">
                <img class="imgBox" :src=headImg @click="editInfo()">
            </div>
            <div style="flex:1">
                <div v-if="!loginState">
                    <span class="unLogin" @click="goUrl('/index/login')">点击登录</span>
                </div>
                <div v-if="loginState" @click="showInfo()">
                    <div class="row" style="margin-top:25px;">
                        <div style="flex:1">{{appUserInfo.xm}}</div>
                        <div style="flex:1">{{appUserInfo.userNum}}</div>
                    </div>
                    <div class="row">
                        <div style="font-size: 12px;">{{appUserInfo.sfzh}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="flex">
                <div class="flex2 title">人员绑定</div>
                <div class="flex2 center"></div>
                <div class="flex1 center addIcon" @click="showTreatmentCard">新增</div>
            </div>
            <div>
                <div class="boundItem flex" v-for="item in boundlist">
                    <div class="userTitle"  @click="boundEdit(item);" :class="{itemChoosed:(handleUser==item)}">{{item.hzxm}}</div>
                    <div class="userChoosed" v-if="handleUser.hzid==item.hzid">默认用户&nbsp;&nbsp;&nbsp;</div>
                    <div class="userNormal" v-if="handleUser.hzid!=item.hzid" @click="setHandleUser(item)">设为默认&nbsp;&nbsp;&nbsp;</div>
                </div>
            </div>
        </div>
        <div class="mask pCenter" v-if="boundPage" >
            <div class="outTouch" @click="closeBoundPage()">
            </div>
            <div class="selectBox" style="position:relative;">
                <div class="flex infoHead">
                    <div class="flex2">{{patientInfo.kh?patientInfo.kh:'暂无卡号'}}</div>
                </div>
                <mt-field label="姓名" placeholder="姓名" v-model="patientInfo.hzxm"></mt-field>
                <mt-field label="关系" placeholder="关系" v-model="patientInfo.gxmc"></mt-field>
                <mt-field label="联系电话" placeholder="联系电话" v-model="patientInfo.lxdh"></mt-field>
                <div class="btnA">
                    <mt-button type="primary" @click="unbound();" class="btn">解除绑定</mt-button>
                </div>
                <div class="btnA bottom">
                    <mt-button type="default" @click="closeBoundPage();" class="btn">返回</mt-button>
                </div>
            </div>
        </div>
        <div v-show="loginState" class="bottomBtn">
            <button class="mint-button mint-button--primary mint-button--large green" @click="loginOut()">
                <label class="mint-button-text font18">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</label>
            </button>
        </div>
        <div class="footBar"></div>
        <mt-popup class="holePage" v-model="personinfoVisible" position="right">
            <personinfo @close="closeInfo" v-model="userInfo"/>
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
                headImg: 'http://www.czgongzuo.com/Files/PerPhoto/photoman.gif',
                number: '',
                personinfoVisible: false,
                personConfigVisible:false,
                boundPage:false,
                userInfo:{},
            }
        },
        methods: {
            setHandleUser(item){
                this.$store.commit('setHandleUser',item);
            },
            boundEdit(item){
                this.$router.push({
                    path:'/boundEdit',
                    query:item
                })
            },
            closeBoundPage(){
                this.boundPage = false;
            },
            editBound(){
                this.boundPage = true;
            },
            unbound(){
                let params = {
                    hzid:this.$store.getters.getHzid,
                    yhid:this.$store.getters.userId,
                    bz:'0'
                }
                this.api.treatmentCardunBind(params)
                .then(
                        res=>{
                            this.$store.commit('patientInfoLogoff');
                            this.closeBoundPage();
                            this.$toast('解绑成功！');
                        }
                    );
            },
            loginOut(){
                debugger
                this.$store.commit('loginOut');
                this.$emit('close');
            },
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
                let params = {
                    id:this.$store.getters.userId,
                }
                this.api.getUserInfo(params)
                .then(
                        res=>{
                            res.data[0].id = params.id;
                            if(res.data[0].csrq){
                                res.data[0].birthday = res.data[0].csrq.split(' ')[0];
                            }
                            if(res.data[0].dzqh){
                                this.loadAreaHoleInfo(res.data[0]);
                            }else{
                                this.userInfo = res.data[0];
                                this.personinfoVisible = true;
                            }

                        }
                    )
            },
            loadAreaHoleInfo(userInfo){
                let params = {
                        dqxzqh:userInfo.dzqh
                    }
                    this.api.getParentsArea(params)
                    .then(
                            res=>{
                                let areaStr = '';
                                let holeAreaArray = [];
                                for (var i = 0; i < res.data.length; i++) {
                                    holeAreaArray.push({
                                        id:res.data[i].dm,
                                        mc:res.data[i].mc
                                    });
                                    areaStr += res.data[i].mc;
                                }
                                userInfo.areaStr = areaStr;
                                userInfo.holeAreaArray = holeAreaArray;
                                userInfo.currentLevel = res.data.length;
                                this.userInfo = userInfo;
                                
                                this.personinfoVisible = true;
                            }
                        )
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
                    query:{name:this.appUserInfo.xm,idCard:this.appUserInfo.sfzh}
                })
            },
            backIndex(){
                this.$router.push({
                    path:'index/home'
                })
            }
        },
        created() {
        },
        mounted() {
            debugger
            this.$store.commit('setPageTitle',"个人信息");
            this.$store.commit('defineBackFun',this.backIndex)
            if(!this.handleUser){
                this.$store.commit('setHandleUser',this.boundlist[0]);
            }
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
            },
            boundlist(){
                return this.$store.getters.getBoundList;
            },
            handleUser() {
                return this.$store.getters.getHandleUser;
            },
            appUserInfo() {
                return this.$store.getters.getAppUserInfo;
            },
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
.row{
    display: flex;
    height:40px;
    font-size: 16px;
    color: #FFFFFF;
}
.userTitle.itemChoosed{
    color:#3dbbaa;
}
.userChoosed{
    font-size: 12px;
    line-height: 30px;
    text-align: right;
    flex:1;
    color:#3dbbaa;
}
.userNormal{
    font-size: 12px;
    line-height: 30px;
    text-align: right;
    flex:1;
    color:#B3B3B3;
}
.userTitle{
    margin-left:40px;
    color:#666666;
    font-size:16px;
    line-height: 30px;
    width:100px;
}
.addIcon{
    color:#3dbbaa;
    line-height: 40px;
    text-align: center;
}
.title{
    font-size: 20px;
    margin-left: 20px;
    line-height: 40px;
}
.boundItem{
    width:100%;
    font-size: 20px;
}
.bottom{
    position: absolute;
    bottom: 10px;
    width:100%;
}
.btn{
    width:80px;
    height:30px;
    margin:8px;
    font-size: 14px;
}
.btnA{
    text-align: center;
}
.infoHead{
    font-size:20px;
    margin-top:20px;
    margin-bottom: 10px;
    text-align: center;
}
.bottomBtn{
    position: absolute;
    bottom: 60px;
    width:calc(100% - 20px);
    margin: 10px;
}
.cardContent{
    color:#808080;
    font-size: 12px;
}
.cardHead{
    font-size: 14px;
}
.card{
    margin:5px;
    padding:8px;
    background: #CCCCCC;
    border: 1px solid #cacaca;
    border-radius: 6px;
}
.Login {
    position: absolute;
    color: #fff;
    /*border: 1px solid #fff;*/
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
    margin-left:10px;
    margin-top: 20px;
    width: 80px;
    height: 80px;
    background: #fff;
    border-radius: 50%;
}

.headImg {}
</style>
