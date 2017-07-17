<template>
    <div id="page" class="holePage">
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="quit()"></mt-button>
        </mt-header>
        <div class="holeHeight">
            <div class="topBar"></div>
            <div class="centerBtn">
                <button class="mint-button mint-button--primary mint-button--large green" @click="loginOut()">
                    <!---->
                    <label class="mint-button-text font18">退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</label>
                </button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                msg: '设置',
            }
        },
        methods: {
            quit() {
                this.$emit('close');
            },
            loginOut(){
                this.$store.commit('loginOut');
                this.$emit('close');
            }
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
