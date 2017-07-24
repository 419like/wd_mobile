<template>
    <div>
        <mt-header fixed :title="info.text" class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="topBar"></div>
        <div class="modeHead">
            <span class="headTitle">就诊卡信息</span>
        </div>
        <div>
            <mt-field label="就诊卡卡号" placeholder="请输入就诊卡卡号" v-model="card.num"></mt-field>
            <mt-field label="姓名" placeholder="请输入姓名" v-model="card.name"></mt-field>
            <mt-field label="身份证号" placeholder="请输入手机号" v-model="card.idCard"></mt-field>
            <div class="listItem flex" @click="selectRelation()">
                <span class="itemTitle">关系</span>
                <span class="shortWord">{{relation.label}}</span>
                <icon name="angle-down" scale="1.8" class="itemDownIcn"></icon>
            </div>
        </div>
        <div class="centerBtn">
            <button class="mint-button mint-button--primary mint-button--large green" @click="bind()">
                <!---->
                <label class="mint-button-text font18">绑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</label>
            </button>
        </div>
        <div class="mask pCenter" v-if="relationSelect" >
            <div class="outTouch" @click="closeWin()">
                
            </div>
            <div class="selectBox">
                <div class="selectHead">
                    选择关系
                </div>
                <div class="selectList">
                    <div class="selectItem" v-for="item in options" @click="selectItem(item);">
                        <span class="itemText">
                            <icon name="square-o" scale="1" v-show="!(item==relation)"></icon>
                            <icon name="check-square-o" scale="1" v-show="item==relation"></icon>
                            <span>{{item.label}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                info: {
                    text:'就诊卡绑定'
                },
                items: [],
                card:{
                    num:'123',
                    name:'易开隆',
                    idCard:'510103193102100036',
                    tel:''
                },
                relationSelect:false,
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
                ],
                relation:{

                },
            }
        },
        methods: {
            selectItem(item){
                debugger
                console.log(item);
                this.relation = item;
                this.relationSelect = false;

            },
            closeWin(){
                this.relationSelect = false;
            },
            selectRelation(){
                this.relationSelect = true;
            },
            bind(){
                let params = {
                    xm:this.card.name,
                    sfzh:this.card.idCard
                };
                this.api.checkBind(params).then(res => {
                    // this.$toast('登录成功！');
                    console.log('');
                    // let loginObj = {
                    //     userId:res.data[0].id,
                    //     userNum:this.number,
                    //     password:password
                    // }
                    // this.$store.commit('login',loginObj);
                    // this.$router.back();
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
                        this.$store.commit('treatmentCardBind',hzid);
                        // this.$router.back();
                        this.$toast('绑定成功！');
                    }
                })
            }
        },
        components: {
            // 
        },
        mounted() {
            this.relation = this.options[0];
        }
}
</script>
<style scoped>
.shortWord{
    width:75px;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.outTouch{
    width:100%;
    height:100%;
    position: absolute;
    z-index: -1;
}
.itemDownIcn{
    margin-top: 10px;
    margin-left:5px;
    color:#B3B3B3;
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
