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
                        <li @click="toMzDetail(item)" v-for="item in mzjlList">
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
                        <li @click="toZyDetail(item)" v-for="item in zyjlList">
                            <p><span>{{item.rysj}}~{{item.cysj?item.cysj:'在院'}}</span>
                                <span class="right">{{item.jgjc}}</span>
                            </p>
                            <p><span>No:{{item.zyh}}</span>
                                <span>{{item.ryksmc}}</span>
                                <span>{{item.zyysxm}}</span>
                                <span>{{item.zd}}</span>
                            </p>
                        </li>
                    </ul>
                </mt-loadmore>
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
                config: {
                    "mzjlPageSize":10,"mzjlPageNum":1,
                    "zyjlPageSize":10,"zyjlPageNum":1,
                },
                navList: [{"mc":"门诊记录"},{"mc":"住院记录"}],
                navCheckList:[true, false, false, false],
                /*门诊记录*/
                mzjlList: [],
                /*住院记录*/
                zyjlList: [],
            }
        },
        created() {
            let handerUser = this.$store.getters.getHandleUser
            if (handerUser && !handerUser.hzid) {
                this.$store.commit('setPageTitle',``);
                this.$router.push({
                    path: '/index/login'
                })
                return;
            }
            this.$store.commit('setPageTitle',`就诊记录查询 - ${handerUser.hzxm}`);
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
                    this.config.zyjlPageNum = 1;
                    this.zyjlList = [];
                    this.loadZyfyjl();
                    this.$refs.loadmoreZyjl.onTopLoaded();
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
                    this.loadZyfyjl();
                    this.$refs.loadmoreZyjl.onBottomLoaded();
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
                    this.config.zyjlPageNum = 1;
                    this.zyjlList = [];
                    this.loadZyfyjl();
                } else if (index === 2) {
                    
                } else if (index === 3) {
                 
                }
            }, 
            loadZyfyjl() {
                let param = {
                    brid: this.brid,
                    rn_s: this.config.zyjlPageSize * (this.config.zyjlPageNum - 1) + 1 + '',
                    rn_e: this.config.zyjlPageSize * this.config.zyjlPageNum + '',
                }
                this.api.getZyfyjl(param)
                    .then(res => {
                        if (res.data.length) {
                            this.config.zyjlPageNum ++;
                            this.zyjlList.push(...res.data);
                        } else {
                            this.$toast({message:'未查询到更多数据！',duration: 800})
                        }
                    }, err => {this.$toast({message:'查询失败！',duration: 800})})
            },
            loadMzfyjl() {
                let param = {
                    brid: this.brid,
                    rn_s: this.config.mzjlPageSize * (this.config.mzjlPageNum - 1) + 1 + '',
                    rn_e: this.config.mzjlPageSize * this.config.mzjlPageNum + '',
                }
                this.api.getMzjzjl(param)
                    .then(res => {
                        if (res.data.length) {
                            this.config.mzjlPageNum ++;
                            this.mzjlList.push(...res.data);
                        } else {
                            this.$toast({message:'未查询到更多数据！',duration: 800})
                        }
                    }, err => {this.$toast({message:'查询失败！',duration: 800})})
            },
            toMzDetail(item) {
                item = JSON.stringify(item);
                this.$router.push({name: 'mzRecordDetails', query: {data: item}});
            },
            toZyDetail(item) {
                item = JSON.stringify(item);
                this.$router.push({name: 'zyRecordDetails', query: {data: item}});
            },
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
.zyRecord li{position: relative; padding: 5px 2px; border-bottom: 1px solid #ccc;font-size:14px}
.zyRecord li p{min-height: 20px; line-height: 20px; margin-left: 5px; padding:2px 4px}
</style>