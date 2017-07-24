<template>
    <div id="app">
        <div v-if="maskShow" class="mask flex center">
            <icon scale="3" class="fa-pulse icon" name="spinner"></icon>
        </div>
        <router-view keep-alive transition transition-mode="out-in"></router-view>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {}
    }, mounted() {
        let _this = this;
        setTimeout(() => {
            document.getElementById('mask').style.display = 'none'
        });
        let userInfo = this.$store.getters.localUserInfo;
        if (userInfo && userInfo.userId) {
            let params = {
                sjh: userInfo.userNum + '',
                mm: userInfo.password
            }
            this.api.Login(params)
                .then(res => {
                    let loginObj = {
                        userId: res.user[0].id,
                        userNum: userInfo.userNum,
                        password: userInfo.password
                    }
                    this.$store.commit('login', loginObj);
                    if(res.user[0].hzid){
                        this.$store.commit('treatmentCardBind',res.user[0].hzid);
                    }
                    this.$toast('登录成功！');
                    // this.api.getTreatmentCardInfo({userid:loginObj.userId}).then(res=>{
                    //         if(res.data[0]){
                    //             console.log('用户已绑定。');
                    //         }
                    //     });
                })
        }
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
