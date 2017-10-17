<template>
    <div class="medical-record">
        <div class="title">
            <ul>
                <li @click="changeCheck(item, index)" :class="{current: navCheckList[index]}"
                 v-for="(item, index) in navList">{{item.mc}}</li>
            </ul>
        </div>
        <div class="contain" ref="contain"> 
            <div class="mzRecord margin48" v-if="navCheckList[0]">
                <mt-loadmore  :autoFill=false :top-method="loadTop" :bottom-method="loadBottom" ref="loadmoreMzjl">
                    <ul>
                        <li @click="toDetail(item)" v-for="item in mzjlList">
                            <p><span class="no">No:{{item.no}}</span>
                                <span class="right">{{item.jgjc}}</span></p>
                            <p><span>{{item.jzzt}}</span>
                                <span>{{item.zxks}}</span>
                                <span>{{item.ysxm}}</span>
                                <span>{{item.mzzd}}</span></p>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
            <div class="zyRecord margin48" v-if="navCheckList[1]">
                <mt-loadmore  :autoFill=false :top-method="loadTop" :bottom-method="loadBottom" ref="loadmoreZyjl">
                    <ul>
                        <li v-for="item in mzjlList">
                            
                        </li>
                    </ul>
                </mt-loadmore>
                <div class="footer">
                    <span @click="choosePre" class="preday">前一天</span>
                    <span class="curdate">{{curdate}}</span>
                    <span @click="chooseNext" class="nextday">后一天</span>
                </div>
            </div>
            <div class="margin48" v-if="navCheckList[2]"></div>
            <div class="margin48" v-if="navCheckList[3]"></div>
        </div>
    </div>
</template>

<script>
    import {checkBrowser} from '@/util/util.js'

    export default {
        name: 'medicalRecord',
        data() {
            return {
                jgid: '',
                brid: '',
                minDate: '2017-02-15',
                maxDate: '2017-05-25',
                curdate: '2017-02-21',
                config: {
                    "mzjlPageSize":10,"mzjlPageNum":1,
                },
                navList: [{"mc":"门诊记录"},{"mc":"住院记录"},{"mc":"检查报告"},{"mc":"检验报告"}],
                navCheckList:[true, false, false, false],
                /*门诊记录*/
                mzjlList: [],
            }
        },
        created() {
            let handerUser = this.$store.getters.getHandleUser
            this.$store.commit('setPageTitle',`医疗服务记录 -- ${handerUser.hzxm}`);
            this.brid = handerUser.hzid;
            this.loadMzfyjl();
        },
        methods: {
            // 下拉事件触发方法
            loadTop() {
                if(this.navCheckList[0]) {
                    this.config.mzjlPageNum = 1;
                    this.mzjlList = [];
                    this.loadMzfyjl();
                    this.$refs.loadmoreMzjl.onTopLoaded();
                }
                if(this.navCheckList[1]) {
                   
                }
                if(this.navCheckList[2]) {
                    
                }
                if(this.navCheckList[3]) {
                   
                }
            },
            // 上拉加载
            loadBottom() {
                if(this.navCheckList[0]) {
                    this.loadMzfyjl();
                    this.$refs.loadmoreMzjl.onBottomLoaded();
                }
                if(this.navCheckList[1]) {
                   
                }
                if(this.navCheckList[2]) {
                    
                }
                if(this.navCheckList[3]) {
                   
                }
              
            },  
            // 导航nav切换
            changeCheck(item, index) {
                this.navCheckList = [];
                this.navCheckList[index] = true;
                if (index === 0) {
                    this.config.mzjlPageNum = 1;
                    this.mzjlList = [];
                    this.loadMzfyjl();
                } else if (index === 1) {
                   
                } else if (index === 2) {
                    
                } else if (index === 3) {
                 
                }
            }, 
            loadMzfyjl() {
                let param = {
                    brid: this.brid,
                    rn_s: this.config.mzjlPageSize * (this.config.mzjlPageNum - 1) + 1 + '',
                    rn_e: this.config.mzjlPageSize * this.config.mzjlPageNum + '',
                }
                this.api.getMzfyjl(param)
                    .then(res => {
                        if (res.data.length) {
                            this.config.mzjlPageNum ++;
                            this.mzjlList.push(...res.data);
                        } else {
                            this.$toast({message:'未查询到更多数据！',duration: 800})
                        }
                    }, err => {this.$toast({message:'查询失败！',duration: 800})})
            },
            toDetail(item) {
                item = JSON.stringify(item);
                console.log(item)
                this.$router.push({name: 'recordDetails', query: {data: item}});
            },
            checkDateLimit(a) {
                // -1 前一天  1 后一天
                if (a === '-1') {
                    return new Date(this.curdate) - new Date(this.minDate) > 0
                } else if (a === '1') {
                    return new Date(this.maxDate) - new Date(this.curdate)  > 0
                }
            },
            FillTwo(n) {
                return n < 10 ? '0' + n : n;
            },
            setCurDate(a) {
                let d = new Date(this.curdate); 
                d.setDate(d.getDate() + a); 
                let m = d.getMonth() + 1; 
                this.curdate =  d.getFullYear() + '-' + this.FillTwo(m) + '-' + this.FillTwo(d.getDate()); 
            },
            choosePre() {
                if (this.checkDateLimit('-1')) {
                    this.setCurDate(-1);
                } else {
                    this.$toast({message:'已是第一天',duration: 800})
                }
            },
            chooseNext() {
                if (this.checkDateLimit('1')) {
                    this.setCurDate(1);
                } else {
                    this.$toast({message:'已是最后一天',duration: 800})
                }
            }
        }
    }
</script>

<style type="text/css" scoped>
/*common css*/
.medical-record{position: relative;font-family: Microsoft YaHei}
.medical-record ul{list-style: none}
.contain{height:100%;overflow-y: scroll;}
.margin48{margin-top: 48px}
.left{float:left}
.right{float: right}

/* title导航样式 */
.title{position: absolute; top: 0px; width: 100%; background: #fff; z-index: 2}
.title ul {border-bottom: 1px solid #ccc} 
.title .current {border-bottom: 3px solid #3399ff}
.title li {display: inline-block; width:25%; height: 45px; line-height: 45px; font-size:16px; text-align: center}

/* 门诊费用记录 */
.mzRecord li{position: relative; padding: 5px 2px; border-bottom: 1px solid #ccc;font-size:14px}
.mzRecord li p{min-height: 20px; line-height: 20px; margin-left: 5px; padding:2px 4px}

/*住院费用记录*/
.zyRecord{padding-bottom: 52px}
.zyRecord .footer{position: absolute;bottom: 0;text-align: center;height: 52px;width: 100%;line-height: 52px}
.zyRecord .footer span{display: inline-block;float: left;box-sizing: border-box}
.zyRecord .preday{width:30%;background: #fc9}
.zyRecord .nextday{width:30%;background: #cf9}
.zyRecord .curdate{width:40%;background: #9c9}
.pay{background: #ccc}
</style>