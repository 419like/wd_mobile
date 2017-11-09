<template>
    <div>
        <div v-if="ableState" style="position:absolute;top:0px;left:0px;width:100%;height:100%;" @click="outSelectCondition()">
        </div>
        <div v-if="ableState" class="conditionSelect">
            <div v-if="ableState=='departmentSelect'" class="selectBlock">
                <div class="selectItem" @click="departmentCondition('');">
                    <div>所有</div>
                </div>
                <div class="selectItem" v-for="item in departmentSelectList" @click="departmentCondition(item.mc);">
                    <div>{{item.mc}}</div>
                </div>
            </div>
            <div v-if="ableState=='doctorSelect'" class="selectBlock">
                <div class="selectItem" @click="doctorCondition('');">
                    <div>所有</div>
                </div>
                <div class="selectItem" v-for="item in doctorSelectList" @click="doctorCondition(item.mc);">
                    <div>{{item.mc}}</div>
                </div>
            </div>
            <div v-if="ableState=='appointmentSelect'" class="selectBlock">
                <div class="selectItem" @click="appointmentCondition('');">
                    <div>所有</div>
                </div>
                <div class="selectItem" v-for="item in appointmentSelectList" @click="appointmentCondition(item.mc);">
                    <div>{{item.mc}}</div>
                </div>
            </div>
        </div>
        <div class="flex" style="height:40px;z-index: 1;position: relative;">
            <div class="flex1 center" style="position:relative;">
                <div class="selected" @click="departmentSelect();">
                    <div class="singleRow">{{departmentConditionCrt?departmentConditionCrt:'科&nbsp;&nbsp;&nbsp;室'}}</div>
                </div>
            </div>
            <div class="flex1 center" style="position:relative;">
                <div class="selected" @click="doctorSelect();">
                    <div class="singleRow">{{doctorConditionCrt?doctorConditionCrt:'医&nbsp;&nbsp;&nbsp;生'}}</div>
                </div>
            </div>
            <div class="flex1 center">
                <div class="selected" @click="appointmentListSelect();">
                    <div class="singleRow">{{appointmentConditionCrt?appointmentConditionCrt:'号&nbsp;&nbsp;&nbsp;类'}}</div>
                </div>
            </div>
        </div>
        <div style="display:flex;">
            <div style="width:40px;display:inline-block;height:45px;" :class="{'choose':(!dateChoose.time)}" @click="clearDate();">
                <div class="dateText1">查看</div>
                <div class="dateText2">排班</div>
            </div>
            <div style="display:flex; width:calc(100% - 40px);overflow-x: auto;">
                <div style="min-width:14.285714285714286%;" :class="{'choose':(item==dateChoose)}" v-for="(item,index) in dateArray" @click="chooseDate(item,index);">
                    <div style="width:100%;">
                        <div class="dateText1">{{item.date}}</div>
                        <div class="dateText2">{{item.day}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="topLine1">
            <div v-if="!dateChoose" v-for="item in evenScheduleList" class="flex doctorItem" @click="selectTimeToast()">
                <div style="height:50px;width:50px;">
                    <svg v-if="!item.ystx" viewBox="0 0 1024 1024" class="svgIcon" style="margin:5px;height:40px;fill:#999999;">
                        <path d="M502.848 146.688c85.184-0.768 129.088 52.544 152.704 113.856l11.904 47.744c0.256 5.184 0.512 10.368 0.896 15.616l6.4 5.504c6.656 15.104 5.888 52.224 0.896 68.8-3.008 9.984-11.648 7.36-17.28 13.76-6.144 6.912-10.24 30.464-15.488 39.488-14.144 24.448-32.64 47.488-56.256 62.4 0.512 10.048 0.64 39.104 7.104 44.032 5.888 2.112 11.648 4.352 17.344 6.464 3.968 15.616-6.912 39.808-11.008 53.184-5.504 17.856-10.368 52.864-24.512 62.4-16.512 10.88-98.688 9.856-117.248 0.896-14.528-6.976-45.696-91.264-46.4-116.48l19.968-6.464L437.376 512c-26.88-14.848-47.488-45.952-60.928-74.368l-8.128-23.808c-4.8-7.104-16-4.544-19.072-14.656-5.12-16.576-6.016-54.784 0.896-69.76l8.192-8.256 4.544-34.88c7.04-28.16 18.88-54.336 33.6-75.264 16.576-23.488 41.664-44.8 70.08-56.064l36.288-8.256z m5.44 557.12c-0.512 28.608 3.712 100.992 18.24 112 12.736 9.6 49.92 10.752 70.912 7.232 13.376-2.24 27.392-0.768 36.352-7.232 19.392-14.4 11.392-77.632 19.008-106.624 32-5.632 22.144-47.488-3.648-55.872-35.648-11.776-46.528 49.728-14.528 55.872 0.512 20.992-2.88 85.248-12.736 92.864-19.52 11.392-65.152 5.376-85.504 0-7.744-28.224-9.344-63.872-11.776-98.24 20.352 0 48-1.152 60.928-10.112 20.224-14.144 38.4-89.6 42.752-122.112 51.52 19.008 102.976 38.016 154.496 56.896 21.12 7.872 53.376 13.632 64.512 31.232 8.64 13.504 7.488 36.224 11.008 54.144 7.616 40.512 20.096 119.872 8.128 162.496l-1.856 1.024-705.28-1.024c-1.728-1.28-0.576-0.128-1.856-1.856-10.368-16-1.472-88.64 1.856-108.224 5.248-31.36 3.072-84.224 17.28-106.496 11.2-17.6 43.392-23.488 64.512-31.232 51.456-18.88 103.04-37.888 154.496-56.896v1.856c29.504 65.792 13.184 131.328 112.704 130.304z m-190.848-20.224v50.496h-50.88v22.016h50.88v50.496h22.656v-50.496h50.944v-22.016h-50.944v-50.496H317.44z" p-id="2354"></path>
                    </svg>
                    <img v-if="item.ystx" style="width:40px;height:40px;margin: 5px;" :src="item.ystx">
                </div>
                <div class="flex1 infoBox">
                    <div class="">
                        <div class="t2" style="display:inline-block;">{{item.ksmc.slice(0,4)}}</div>
                        <div class="t2" style="display:inline-block;">{{item.ysxm}}</div>
                        <div class="t2" style="display:inline-block;">{{item.xmmc.slice(0,4)}}
                            <!-- <span v-if="item.xhs-item.ygs>0">{{item.xhs-item.ygs}}</span> -->
                        </div>
                        <div class="t2" style="display:inline-block;">¥{{item.ghfy}}</div>
                        <!-- <span v-if="item.xhs!=0" class="leftIcon">&nbsp;余{&nbsp;</span> -->
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
                        <span :class="{current:(dateChoose.day=='周一')}">{{item.zy?item.zy:''}}</span>
                        <span :class="{current:(dateChoose.day=='周二')}">{{item.ze?item.ze:''}}</span>
                        <span :class="{current:(dateChoose.day=='周三')}">{{item.zs?item.zs:''}}</span>
                        <span :class="{current:(dateChoose.day=='周四')}">{{item.zsi?item.zsi:''}}</span>
                        <span :class="{current:(dateChoose.day=='周五')}">{{item.zw?item.zw:''}}</span>
                        <span :class="{current:(dateChoose.day=='周六')}">{{item.zl?item.zl:''}}</span>
                        <span :class="{current:(dateChoose.day=='周日')}">{{item.zr?item.zr:''}}</span>
                    </div>
                    <div style="height:5px;">
                    </div>
                </div>
            </div>
            <div v-if="dateChoose" v-for="item in evenScheduleList" class="flex doctorItem">
                <div @click="" style="height:50px;width:42px;">
                    <svg v-if="!item.ystx" viewBox="0 0 1024 1024" class="svgIcon" style="margin:5px;height:40px;fill:#999999;">
                        <path d="M502.848 146.688c85.184-0.768 129.088 52.544 152.704 113.856l11.904 47.744c0.256 5.184 0.512 10.368 0.896 15.616l6.4 5.504c6.656 15.104 5.888 52.224 0.896 68.8-3.008 9.984-11.648 7.36-17.28 13.76-6.144 6.912-10.24 30.464-15.488 39.488-14.144 24.448-32.64 47.488-56.256 62.4 0.512 10.048 0.64 39.104 7.104 44.032 5.888 2.112 11.648 4.352 17.344 6.464 3.968 15.616-6.912 39.808-11.008 53.184-5.504 17.856-10.368 52.864-24.512 62.4-16.512 10.88-98.688 9.856-117.248 0.896-14.528-6.976-45.696-91.264-46.4-116.48l19.968-6.464L437.376 512c-26.88-14.848-47.488-45.952-60.928-74.368l-8.128-23.808c-4.8-7.104-16-4.544-19.072-14.656-5.12-16.576-6.016-54.784 0.896-69.76l8.192-8.256 4.544-34.88c7.04-28.16 18.88-54.336 33.6-75.264 16.576-23.488 41.664-44.8 70.08-56.064l36.288-8.256z m5.44 557.12c-0.512 28.608 3.712 100.992 18.24 112 12.736 9.6 49.92 10.752 70.912 7.232 13.376-2.24 27.392-0.768 36.352-7.232 19.392-14.4 11.392-77.632 19.008-106.624 32-5.632 22.144-47.488-3.648-55.872-35.648-11.776-46.528 49.728-14.528 55.872 0.512 20.992-2.88 85.248-12.736 92.864-19.52 11.392-65.152 5.376-85.504 0-7.744-28.224-9.344-63.872-11.776-98.24 20.352 0 48-1.152 60.928-10.112 20.224-14.144 38.4-89.6 42.752-122.112 51.52 19.008 102.976 38.016 154.496 56.896 21.12 7.872 53.376 13.632 64.512 31.232 8.64 13.504 7.488 36.224 11.008 54.144 7.616 40.512 20.096 119.872 8.128 162.496l-1.856 1.024-705.28-1.024c-1.728-1.28-0.576-0.128-1.856-1.856-10.368-16-1.472-88.64 1.856-108.224 5.248-31.36 3.072-84.224 17.28-106.496 11.2-17.6 43.392-23.488 64.512-31.232 51.456-18.88 103.04-37.888 154.496-56.896v1.856c29.504 65.792 13.184 131.328 112.704 130.304z m-190.848-20.224v50.496h-50.88v22.016h50.88v50.496h22.656v-50.496h50.944v-22.016h-50.944v-50.496H317.44z" p-id="2354"></path>
                    </svg>
                    <img v-if="item.ystx" style="width:40px;height:40px;margin: 5px;" :src="item.ystx">
                </div>
                <div class="flex1 infoBox">
                    <div class="" style="line-height: 35px;">
                        <div class="t2" style="display:inline-block;">{{item.ksmc.slice(0,4)}}</div>
                        <div class="t2" style="display:inline-block;">{{item.ysxm}}</div>
                        <div class="t2" style="display:inline-block;min-width: 30px;">{{item[dateChoose.letter]}}</div>
                        <div class="t2" style="display:inline-block;min-width: 30px;" v-if="isToday">余{{item.xhs-item.ygs}}</div>
                        <div class="t2" style="display:inline-block;min-width: 30px;" v-if="!isToday">余{{item.xys-item.ygs}}</div>
                    </div>
                    <div class="weekText">
                        <span style="white-space: nowrap;">{{item.xmmc.slice(0,4)}}({{item.zy?'一':''}}{{item.ze?'、二':''}}{{item.zs?'、三':''}}{{item.zsi?'、四':''}}{{item.zw?'、五':''}}{{item.zl?'、六':''}}{{item.zr?'、日':''}})</span>
                        <!-- <span v-if="item.zy">一、</span>
                        <span v-if="item.zr">二、</span>
                        <span v-if="item.zs">三、</span>
                        <span v-if="item.zsi">四、</span>
                        <span v-if="item.zw">五、</span>
                        <span v-if="item.zl">六、</span>
                        <span v-if="item.ze">日、</span> -->
                        <!-- <span>)</span> -->
                    </div>
                </div>
                <div style="width:50px;text-align: center;" @click="register(item)">
                    <div style="line-height: 30px;color:rgb(62, 187, 170);">
                        挂号
                    </div>
                    <div>
                        ¥{{item.ghfy}}
                    </div>
                </div>
            </div>
            <div v-if="evenScheduleList.length==0" style="text-align:center;font-size: 16px;color:#B3B3B3;">该项查询无结果。</div>
            <div style="width:100%;height:50px;"></div>
        </div>
        <div class="mask pCenter" v-if="chargeVisible">
            <div class="chargeBox">
                <div class="title">挂号确认单</div>
                <div class="contentBox">
                    <div>
                        <span>科室：</span>
                        <span>{{chargeChoose.ksmc}}</span>
                    </div>
                    <div>
                        <span>医生：</span>
                        <span>{{chargeChoose.ysxm}}</span>
                    </div>
                    <div>
                        <span>类型：</span>
                        <span>{{chargeChoose.xmmc}}</span>
                    </div>
                    <div>
                        <span>就诊日期：</span>
                        <span>{{dateChoose.shortDay}}</span>
                    </div>
                    <div class="flex">
                        <div>上下午：</div>
                        <div class="box1">
                            <mt-switch class="scaleY" v-model="timeValue" @change="timeChange()"></mt-switch>
                        </div>
                        <div>{{timeValue?'上午':'下午'}}</div>
                    </div>
                    <div>
                        <span>支付费用：</span>
                        <span>¥&nbsp;{{chargeChoose.ghfy}}</span>
                    </div>
                    <div>
                        <span>单号：</span>
                        <span>{{chargeChoose.number}}</span>
                    </div>
                </div>
                <div class="rightBottom">
                    <mt-button v-if="!chargeChoose.number" type="primary" size="small" @click="sureCharge()">提交</mt-button>
                    <mt-button size="small" @click="cancelCharge();">退出</mt-button>
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
            ableState: '',
            doctorSelectList: [{ text: '张医生' }, { text: '张医生' }],
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
            dateChoose: '',
            scheduleList: [],
            chargeChoose: {},
            timeValue: true,
            doctorConditionCrt: '',
            appointmentConditionCrt: '',
            departmentConditionCrt: '',
            isToday: false,
        }
    },
    methods: {
        selectTimeToast() {
            this.$toast('请选择预约日期。');
        },
        clearCondition() {
            let mc = '';
            this.departmentConditionCrt = mc;
            this.appointmentConditionCrt = mc;
            this.doctorConditionCrt = mc;
        },
        departmentCondition(mc) {
            this.clearCondition();
            this.departmentConditionCrt = mc;
            this.outSelectCondition();
        },
        appointmentCondition(mc) {
            this.clearCondition();
            this.appointmentConditionCrt = mc;
            this.outSelectCondition();
        },
        doctorCondition(mc) {
            this.clearCondition();
            this.doctorConditionCrt = mc;
            this.outSelectCondition();
        },
        outSelectCondition() {
            this.ableState = '';
        },
        clearDate() {
            this.clearCondition();
            this.loadDepartmentList();
            this.dateChoose = '';
        },
        appointmentListSelect() {
            if (this.ableState == 'appointmentSelect') {
                this.ableState = '';
            } else {
                this.ableState = 'appointmentSelect'
            }
        },
        departmentSelect() {
            if (this.ableState == 'departmentSelect') {
                this.ableState = '';
            } else {
                this.ableState = 'departmentSelect'
            }
        },
        doctorSelect() {
            if (this.ableState == 'doctorSelect') {
                this.ableState = '';
            } else {
                this.ableState = 'doctorSelect'
            }
        },
        timeChange() {
            console.log(this.timeValue);
        },
        cancelCharge() {
            this.chargeVisible = false;
        },
        register(item) {
            // this.chargeVisible = true;
            // this.chargeChoose = item;
            if (!this.$store.getters.loginState) {
                this.$router.push({
                    name: 'login',
                })
                return;
            }
            let patient = this.$store.getters.getHandleUser;
            if (!patient.hzid) {
                this.$messagebox.confirm('', {
                    message: '是否去绑定就医人员？',
                    title: '提示',
                    confirmButtonText: '去绑定',
                    cancelButtonText: '留在本页'
                }).then(() => {
                    this.$router.push({
                        name: 'personalCenter',
                    })
                });
                return;
            }
            if (this.isToday) {
                if (item.xhs - item.ygs == 0) {
                    this.$toast('选择的号别无剩余号。');
                    return;
                }
            } else {
                if (item.xys - item.ygs == 0) {
                    this.$toast('选择的号别无剩余号。');
                    return;
                }
            }
            let obj = {
                jgid: this.$route.query.jgid,
                id: item.id,
                ksmc: item.ksmc,
                ysxm: item.ysxm ? item.ysxm : '所有',
                xmmc: item.xmmc,
                shortDay: this.dateChoose.shortDay,
                day: this.dateChoose.day,
                ghfy: item.ghfy,
            }
            this.$router.push({
                path: '/index/registerConfirm',
                query: obj
            });

        },
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm() {
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
            this.$refs.doctorSeletor.reConfig();
            this.doctor = doctorList[0];
        },
        doctorSelected() {

        },
        loadDepartmentList(time) {
            let params = {
                ysid: "",
                ksid: "",
                jgid: this.$route.query.jgid
            }
            if (time) {
                params.yysj = time;
            }else{
                params.yysj = '2017-08-03';
            }
            this.api.getWorkList(params).then(
                res => {
                    
                    console.log(res);

                    this.scheduleList = res.data;
                    this.selectConfig.options = [];

                    if (!time) {
                        let departmentSelectList = [];
                        let appointmentSelectList = [];
                        let doctorSelectList = [];
                        for (var i = 0; i < res.data.length; i++) {
                            let item = res.data[i];
                            if (!item.ygs) {
                                item.ygs = 0;
                            }
                            if (!item.xhs) {
                                item.ygs = 0;
                            }
                            if (!item.xys) {
                                item.ygs = 0;
                            }
                            if (res.data[i].ksmc) {
                                departmentSelectList = addToList(departmentSelectList, {
                                    mc: res.data[i].ksmc,
                                    id: res.data[i].ksid
                                })
                            }
                            if (res.data[i].ysxm) {
                                doctorSelectList = addToList(doctorSelectList, {
                                    mc: res.data[i].ysxm,
                                    id: res.data[i].ysid
                                })
                            }
                            if (res.data[i].xmmc) {
                                appointmentSelectList = addToList(appointmentSelectList, {
                                    mc: res.data[i].xmmc
                                })
                            }
                            item.ghfy = Number(item.ghfy).toFixed(2);
                            this.selectConfig.options.push({
                                value: item.ksid,
                                label: item.ksmc
                            })
                        }
                        this.departmentSelectList = departmentSelectList;
                        this.appointmentSelectList = appointmentSelectList;
                        this.doctorSelectList = doctorSelectList;
                    }

                })
        },
        sureCharge(item) {

            if (this.chargeChoose.ghfy != '0.00') {
                this.$messagebox('收费项目尚未建设，请谅解。')
                return;
            }
            if (!this.timeValue) {
                this.dateChoose.time = this.dateChoose.shortDay + ' 15:00:00'
            }
            let params = {
                brxx: {
                    brid: this.$store.getters.getHandleUser.hzid
                },
                ghxx: {
                    ghapid: this.chargeChoose.id,
                    jsfs: '现金',
                    ysje: this.chargeChoose.ghfy,
                    yysj: this.dateChoose.time
                }
            }
            this.api.register(params)
                .then(res => {
                    if (res.code == '1') {
                        this.$toast('挂号成功！');
                    } else {
                        this.$toast('挂号失败,' + res.msg);
                    }
                    this.$set(this.$data.chargeChoose, 'number', res.no);
                })
        },
        initDate() {
            let dayArr = ['日', '一', '二', '三', '四', '五', '六']
            let letterArr = ['zr', 'zy', 'ze', 'zs', 'zsi', 'zw', 'zl']
            let arr = [];
            let days = 60;
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
                    letter: letterArr[day],
                    date: m+'-' + d,
                    day: '周' + dayArr[day],
                    time: year + "-" + m + "-" + d + " " + "09:00:00",
                    shortDay: year + "-" + m + "-" + d,
                }
                arr.push(dateObj);
            }
            return arr;
        },
        chooseDate(item, index) {

            if (index == 0) {
                this.isToday = true;
            } else {
                this.isToday = false;
            }
            this.dateChoose = item;
            this.loadDepartmentList(item.time)
        },
        loadDepartmentSelectList() {
            let params = {
                jgid: this.$route.query.jgid
            }
            this.api.getDepartmentSelectList(params)
                .then(
                    res => {
                        this.departmentSelectList = res.data;
                    }
                )
        },
        loadDoctorSelectList() {
            let params = {
                jgid: this.$route.query.jgid
            }
            this.api.getDoctorSelectList(params)
                .then(
                    res => {
                        this.doctorSelectList = res.data;
                    }
                )
        }
    },
    components: {
        mbSelect
    },
    mounted() {
        this.$set(this.$data, 'dateArray', this.initDate());
        // this.chooseDate(this.dateArray[0]);
        this.loadDepartmentList();
        // this.loadDepartmentSelectList();
        // this.loadDoctorSelectList();
        let user = this.$store.getters.getAppUserInfo;
        let his = this.$store.getters.getCurrentHis;

        this.$store.commit('setPageTitle', (his.jc + '-' + (user.xm ? user.xm : '未登录')));
    },
    computed: {
        evenScheduleList() {
            return this.scheduleList.filter((schedule) => {
                if (this.doctorConditionCrt) {
                    if (schedule.ysxm == this.doctorConditionCrt)
                        return schedule;
                } else if (this.departmentConditionCrt) {
                    if (schedule.ksmc == this.departmentConditionCrt)
                        return schedule;
                } else if (this.appointmentConditionCrt) {
                    if (schedule.xmmc == this.appointmentConditionCrt)
                        return schedule;
                } else {
                    return schedule;
                }
            })
        }
    }
}

function addToList(list, item) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].mc == item.mc) {
            return list;
        }
    }
    list.push(item);
    return list;
}

</script>
<style scoped>
.weekText {
    display: inline-block;
}

.selectBlock {
    width: 100%;
    margin-bottom: 32px;
    padding-left: 16px;
}

.selectItem {
    color: #3a3a3a;
    /*background: #d7d7d7;*/
    text-align: center;
    width: auto;
    border: 0px;
    margin-right: 10px;
    display: inline-block;
}

.conditionSelect {
    border-top: 1px solid #E6E6E6;
    position: absolute;
    top: 80px;
    left: 0px;
    display: flex;
    width: 100%;
    background: #d7d7d7;
}

.selected {
    height: 40px;
    line-height: 40px;
}

</style>
