<template>
    <div>
        <div>
            <mt-field label="账号" placeholder="电话号码" v-model="number" :disabled="numberAble"></mt-field>
            <div style="position:relative;">
                <mt-field v-model="code" label="验证码" placeholder="验证码"></mt-field>
                <div style="position:absolute;right:5px;top:10px;">
                    <mt-button size="small" style="margin-bottom: 10px;width:140px;" :disabled="sendAble" @click="getCode()">{{secondCount?(secondCount+'秒')+'后重新发送':'发送验证码'}} </mt-button>
                </div>
            </div>
        </div>
        <div class="centerBtn">
            <button class="mint-button mint-button--primary mint-button--large green" @click="confirm()">
                <!---->
                <label class="mint-button-text font18">验&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;证</label>
            </button>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            numberAble:false,
            number: '',
            confirmCode: '',
            secondCount: 0,
            code: '',
            sendAble: false,
        }
    },
    methods: {
        confirm() {
            if (!this.code) {
                this.$toast("请输入验证码。");
                return;
            }
            if (this.code == this.confirmCode) {
                this.$router.push({
                    name: 'reSetPassword',
                    query:{
                        number:this.number
                    }
                })
            } else {
                this.$toast("验证码错误！");
            }
        },
        count() {
            setTimeout(() => {
                if (this.secondCount != 0) {
                    this.secondCount--;
                    this.count();
                } else {
                    this.sendAble = true;
                }
            }, 1000)
        },
        getCode() {
            this.confirmCode = (Math.random() + '').substring(2, 6)

            let params = {
                "xxlx": "CHKCODE",
                "jgid": this.$store.getters.getCurrentHis.id,
                "ywlx": "密码修改",
                "ywid": "2",
                "sjhm": this.number,
                "xxnr": {
                    "type": "密码修改",
                    "code": this.confirmCode
                }
            }
            console.log(params);
            
            this.api.getSms(params)
                .then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        this.$toast('验证码已发送')
                        this.secondCount = 30;
                        this.startCount();
                    } else {
                        this.$toast('验证码发送错误' + res.msg)
                    }
                })
        },
        startCount() {
            this.sendAble = false;
            this.count();
        },

    },
    created() {
        this.$store.commit('setPageTitle', '重置密码');
        let userInfo = this.$store.getters.getUserInfo
        if(userInfo&&userInfo.userNum){
            this.number = userInfo.userNum;
        }
        
        
    },
    components: {

    },
}

</script>
<style scoped>
.btnCenter {
    margin: 10px;
}

</style>
