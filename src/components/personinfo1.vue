<template>
    <div id="personinfo" class="holePage">
        <div style="position:absolute;width:100%;height:100%;background: #fff;top:0px;left:0px;">
            <mt-header fixed title="地区选择" class="green">
                <mt-button icon="back" slot="left" @click="quitAreaSelect()"></mt-button>
            </mt-header>
            <div style="height: 40px;">
                
            </div>
            <div style="height:calc(100% - 80px);">
                <div ref="areaContent" style="font-size: 14px;color:#7F7F7F;border-bottom: 1px solid #B3B3B3;height:40px;line-height: 20px;width:100%;overflow-y: auto;">
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
import areaSelect from '@/components/common/areaSelect/areaSelect.vue';

export default {
    data() {
            return {
                top:0,
                msg: '个人信息',
                info:{
                    sjh:''
                },
                area:false,
                holeAreaArray:['','','','','','',''],
                areaList:[],
                currentLevel:0,
                areaObj:{},
            }
        },
        methods: {
            getInfoFromId(){
                debugger
                if(this.value.sfzh.length==18){
                    let tempday = this.value.sfzh.substring(6,14)
                    let year = tempday.substring(0,4)
                    let month = tempday.substring(4,6)
                    let day = tempday.substring(6,8)
                    tempday = year+'-'+month+'-'+day;
                    this.value.birthday=tempday;

                    if((this.value.sfzh.charAt(16)%2)==1){
                        this.value.xb = '1-男';
                    }else{
                        this.value.xb = '2-女';
                    }
                }else if(this.value.sfzh.length==15){
                    let tempday=this.value.sfzh.substring(6,12)
                    tempday = '19'+tempday;
                    let year = tempday.substring(0,4)
                    let month = tempday.substring(4,6)
                    let day = tempday.substring(6,8)
                    tempday = year+'-'+month+'-'+day;
                    this.value.birthday = tempday;

                    if((this.value.sfzh.charAt(14)%2)==1){
                        this.value.xb = '1-男';
                    }else{
                        this.value.xb = '2-女';
                    }
                }else{
                    this.$toast('身份证号格式错误');
                }

            },
            sureArea(){
                let tempStr = '';
                for (var i = 0; i < this.currentLevel; i++) {
                    tempStr += this.holeAreaArray[i].mc
                }
                this.value.areaStr = tempStr;
                debugger
                this.areaObj = this.holeAreaArray[this.currentLevel-1];
                this.area = false;
                this.value.dzqh = this.areaObj.id;
            },
            backLevel(){
                debugger
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
                debugger
                this.loadAreaList(this.holeAreaArray[index-1].id);
            },
            loadAreaList(id){
                debugger
                let params = {
                    sjid:id
                }
                this.api.getAreaList(params)
                .then(
                        res=>{
                            this.areaList = res.data;
                            debugger
                            // this.top = 0;
                            var _this = this;
                            let content = this.$refs.areaContent;
                            content.scrollTop = 0;
                        }
                    )
            },
            listItemClick(item){
                debugger
                this.holeAreaArray[this.currentLevel] = item;
                this.currentLevel++;
                this.loadAreaList(item.id);
            },
            quitAreaSelect(){
                this.area = false;
            },
            editArea(){
                this.area = true;
                if(this.value.dzqh){
                    this.currentLevel = this.value.currentLevel;
                    this.holeAreaArray = this.value.holeAreaArray;
                }else{
                    this.initAreaData();
                }
            },
            initAreaData(){
                this.holeAreaArray = ['','','','','','',''];
                this.currentLevel = 0;
                this.loadAreaList('0');
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
                    id:this.value.id,
                    csrq:this.value.birthday,
                }
                this.api.Regist(params)
                    .then(res => {
                        this.$toast('修改成功！')
                        this.$store.commit('setAppUserInfo',params);
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

