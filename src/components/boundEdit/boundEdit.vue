<template>
    <div id="personinfo" class="holePage">
        <mt-header fixed title="个人信息" class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="holeHeight">
            <div class="topBar"></div>
            <mt-field v-if="patient.kh" label="卡号" v-model="patient.kh" disabled></mt-field>
            <mt-field label="手机号" v-model="patient.lxdh" :state="patient.lxdh?'':'warning'"></mt-field>
            <mt-field label="姓名" v-model="patient.xm" :state="patient.xm?'':'warning'"></mt-field>
            <mt-field label="身份证号" v-model="patient.sfzh" :state="patient.sfzh?'':'warning'"></mt-field>
            <mt-field label="性别" v-model="patient.xb" :state="patient.xb?'':'warning'"></mt-field>
            <mt-field label="家庭地址" v-model="patient.jtqhdm" disabled :state="patient.jtqhdm?'':'warning'"></mt-field>
            <mt-field label="门牌号" v-model="patient.jtdz"  @click="" :state="patient.jtdz?'':'warning'"></mt-field>
            <div class="center">
                <mt-button type="default" @click="confireUser">保存信息</mt-button>
            </div>
            <div style="padding-left:20px;padding-top:10px;margin-top:20px;border-top:1px solid #B3B3B3;">
                <i class="mintui mintui-field-warning" style="color:#ffc107;"></i>&nbsp;不能为空
            </div>
            <div></div>
        </div>

        <div class="btnA">
            <button class="mint-button mint-button--primary mint-button--large green" @click="unbound()">
                <label class="mint-button-text font18">解除绑定</label>
            </button>
        </div>
    </div>
</template>
<script type="text/javascript">

export default {
    data() {
            return {
                patient:{},
            }
        },
        methods: {
            confireUser(){
                let params = {
                    brxx:{
                        brid:this.patient.id,
                        lxdh:this.patient.lxdh,
                        xm:this.patient.xm,
                        sfzh:this.patient.sfzh,
                        xb:this.patient.xb,
                        jtqhdm:this.patient.jtqhdm,
                        jtdz:this.patient.jtdz
                    }
                }
                this.api.updateHisUser(params)
                 .then(
                    res=>{
                        if(res.code==1){
                            this.$toast('病人信息更新成功！');
                        }
                    }
                )
            },
            unbound(){
                let params = {
                    hzid:this.patient.id,
                    yhid:this.$store.getters.userId,
                    bz:'0'//0为解除绑定
                }
                this.api.treatmentCardunBind(params)
                .then(
                        res=>{
                            this.$store.commit('removeBoundItem',this.patient.id);
                            this.$toast('解绑成功！')
                            this.goback();
                        }
                    );
            },
        },
        components:{
            
        },
        mounted(){
            this.patient = this.$route.query;
            let params = {
                brid:this.patient.hzid
            }
            this.api.getPatientInfo(params)
                .then(
                        res=>{
                            this.patient = res.data[0];
                        }
                    )
        },
        computed:{
            handleUser() {
                return this.$store.getters.getHandleUser;
            },
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
    overflow-y: auto;
}
</style>
    