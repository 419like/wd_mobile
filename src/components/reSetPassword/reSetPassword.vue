<template>
    <div>
        <div>
            <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="password"></mt-field>
            <mt-field label="确认" placeholder="再次输入" type="password" v-model="rePassword"></mt-field>
        </div>
        <div class="btnCenter">
            <button class="mint-button mint-button--primary mint-button--large green" @click="confirm()">
                <!---->
                <label class="mint-button-text font18">确认修改</label>
            </button>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            password: '',
            rePassword: ''
        }
    },
    methods: {
        confirm() {
            if (this.password.length < 6) {
                this.$toast('密码长度需六位以上！');
                return;
            }
            if (this.password == this.rePassword) {
                let params = {
                    sjh: this.number ? this.number : '',
                    mm: this.passwordFix(this.password),
                }
                this.api.reSetPassword(params)
                    .then(res => {
                        if(res.code==1){
                            this.$toast('修改成功！');
                            this.$router.push({
                                name:'personalCenter',
                                query:{
                                    number:this.number
                                }
                            })
                        }
                    })
            }
        }
    },
    created() {
        this.$store.commit('setPageTitle', '重置密码');
        this.number = this.$route.query.number;
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
