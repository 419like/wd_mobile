<template>
    <div>
        <mt-header fixed title="挂号" class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="topBar"></div>
        <div class="dateContainer">
            <div class="dateBox" :class="{'choose':(item==dateChoose)}" v-for="item in dateArray" @click="chooseDate(item);">
                <div class="dateText1">{{item.date}}</div>
                <div class="dateText2">{{item.day}}</div>
            </div>
        </div>
        <!-- <mb-select :config="selectConfig" v-model="department" ref="departmentSeletor" @select="departmentSelected()">
        </mb-select> -->
        <!-- <mb-select :config="doctorListConfig" v-model="doctor" ref="doctorSeletor" @select="doctorSelected()">
        </mb-select> -->
        <!-- 医生列表 -->
        <div class="topLine1">
            <div v-for="item in scheduleList" class="flex doctorItem" @click="register(item)">
                <div class="flex1 infoBox">
                    <div>
                        <span class="t0">{{item.ksmc}}</span>
                        <span class="t2">{{item.ysxm}}</span>
                        <span class="t1">{{item.xmmc}}</span>
                        <span v-if="item.xhs!=0" class="leftIcon">&nbsp;余{{item.xhs-item.ygs}}&nbsp;</span>
                    </div>
                    <div class="weekText borderB">
                        <span>周一</span>
                        <span>周二</span>
                        <span>周三</span>
                        <span>周四</span>
                        <span>周五</span>
                        <span>周六</span>
                        <span>周日</span>
                    </div>
                    <div class="weekText">
                        <span :class="{current:(dateChoose.day=='周一')}">{{item.zy?item.zy:'暂无'}}</span>
                        <span :class="{current:(dateChoose.day=='周二')}">{{item.zr?item.zr:'暂无'}}</span>
                        <span :class="{current:(dateChoose.day=='周三')}">{{item.zs?item.zs:'暂无'}}</span>
                        <span :class="{current:(dateChoose.day=='周四')}">{{item.zsi?item.zsi:'暂无'}}</span>
                        <span :class="{current:(dateChoose.day=='周五')}">{{item.zw?item.zw:'暂无'}}</span>
                        <span :class="{current:(dateChoose.day=='周六')}">{{item.zl?item.zl:'暂无'}}</span>
                        <span :class="{current:(dateChoose.day=='周日')}">{{item.ze?item.ze:'暂无'}}</span>
                    </div>
                </div>
                <div class="btnArea">
                    <div class="costText">¥&nbsp;100.00</div>
                    <div class="registerBtn">挂号</div>
                </div>
            </div>
        </div>
        <div class="mask pCenter" v-if="chargeVisible">
            <div class="chargeBox">
                <div>
                    <span class="title">挂号确认单</span>
                </div>
                <div>
                    <span>科室：</span>
                    <span>{{chargeChoose.ksmc}}</span>
                </div>
                <div>
                    <span>地点：</span>
                    <span></span>
                </div>
                <div>
                    <span>医生：</span>
                    <span></span>
                </div>
                <div>
                    <span>类型：</span>
                    <span>{{chargeChoose.xmmc}}</span>
                </div>
                <div>
                    <span>就诊日期：</span>
                    <span>{{dateChoose.shortDay}}</span>
                </div>
                <div>
                    <span>支付费用：</span>
                    <span>{{dateChoose.shortDay}}</span>
                </div>
                <div class="rightBottom">
                    <mt-button type="primary" size="small" @click="sureCharge()">确定</mt-button>
                    <mt-button size="small" @click="cancelCharge();">取消</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import mbSelect from '@/components/common/mbSelect/mbSelect.vue';
import './appointment.css';
let scheduleList = [];
let doctorList = [];

export default {
    data() {
        return {
            dateValue: '',
            pickerValue: '',
            doctor: '',
            department: {},
            selectConfig: {
                title: '科室',
                winTitle: '选择科室',
                valueFeild: 'value',
                textFeild: 'label',
                options: []
            },
            doctorListConfig: {
                title: '医生',
                winTitle: '选择医生',
                valueFeild: 'ysid',
                textFeild: 'ysxm',
                options: []
            },
            doctorList: [],
            chargeList: [],
            chargeVisible: false,
            totalCharge: 0,
            dateArray: [],
            dateChoose: {},
            scheduleList: [],
            chargeChoose: {},
        }
    },
    methods: {
        cancelCharge() {
            this.chargeVisible = false;
        },
        register(item) {
            this.chargeVisible = true;
            this.chargeChoose = item;
        },
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm() {
            console.log(this.pickerValue);
            var date = new Date(this.pickerValue);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var day = date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            // this.$set(this.$data,'dateValue',year+"-"+month+"-"+day)
            this.dateValue = year + "-" + month + "-" + day;
            let time = year + "-" + month + "-" + day + " " + "09:00:00";
            this.loadDepartmentList(time)
        },
        upDataDepartmentConfig() {
            this.$refs.departmentSeletor.reConfig();
            this.department = this.selectConfig.options[0];
        },
        departmentSelected() {
            this.searchDoctorList(this.department);
        },
        searchDoctorList(item) {
            this.doctorList = [];
            for (var i = 0; i < scheduleList.length; i++) {
                if (scheduleList[i].ksid == item.value) {
                    this.doctorList.push(scheduleList[i]);
                }
            }
        },
        upDataDoctorConfig() {
            debugger
            this.$refs.doctorSeletor.reConfig();
            this.doctor = doctorList[0];
        },
        doctorSelected() {
            console.log(this.doctor);
        },
        loadDepartmentList(time) {
            let params = {
                yysj: time,
                ysid: "",
                ksid: "",
                jgid: this.$route.query.jgid
            }
            this.api.getWorkList(params).then(
                res => {
                    console.log(res);
                    this.scheduleList = res.data;
                    this.selectConfig.options = [];
                    for (var i = 0; i < res.data.length; i++) {
                        let item = res.data[i];
                        this.selectConfig.options.push({
                            value: item.ksid,
                            label: item.ksmc
                        })
                    }
                })
        },
        sureCharge(item) {
            let params = {
                brxx: {
                    brid: this.$store.getters.getHzid
                },
                ghxx: {
                    ghapid: this.chargeChoose.id,
                    jsfs: '现金',
                    ysje: '4.00'
                }
            }
            debugger
            console.log(params);
            this.api.register(params)
                .then(res => {
                    debugger
                    console.log(res);
                })
        },
        initDate() {
            let dayArr = ['日', '一', '二', '三', '四', '五', '六']
            let arr = [];
            let days = 7;
            let today = new Date().getTime();
            for (var i = 0; i < days; i++) {
                let tDay = today + i * 24 * 60 * 60 * 1000;
                let thatDay = new Date(tDay);
                var year = thatDay.getFullYear();
                let m = thatDay.getMonth() + 1;
                if (m < 10) {
                    m = "0" + m;
                }
                let d = thatDay.getDate();
                if (d < 10) {
                    d = "0" + d;
                }
                let day = thatDay.getDay();
                let dateObj = {
                    date: m + '_' + d,
                    day: '周' + dayArr[day],
                    time: year + "-" + m + "-" + d + " " + "09:00:00",
                    shortDay: year + "-" + m + "-" + d,
                }
                arr.push(dateObj);
            }
            return arr;
        },
        chooseDate(item) {
            this.dateChoose = item;
            this.loadDepartmentList(item.time)
        }
    },
    components: {
        mbSelect
    },
    mounted() {
        this.$set(this.$data, 'dateArray', this.initDate());
        this.chooseDate(this.dateArray[0]);
    }
}

</script>
<style scoped>
.title{
    text-align: center;
    font-size: 14px;
    width:100%;
}
.chargeTitle {
    height: 40px;
    background: #E6E6E6;
    line-height: 40px;
    border-right: 1px solid #CCCCCC;
    border-left: 1px solid #CCCCCC;
    border-top: 3px double #666666;
    width: 100%;
}

.sureBtn {
    width: 80px;
    height: 100%;
    color: #fff;
    background: #ff4d4d;
    line-height: 43px;
    text-align: center;
}

.countText1 {
    width: 100px;
    text-align: right;
}

.countText2 {
    flex: 1;
    text-align: left;
}

.topLine1 {
    border-top: 2px solid #CCCCCC;
}



.infoText2 {
    color: #CCCCCC;
    font-size: 12px;
}

.infoBox {
    margin-left: 10px;
}

.doctorItem {
    height: 60px;
    padding-top: 10px;
    border-bottom: 1px solid #CCCCCC;
}

.listImg {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.imgBox {
    margin-left: 10px;
}

.leftInfo {
    width: 60px;
}

.itemBox {
    background: #fff;
    height: 60px;
    border: 1px solid #B3B3B3;
    width: 100%;
}

.itemBox2 {
    background: #fff;
    height: 45px;
    border: 1px solid #B3B3B3;
    width: 100%;
    font-size: 20px;
    line-height: 45px;
}

.itemText1 {
    height: 35px;
    line-height: 35px;
    font-size: 18px;

    margin-left: 15px;
}

.itemText2 {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #FF6666;

    margin-left: 15px;
}

</style>
