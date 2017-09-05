<template>

    <div>
        <div>
             <div>茶店子社区卫生服务中心(20170823)</div>
             <div>未就诊 No:201708230001 全科  敬和荣 </div>
             <div>流行性感冒</div>
        </div>
        <div v-for="item in 5">
            <div>
                0001 雌二醇片/雌二醇地屈孕酮片                        2瓶    ¥12.80
            </div>
            <div>
                01   28片/盒    成都通德药业有限公司
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
                tabState:'outRecord',
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
