<template>

    <div>
        <!-- <mt-header fixed title="就诊记录" class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="topBar"></div> -->
        <div class="flex holeW downShadow">
            <div class="flex1 tabTitle" :class="{'choose':(tabState=='abstract')}">就诊摘要</div>
            <div class="flex1 tabTitle" :class="{'choose':(tabState=='checkReport')}">检查报告</div>
            <div class="flex1 tabTitle" :class="{'choose':(tabState=='inspectionReport')}">检验报告</div>
        </div>
        <div class="flex colorInfo">
            <div class="flex2 iT1 flex">
                <div class="icon1">
                </div>
                <div class="">
                    就诊列表
                </div>
            </div>
            <div class="flex1 flex">
                <div class="t3">门诊</div>
                <div class="lb mz"></div>
            </div>
            <div class="flex1 flex">
                <div class="t3">住院</div>
                <div class="lb zy"></div>
            </div>
        </div>
        <div class="listBox">
            <div v-for="item in outpatientList" class="item" @click="goDetail()">
                <div class="flex">
                    <div class="flex2 headText">{{item.jgmc}}</div>
                    <div class="flex1 timeText">{{item.sj.split(' ')[0]}}</div>
                </div>
                <div class="flex">
                    <div class="flex1">{{item.ksmc}}</div>
                    <div class="flex1">{{item.ysxm?'医生：'+item.ysxm:''}}</div>
                </div>
                <div>
                    <div>诊断：{{item.zdmc}}</div>
                </div>
                <div class="iconType" :class="{'zy':item.type=='zy','mz':item.type=='mz'}">
                    
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
            goDetail(){
                // this.$route.push({
                //     path:'/visitDetai',
                //     query:
                // })
            }
        },
        components:{

        },
        mounted(){
            if(!this.$store.getters.getHandleUser){
                this.$router.push({
                    path:'/treatmentCardBind'
                })
                return;
            }
            let params = {
                brid:this.$store.getters.getHandleUser.hzid
            }
            this.api.getVisitingList(params).then(
                res=>{
                    console.log(res);
                    this.outpatientList = res.data;
                })
        }
}
</script>
<style scoped>
.iconType{
    position: absolute;
    right:0px;
    height:100%;
    width:5px;
    top:0px;
}
.icon1{
    width:4px;
    height:12px;
    background: #3dbbaa;
    margin-left: 6px;
    margin-top:2px;
    margin-right:2px;
    border-radius: 2px;
}
.lb{
    width:20px;
    height:10px;
    margin-top:2px;
    margin-left: 5px;
}
.t3{
    margin-left: 20px;
}
.colorInfo{
    height:16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    border-top: 1px solid #999999;
    border-bottom: 1px solid #999999;
}
.mz{
    background: #c2eded;
}
.zy{
    background: #f5d9a1;
}
.headText{
    font-size: 13px;
    color:#000000;
}
.timeText{
    text-align: right;
    color:#999999;
}
.listBox{
    height: calc(100% - 41px - 51px - 14px);
    overflow-y: auto;
}
.iT1{
    text-align: left;
    font-size: 14px;
}
.item{
    font-size: 12px;
    border-bottom: 1px solid #808080;
    padding:5px;
    position: relative;
    color:#666666;
}
</style>
