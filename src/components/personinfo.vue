<template>
    <div id="personinfo" class="holePage">
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="quit()"></mt-button>
        </mt-header>
        <div class="holeHeight" style="position:relative">
            <div class="topBar"></div>
            <mt-field label="手机号" v-model="value.sjh"></mt-field>
            <mt-field label="姓名" v-model="value.xm"></mt-field>
            <a class="mint-cell mint-field">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text">身份证号</span>
                    </div>
                    <div class="mint-cell-value">
                        <input v-model="value.sfzh" @blur="getInfoFromId" class="mint-field-core">
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
                        <span style="color:rgb(84, 84, 84);">{{value.xb?value.xb.split('-')[1]:''}}</span>
                    </div>
                </div>
            </a>
            <mt-field label="出生日期" v-model="value.birthday" disabled></mt-field>
            <mt-field label="家庭地址" v-model="areaText" disabled @click.native="editArea()" :state="value.dzqh?'':'warning'"></mt-field>
            <mt-field label="门牌号地址" v-model="value.dz"></mt-field>
            <div style="position: absolute;bottom: 10px;margin-left: 10%;width:80%;">
                <button class="mint-button mint-button--primary mint-button--large green" @click="save()">
                    <label class="mint-button-text font18">保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</label>
                </button>
            </div>
        </div>
        <area-select ref="areaSelect" :visible="areaEditVisible" :value="value.dzqh" @closeWin="closeAreaWin" @getAreaText="setAreaText" @sureValue="setAreaValue"></area-select>
    </div>
</template>
<script type="text/javascript">
import areaSelect from '@/components/common/areaSelect/areaSelect.vue';

export default {
    data() {
        return {
            top: 0,
            msg: '个人信息',
            info: {
                sjh: ''
            },
            area: false,
            holeAreaArray: ['', '', '', '', '', '', ''],
            areaList: [],
            currentLevel: 0,
            areaObj: {},
            areaText: '请选择',
            areaEditVisible: false,
            value:{},
        }
    },
    methods: {
        getInfoFromId() {
            if (this.value.sfzh.length == 18) {
                let tempday = this.value.sfzh.substring(6, 14)
                let year = tempday.substring(0, 4)
                let month = tempday.substring(4, 6)
                let day = tempday.substring(6, 8)
                tempday = year + '-' + month + '-' + day;
                this.value.birthday = tempday;

                if ((this.value.sfzh.charAt(16) % 2) == 1) {
                    this.value.xb = '1-男';
                } else {
                    this.value.xb = '2-女';
                }
            } else if (this.value.sfzh.length == 15) {
                let tempday = this.value.sfzh.substring(6, 12)
                tempday = '19' + tempday;
                let year = tempday.substring(0, 4)
                let month = tempday.substring(4, 6)
                let day = tempday.substring(6, 8)
                tempday = year + '-' + month + '-' + day;
                this.value.birthday = tempday;

                if ((this.value.sfzh.charAt(14) % 2) == 1) {
                    this.value.xb = '1-男';
                } else {
                    this.value.xb = '2-女';
                }
            } else {
                this.$toast('身份证号格式错误');
            }
        },
        setAreaValue(obj) {
            this.value.dzqh = obj.value;
            this.areaText = obj.text;
            this.areaEditVisible = false;
        },
        setAreaText(value) {
            debugger
            this.areaText = value;
        },
        closeAreaWin() {
            this.areaEditVisible = false;
        },
        editArea() {
            this.areaEditVisible = true;
        },
        quit() {
            this.$emit('close');
        },
        save() {
            console.log(this.value);
            let params = {
                sjh: this.value.sjh ? this.value.sjh : '',
                xm: this.value.xm ? this.value.xm : '',
                sfzh: this.value.sfzh ? this.value.sfzh : '',
                xb: this.value.xb ? this.value.xb : '',
                dzqh: this.value.dzqh ? this.value.dzqh : '',
                dz: this.value.dz ? this.value.dz : '',
                id: this.value.id,
                csrq: this.value.birthday,
            }
            this.api.Regist(params)
                .then(res => {
                    this.$toast('修改成功！')
                    debugger
                    params.userId = params.id;
                    this.$store.commit('setAppUserInfo', params);
                    this.quit();
                })
        },
        init(value) {
            this.value = value;
            this.areaText = this.value.areaStr;
            this.$refs.areaSelect.init(this.value.dzqh);
        }
    },
    mounted() {

    },
    components: {
        areaSelect
    },
    computed: {

    }
}

</script>
<style scoped>


</style>
