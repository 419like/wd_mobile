<template>
    <div id="personinfo" class="holePage">
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="quit()"></mt-button>
        </mt-header>
        <div class="holeHeight">
            <div class="topBar"></div>
            <mt-field label="手机号" v-model="info.sjh" ></mt-field>
            <mt-field label="姓名" v-model="info.xm"></mt-field>
            <mt-field label="身份证号" v-model="info.sfzh"></mt-field>
            <mt-field label="性别" v-model="info.xb"></mt-field>
            <mt-field label="地区" v-model="info.dzqh"></mt-field>
            <mt-field label="门牌号地址" v-model="info.dz"></mt-field>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                msg: '个人信息',
                info:{
                    sjh:15828051331
                }
            }
        },
        methods: {
            quit(){
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
