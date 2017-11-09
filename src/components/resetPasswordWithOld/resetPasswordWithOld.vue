<template>
    <div style="position:relative;">
        <mt-field label="旧密码" v-model="oldPassword" placeholder="请输入旧密码" type="password"></mt-field>
        <mt-field label="新密码" v-model="newPassword" placeholder="请输入新密码" type="password"></mt-field>
        <mt-field label="确认密码" v-model="confirmPassword" placeholder="请再次输入新密码" type="password"></mt-field>
        <div style="position: absolute;bottom: 10px;margin-left: 10%;width:80%;">
            <button class="mint-button mint-button--primary mint-button--large green" @click="save()">
                <label class="mint-button-text font18">确认修改</label>
            </button>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    },
    methods: {
        save() {
            let params = {
                sjh: this.$store.getters.getUserInfo.userNum,
                jmm: this.passwordFix(this.oldPassword),
                xmm: this.passwordFix(this.confirmPassword)
            }
            this.api.resetPasswordWithOld(params)
                .then(
                    res => {
                        if (res.code == 1) {
                            this.$toast('修改成功,请重新登录！');
                            this.$store.commit('loginOut');
                            this.$router.push({
                                name: 'login'
                            })
                        } else {
                            this.$toast(res.msg);
                        }
                    }
                )
        },
    },
    mounted() {

    },
    components: {

    },
    computed: {

    }
}

</script>
<style scoped>


</style>
