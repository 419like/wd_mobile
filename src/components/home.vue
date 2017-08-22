<template>
    <div class="holeHeight">
        <!-- <mt-header fixed title="" class="head">
            <mt-button slot="left">成都市</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="topBar"></div> -->
        <div>
            <div class="flex font-green margin10 bottomLine">
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="heartbeat" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">在线挂号</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon name="envelope" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">在线缴费</span>
                    </div>
                </div>
                <div class="flex1 center">
                    <div class="iconbox1">
                        <icon style="color:#FFCC66" name="question-circle" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">就诊查询</span>
                    </div>
                </div>
                <div class="flex1 center" @click="boundHandle">
                    <div class="iconbox1">
                        <icon name="id-card" scale="1.8"></icon>
                    </div>
                    <div>
                        <span class="text1">{{handleUser.hzxm?handleUser.hzxm:'绑定人员'}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="line1"></div>
            <div class="title1 paddingL5">
                <span class="more">全部医院&nbsp;>></span>
            </div>
            <mt-cell v-for="item in items" :title="item.text" label="描述信息" is-link="" @click.native="goHis(item)"></mt-cell>
        </div>
        <div class="footBar"></div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                items: []
            }
        },
        methods:{
            boundHandle(){
                this.$router.push({
                    path:'/index/personalCenter'
                })
            },
            goHis(item){
                console.log(item);
                this.$router.push({
                    path: '/hospitalPage/'+JSON.stringify(item)
                })
            }
        },
        mounted() {
            let params = {
                length:'5',
            }
            this.api.GetHisList(params).then(
                res=>{
                    console.log(res);
                    this.items = res.data;
                }, err=>{
                    console.log(err);
                })
        },
        computed:{
            handleUser() {
                return this.$store.getters.getHandleUser;
            },
        }
}
</script>
<style scoped>
.more {
    float: right;
    font-size: 12px;
}
.bottomLine {
    border-bottom: 1px solid #CCCCCC;
    height: 60px;
}


.topBar {
    height: 40px;
}

.footBar {
    height: 50px;
}

.img {
    width: 100%;
}

.head {
    background: #3dbbaa;
}

.mint-swipe {
    width: 100%;
    height: 150px;
}
</style>
