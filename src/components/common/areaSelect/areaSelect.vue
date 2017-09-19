<template>
    <div id="personinfo" class="holePage">
        <div v-if="visible" style="position:absolute;width:100%;height:100%;background: #fff;top:0px;left:0px;">
            <mt-header fixed title="地区选择" class="green">
                <mt-button icon="back" slot="left" @click="quitAreaSelect()"></mt-button>
            </mt-header>
            <div style="height: 40px;">
                
            </div>
            <div style="height:calc(100% - 80px);">
                <div  style="font-size: 14px;color:#7F7F7F;border-bottom: 1px solid #B3B3B3;height:40px;line-height: 20px;width:100%;overflow-y: auto;">
                    <span v-for="(item,index) in holeAreaArray" @click="holeItemClick(index+1);">
                        {{item.mc?item.mc+'/':''}}
                    </span>
                    <div v-if="currentLevel==0">
                        请选择...
                    </div>
                </div>
                <div ref="areaContent" style="height: calc(100% - 41px);overflow-y: auto;">
                    <mt-cell v-if="currentLevel>0" title="返回上一级" @click.native="backLevel"></mt-cell>
                    <mt-cell v-for="item in areaList" :title="item.mc" @click.native="listItemClick(item)"></mt-cell>
                </div>
            </div>
            <div style="height:40px;background: #CCCCCC;text-align: center;">
                <mt-button type="primary" size="small" style="width:100px;height:30px;margin:5px;" :disabled="areaList.length>0" @click="sureArea">确定</mt-button>
                <mt-button type="default" size="small" style="width:100px;height:30px;margin:5px;" @click="quitAreaSelect">返回</mt-button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">

export default {
    data() {
            return {
                holeAreaArray:[],
                currentLevel:0,
            	msg:'地区选择',
                areaList:[],
                areaStr:'',
            }
        },
        methods: {
            loadAreaList(id){
                let _this = this;
                let params = {
                    sjid:id
                }
                this.api.getAreaList(params)
                .then(
                        res=>{
                            this.areaList = res.data;
                            // this.content = this.$refs.areaContent;
                            // this.content.scrollTop = 0;
                        }
                    )
            },
            loadAreaHoleInfo(value){
                let params = {
                        dqxzqh:value
                    }
                    this.api.getParentsArea(params)
                    .then(
                            res=>{
                                if(res.data.length<=0){
                                    this.initAreaData();
                                    return;
                                }
                                let areaStr = '';
                                let holeAreaArray = [];
                                for (var i = 0; i < res.data.length; i++) {
                                    holeAreaArray.push({
                                        id:res.data[i].dm,
                                        mc:res.data[i].mc
                                    });
                                    areaStr += res.data[i].mc;
                                }
                                this.areaStr = areaStr;
                                this.holeAreaArray = holeAreaArray;
                                this.currentLevel = res.data.length;
                                this.loadAreaList(this.holeAreaArray[this.currentLevel-1].id);
                                this.$emit('getAreaText',this.areaStr);
                            }
                        )
            },
            init(value){
                if(value){
                    this.loadAreaHoleInfo(value);
                }else{
                    this.initAreaData();
                }
            },
            initAreaData(){
                this.holeAreaArray = [];
                this.currentLevel = 0;
                this.loadAreaList('0');
            },
            listItemClick(item){
                this.holeAreaArray[this.currentLevel] = item;
                this.currentLevel++;
                this.loadAreaList(item.id);
            },
            sureArea(){
                for (var i = 0; i < this.holeAreaArray.length; i++) {
                    this.areaStr += this.holeAreaArray[i].mc;
                }
                this.$emit('sureValue',{value:this.holeAreaArray[this.currentLevel-1].id,text:this.areaStr});
            },
            quitAreaSelect(){
                this.$emit('closeWin');
            },
            backLevel(){
                if(this.currentLevel<2){
                    this.initAreaData();
                }else{
                    this.holeItemClick(this.currentLevel-1)
                }
            },
            holeItemClick(index){
                for (var i = index; i < this.holeAreaArray.length; i++) {
                    this.holeAreaArray[i] = '';
                }
                this.currentLevel = index;
                this.loadAreaList(this.holeAreaArray[index-1].id);
            },
        },
        mounted() {
            this.init(this.value);
        },
        components: {

        },
        computed: {

        },
        props:['value','visible','initData']
}
</script>
<style scoped>
</style>

