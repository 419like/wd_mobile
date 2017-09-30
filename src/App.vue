<template>
    <div class="window" id="app">
        <div v-if="maskShow" class="mask flex center">
            <icon scale="3" class="fa-pulse icon" name="spinner"></icon>
        </div>
        <router-view class="window" keep-alive transition transition-mode="out-in"></router-view>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {}
    }, mounted() {
        let _this = this;
        setTimeout(() => {
            document.getElementById('mask').style.display = 'none';
        });
        
        // let userInfo = this.$store.getters.getUserInfo;
        
        // if (userInfo && userInfo.userId) {
        //     let params = {
        //         sjh: userInfo.userNum + '',
        //         mm: userInfo.password
        //     }
        //     this.api.Login(params)
        //         .then(res => {
        //             debugger
        //             let loginObj = {
        //                 userId: res.appid,
        //                 userNum: userInfo.userNum,
        //                 password: userInfo.password
        //             }
        //             if(res.user&&res.user.length){
        //                 this.$store.commit('setBoundList',res.user);
        //                 for (var i = res.user.length - 1; i >= 0; i--) {
        //                     if(res.user[i].gxmc == '本人'){
        //                         this.$store.commit('setHandleUser',res.user[i]);
        //                         break;
        //                     }
        //                 }
        //             }
        //             this.$store.commit('login',loginObj);
        //             this.$store.commit('setAppUserInfo',res.appuser[0]);
        //         })
        // }
    }, computed: {
        maskShow() {
            return this.$store.state.maskShow;
        }
    }
}
</script>
<style scoped>
.fa-pulse {
    animation: fa-spin 1s infinite steps(8);
}

.center {
    align-items: center;
    justify-content: center;
}

.icon {
    font-size: 30px;
    color: #fff;
}
</style>
