<template>
    <div>
        <mt-header fixed :title="info.text" class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="topBar"></div>
        <div class="inPageBody">
            <div>
                <mt-field label="姓名" placeholder="请输入姓名" v-model="card.name"></mt-field>
                <mt-field label="身份证号" placeholder="请输入身份证号" v-model="card.idCard"></mt-field>
            </div>
            <div class="centerBtn">
                <button class="mint-button mint-button--primary mint-button--large green" @click="search()">
                    <label class="mint-button-text font18">查&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;询</label>
                </button>
            </div>
            <div>
                <div v-for="item in userList" class="item" @click="editBoundInfo(item)" style="position:relative;">
                    <div>
                        {{item.lxdh?item.lxdh:'暂无电话号码'}}
                    </div>
                    <div class="t2">
                        {{item.mc}}{{item.jtdz}}
                    </div>
                    <div style="position:absolute;right:5px;top:5px;color:#FF6666;">
                        此人已绑定
                    </div>
                </div>
            </div>
            <div v-if="promptVisible&&userList.length<=0" style="position: absolute;bottom: 10px;text-align: center;font-size: 20px;color: #B3B3B3;width:100%;" @click="addBoundInfo">
                暂无记录，<a href="" style="text-decoration:none;color:rgb(61,187,170);">点击</a>添加
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import mbSelect from '@/components/common/mbSelect/mbSelect.vue';
export default {
    data() {
            return {
                promptVisible:false,
                userList:[],
                info: {
                    text:'就诊卡绑定'
                },
                items: [],
                card:{
                    num:'',
                    name:'',
                    idCard:'',
                    tel:''
                },
                relationSelect:false,
                relation:{},
                selectConfig:{
                    title:'关系',
                    winTitle:'选择关系',
                    valueFeild:'value',
                    textFeild:'label',
                    options:[
                      {
                        value: '0',
                        label: '本人',
                      },
                      {
                        label: '配偶',
                        value: '1'
                      },
                      {
                        label: '子',
                        value: '2'
                      },
                      {
                        label: '女',
                        value: '3'
                      },
                      {
                        label: '孙子、孙女或外孙子、外孙女',
                        value: '4'
                      },
                      {
                        label: '父母',
                        value: '5'
                      },
                      {
                        label: '祖父母或外祖父母',
                        value: '6'
                      },
                      {
                        label: '兄、弟、姐、妹',
                        value: '7'
                      },
                      {
                        label: '其他',
                        value: '9'
                      }
                    ]
                }
            }
        },
        methods: {
            addBoundInfo(){
                this.$router.push({
                    path:'/editBoundInfo',
                    query:{
                        xm:this.card.name,
                        sfzh:this.card.idCard
                    }
                })
            },
            editBoundInfo(item){
                if(item.has){
                    return;
                }
                this.$router.push({
                    path:'/editBoundInfo',
                    query:{
                        id:item.id,
                        lxdh:item.lxdh?item.lxdh:'',
                        jtdz:item.jtdz?item.jtdz:'',
                        xb:item.xb?item.xb:'',
                        jtqhdm:item.jtqhdm?item.jtqhdm:'',
                        xm:this.card.name,
                        sfzh:this.card.idCard
                    }
                })
            },
            search(){
                let params = {
                    xm:this.card.name,
                    sfzh:this.card.idCard
                }
                this.api.searchUserList(params).then(res => {
                    if(res.code==1){
                        this.promptVisible = true;
                        this.checkList(res.data);
                        this.userList = res.data;

                    }
                })
            },
            checkList(list){
                let boundList = this.$store.getters.getBoundList;
                for (var i = 0; i < boundList.length; i++) {
                    for (var j = 0; j < list.length; j++) {
                        if(boundList[i].hzid==list[j].id){
                            list[j].has = true;
                        }
                    }
                }
            },
            bind(){
                let params = {
                    xm:this.card.name,
                    sfzh:this.card.idCard
                };
                this.api.checkBind(params).then(res => {
                    if(res.data[0]){
                        this.setBind(res.data[0].id)
                    }
                })
            },
            setBind(hzid){
                let params = {
                    hzid:hzid,
                    yhid:this.$store.getters.userId,
                    gx:this.relation.value+'',
                    gxmc:this.relation.label+''
                }
                this.api.treatmentCardBind(params).then(res=>{
                    if(res.code==1){
                        this.$store.commit('setPatientInfo',res);
                        this.$toast('绑定成功！');
                        this.$router.push({
                            path:'/index/personalCenter'
                        })
                    }
                })
            }
        },
        components: {
            mbSelect
        },
        mounted() {
            this.card = this.$route.query;
            if(!this.$store.getters.userId){
                this.$router.push({
                    path:'/index/login'
                })
                return;
            }
            this.$set(this.$data,'relation',this.selectConfig.options[0])

        },
}
</script>
<style scoped>
.t2{
    width:100%;
    font-size: 12px;
    color:#999999;
}
.item{
    padding:5px;
    border:1px solid #E6E6E6;
}


.modeHead{
    height:25px;
    width:100%;
    background: #CCCCCC;
    padding-top:6px;
}
.headTitle{
    margin-left:10px;
    font-size:14px;
    color:#7F7F7F;
}
</style>
