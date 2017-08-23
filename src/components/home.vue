<template>
    <div>
        <div>
            <!-- 轮播图部分 -->
            <mt-swipe :auto="8000">
                <mt-swipe-item>
                    <div>
                        <img class="img" src="http://www.hangzhouzk.com/admin/image/2014/05/20140508165323421.jpg">
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <img class="img" src="http://n1.itc.cn/img8/wb/recom/2016/06/08/146535464543258587.JPEG">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div>
            <div class="line1"></div>
            <div style="border-bottom:1px solid #E6E6E6;padding-left:20px;font-size:14px;height:25px;line-height: 25px;color:#3dbbaa;">咨询信息</div>
            <div class="infoItem" v-for="item in 3">
                &nbsp;金牛区开展医疗机构环境督察工作金牛区开展医疗机构环境督察工作金牛区开展医疗机构环境督察工作
            </div>
        </div>
        <!-- <div>
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
        </div> -->
        <div>
            <div class="line1"></div>
            <div style="border-bottom:1px solid #E6E6E6;padding-left:20px;font-size:14px;height:25px;line-height: 25px;color:#3dbbaa;">医疗服务资源</div>
            <div>
                <mt-cell v-for="item in items" :title="item.text" label="描述信息" is-link="" @click.native="goHis(item)"></mt-cell>
            </div>
        </div>
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
.hisList{
}
.infoItem{
    height:30px;
    border-bottom:1px solid #E6E6E6;
    line-height: 30px;
    color:#808080;
    font-size:14px;
    width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
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
