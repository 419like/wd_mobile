<template>
    <div id="personinfo" class="holePage">
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="quit()"></mt-button>
        </mt-header>
        <div class="holeHeight" style="position:relative">
            <div class="topBar"></div>
            <mt-field label="手机号" v-model="value.sjh" ></mt-field>
            <mt-field label="姓名" v-model="value.xm"></mt-field>
            <mt-field label="身份证号" v-model="value.sfzh"></mt-field>
            <mt-field label="性别" v-model="value.xb"></mt-field>
            <mt-field label="地区" v-model="value.dzqh" @click.native="editArea()"></mt-field>
            <mt-field label="门牌号地址" v-model="value.dz"></mt-field>
            <div style="position: absolute;bottom: 10px;margin-left: 10%;width:80%;">
                <button class="mint-button mint-button--primary mint-button--large green" @click="save()">
                    <label class="mint-button-text font18">保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</label>
                </button>
            </div>
        </div>
        <div style="position:absolute;width:100%;height:100%;background: red;top:0px;left:0px;">
            
        </div>
    </div>
</template>
<script type="text/javascript">
import areaSelect from '@/components/common/areaSelect/areaSelect.vue';

export default {
    data() {
            return {
                msg: '个人信息',
                info:{
                    sjh:''
                },
                area:false,
            }
        },
        methods: {
            editArea(){
                this.area = true;
            },
            closeArea(){
                this.area = false;
            },
            quit(){
                this.$emit('close');
            },
            save(){
                console.log(this.value);
                let params = {
                    sjh:this.value.sjh?this.value.sjh:'',
                    xm:this.value.xm?this.value.xm:'',
                    sfzh:this.value.sfzh?this.value.sfzh:'',
                    xb:this.value.xb?this.value.xb:'',
                    dzqh:this.value.dzqh?this.value.dzqh:'',
                    dz:this.value.dz?this.value.dz:'',
                    id:this.value.id
                }
                debugger
                this.api.Regist(params)
                    .then(res => {
                        debugger
                        this.$toast('修改成功！')
                        this.quit();
                    })
            },
        },
        mounted() {

        },
        components: {
            areaSelect
        },
        computed: {

        },
        props:['value']
}
</script>
<style scoped>
</style>

