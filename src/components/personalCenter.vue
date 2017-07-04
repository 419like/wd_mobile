<template>
    <div>
        <mt-header fixed :title=msg class="green"></mt-header>
        <div class="topBar"></div>
        <div class="personInfo">
            <img class="imgBox" :src=headImg @click="editInfo()">
            <span class="unLogin" @click="goUrl('/login')">点击登录</span>
        </div>
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
        <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        <div class="footBar"></div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                msg: '个人中心',
                list: [],
                headImg: 'http://www.czgongzuo.com/Files/PerPhoto/photoman.gif',
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
            goUrl(url){
                this.$router.push({path:url})
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
.unLogin{
    position: absolute;
    color:#fff;
    border:1px solid #fff;
    border-radius: 4px;
    height:30px;
    line-height: 30px;
    width:80px;
    text-align: center;
    left:100px;
    top:35px;
}
.topBar{
    height: 40px;
}

.footBar{
    height:50px;
}
.personInfo {
    height: 120px;
    background: #3dbbaa;
    position: relative;
}

.imgBox {
    position: absolute;
    left:10px;
    top:10px;
    width: 80px;
    height: 80px;
    background: #fff;
    border-radius: 50%;
}
.headImg {

}
</style>
