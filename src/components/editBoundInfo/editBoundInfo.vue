<template>
    <div class="holePage">
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="holeHeight">
            <div class="topBar"></div>
            <mt-field v-if="info.kh" label="卡号" v-model="info.kh" disabled></mt-field>
            <mt-field label="手机号" v-model="info.lxdh" :state="info.lxdh?'':'warning'"></mt-field>
            <mt-field label="姓名" v-model="info.xm" :state="info.xm?'':'warning'"></mt-field>
            <mt-field label="身份证号" v-model="info.sfzh" :state="info.sfzh?'':'warning'"></mt-field>
            <mt-field label="性别" v-model="info.xb" :state="info.xb?'':'warning'"></mt-field>
            <mt-field label="家庭地址" v-model="info.jtqhdm" disabled :state="info.jtqhdm?'':'warning'" ></mt-field>
            <mt-field label="门牌号" v-model="info.jtdz"  @click="" :state="info.jtdz?'':'warning'"></mt-field>
            <mt-field label="家庭地址" v-model="info.jtqhdm" disabled :state="info.jtqhdm?'':'warning'"></mt-field>

            <mb-select :value="relation" :config="selectConfig" @input="relationSelect" ></mb-select>
            <div style="padding-left:20px;padding-top:10px;margin-top:20px;border-top:1px solid #B3B3B3;"><i class="mintui mintui-field-warning" style="color:#ffc107;"></i>&nbsp;为必填项</div>
        </div>

        <div class="btnA">
            <button class="mint-button mint-button--primary mint-button--large green" @click="confireUser()">
                <label class="mint-button-text font18">绑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</label>
            </button>
        </div>
    </div>
</template>
<script type="text/javascript">
import mbSelect from '@/components/common/mbSelect/mbSelect.vue';

export default {
    data() {
            return {
                msg: '绑定信息编辑',
                info:{},
                isPopShow:false,
                config:{},
                relation:{
                    value:'0',
                    label:'本人'
                },
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
            relationSelect(item){
                this.relation = item;
            },
            confireUser(){
                debugger
                let params = {
                    brxx:{
                        lxdh:this.info.lxdh?this.info.lxdh:'',
                        xm:this.info.xm?this.info.xm:'',
                        sfzh:this.info.sfzh?this.info.id:'',
                        xb:this.info.xb?this.info.xb:'',
                        jtqhdm:this.info.jtqhdm?this.info.jtqhdm:'',
                        jtdz:this.info.jtdz?this.info.jtdz:'',
                    }
                }
                if(this.info.id){
                    params.brxx.id = this.info.id;
                }
                this.api.updateHisUser(params)
                 .then(
                    res=>{
                        if(res.code==1){
                            debugger
                            this.$toast('保存成功！');
                            this.boundUser(res.brid);
                        }
                    }
                )
            },
            boundUser(hzid){
                let params = {
                    hzid:hzid,
                    yhid:this.$store.getters.userId,
                    gx:this.relation.value,
                    gxmc:this.relation.label,
                }
                this.api.treatmentCardBind(params).then(res=>{
                    if(res.code==1){
                        this.$store.commit('treatmentCardBind',hzid);
                        this.$store.commit('pushBoundItem',res);
                        this.$toast('绑定成功！');
                        this.$router.push({
                            path:'/index/personalCenter'
                        })
                    }
                })
            }
        },
        mounted() {
            this.info = this.$route.query;
        },
        components: {
            mbSelect
        },
        computed: {

        }
}
</script>
<style scoped>
.btnA{
    position: absolute;
    bottom: 10px;
    width:80%;
    left:10%;
}
.holeHeight{
    height:calc(100% - 41px);
}
</style>
