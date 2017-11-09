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
              <a class="mint-cell mint-field">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <span class="mint-cell-text">身份证号</span>
                  </div>
                  <div class="mint-cell-value">
                    <input v-model="patient.sfzh" @blur="getInfoFromId" class="mint-field-core" >
                  </div>
                </div>
              </a>
              <a class="mint-cell mint-field">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <span class="mint-cell-text">性别</span>
                  </div>
                  <div class="mint-cell-value">
                    <span style="color:rgb(84, 84, 84);">{{patient.xb?patient.xb.split('-')[1]:''}}</span>
                  </div>
                </div>
              </a>
            <mt-field label="家庭地址" v-model="areaText" disabled :state="patient.jtqhdm?'':'warning'" @click.native="editArea"></mt-field>
            <mt-field label="门牌号" v-model="patient.jtdz"  @click="" :state="patient.jtdz?'':'warning'"></mt-field>
            <div class="center">
                <mt-button type="default" @click="confireUser">保存信息</mt-button>
            </div>
            <div style="padding-left:20px;padding-top:10px;margin-top:20px;border-top:1px solid #B3B3B3;">
                <i class="mintui mintui-field-warning" style="color:#ffc107;"></i>&nbsp;不能为空
            </div>
        </div>
        <div class="btnA">
            <button class="mint-button mint-button--primary mint-button--large green" @click="unbound()">
                <label class="mint-button-text font18">解除绑定</label>
            </button>
        </div>
        <area-select ref="areaSelect" :visible="areaEditVisible" :value="patient.jtqhdm" @closeWin="closeAreaWin" @getAreaText="setAreaText" @sureValue="setAreaValue"></area-select>
    </div>
</template>
<script type="text/javascript">
import areaSelect from '@/components/common/areaSelect/areaSelect.vue';

export default {
    data() {
            return {
                patient:{},
                areaEditVisible:false,
                areaText:'请选择',

            }
        },
        methods: {
            getInfoFromId(){
                if(this.patient.sfzh.length==18){
                    let tempday = this.patient.sfzh.substring(6,14)
                    let year = tempday.substring(0,4)
                    let month = tempday.substring(4,6)
                    let day = tempday.substring(6,8)
                    tempday = year+'-'+month+'-'+day;
                    this.patient.birthday=tempday;

                    if((this.patient.sfzh.charAt(16)%2)==1){
                        this.patient.xb = '1-男';
                    }else{
                        this.patient.xb = '2-女';
                    }
                }else if(this.patient.sfzh.length==15){
                    let tempday=this.patient.sfzh.substring(6,12)
                    tempday = '19'+tempday;
                    let year = tempday.substring(0,4)
                    let month = tempday.substring(4,6)
                    let day = tempday.substring(6,8)
                    tempday = year+'-'+month+'-'+day;
                    this.patient.birthday = tempday;

                    if((this.patient.sfzh.charAt(14)%2)==1){
                        this.patient.xb = '1-男';
                    }else{
                        this.patient.xb = '2-女';
                    }
                }else{
                    this.$toast('身份证号格式错误');
                }
                let obj = JSON.parse(JSON.stringify(this.patient))
                this.$set(this.$data,'patient',obj);

            },
            setAreaValue(obj){
                this.patient.jtqhdm = obj.value;
                this.areaText = obj.text;
                this.areaEditVisible = false;
            },
            setAreaText(value){
                this.areaText = value;
            },
            closeAreaWin(){
                this.areaEditVisible = false;
            },
            editArea(){
                this.areaEditVisible = true;
            },
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
            loadPatientInfo(){
                let params = {
                    brid:this.patient.hzid
                }
                this.api.getPatientInfo(params)
                    .then(
                            res=>{
                                // this.patient = res.data[0];
                                this.$set(this.$data,'patient',res.data[0]);
                                this.$set(this.$data.patient,'jtqhdm',res.data[0].jtqhdm);

                                this.$refs.areaSelect.init(res.data[0].jtqhdm);
                            }
                        )
            },
        },
        components:{
            areaSelect,
        },
        mounted(){
            this.patient = this.$route.query;
            this.loadPatientInfo();
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
    