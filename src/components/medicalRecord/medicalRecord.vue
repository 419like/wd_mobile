<template>

    <div>
        <mt-header fixed title="就诊记录" class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="topBar"></div>
        <div class="flex holeW downShadow">
            <div class="flex1 tabTitle" :class="{'choose':(tabState=='abstract')}">就诊摘要</div>
            <div class="flex1 tabTitle" :class="{'choose':(tabState=='checkReport')}">检查报告</div>
            <div class="flex1 tabTitle" :class="{'choose':(tabState=='inspectionReport')}">检验报告</div>
        </div>
        <div class="flex">
            <div class="flex1">
                类型
            </div>
            <div class="flex1">
                时间
            </div>
        </div>
        <div>
            <div v-for="item in outpatientList" class="item">
                <div>
                    机构名称：{{item.mc}}
                </div>
                <div class="">
                    就诊时间：{{item.fssj}}
                </div>
                <div>
                    医生：{{item.ysxm}}
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">

export default {
    data() {
            return {
                msg: '个人中心',
                outpatientList:[],
                tabState:'abstract',
            }
        },
        methods: {
            
        },
        components:{

        },
        mounted(){
            let params = {
                brid:'46201'
            }
            this.api.getRegisterList(params).then(
                res=>{
                    console.log(res);
                    this.outpatientList = res.data;
                })
        }
}
</script>
<style scoped>
.title1{
    
}
.item{
    font-size: 12px;
    border-bottom: 1px solid #808080
}
</style>
