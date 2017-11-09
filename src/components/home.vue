<template>
    <div>
        <div>
            <!-- 轮播图部分 -->
            <mt-swipe :auto="8000">
                <mt-swipe-item v-for="item in adList" :key="item.id">
                    <div>
                        <img class="img" :src="completeHeadImgSrc(item.zst)" @click="goArticle(item.id,'健康天府')">
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div>
            <div class="line1"></div>
            <div style="border-bottom:1px solid #E6E6E6;padding-left:20px;font-size:14px;height:25px;line-height: 25px;color:#3dbbaa;display: flex;">
                <div style="flex:1">资讯信息</div>
                <div style="width:60px;" @click="goMoreNews">更多···</div>
            </div>
             <div class="flex" style="width:100%;font-size: 12px;position: relative;margin-bottom: 5px;border-bottom: 1px solid #E6E6E6;" v-for="item in newsList" @click="goArticle(item.id,'咨讯信息')">
                <div style="width:70px;">
                    <img v-if="item.zst" :src="completeHeadImgSrc(item.zst)" style="margin-left:4px;margin-top:4px;width:65px;height:42px;">
                    <svg v-if="!item.zst" viewBox="0 0 1024 1024" class="" style="margin-left: 10px;margin-top:7px;fill:rgb(62, 187, 170);height:40px;width:55px;">
                        <path d="M1023.999717 0H146.283049C65.830976 0 0 65.832389 0 146.284462v731.432206C0 958.175808 65.830976 1023.999717 146.283049 1023.999717h877.718082c80.457726 0 146.288703-65.822496 146.288702-146.283049V146.284462C1170.289833 65.830976 1104.461684 0 1023.999717 0zM146.283049 73.146471h877.718082c36.571822 0 73.146471 36.563342 73.146471 73.137991v655.596132L915.807841 570.512513c-21.942245-36.568996-65.826736-36.568996-95.083063-7.312668L615.923421 768.002615l-212.112612-270.628093c-21.943659-29.2535-58.516894-29.2535-87.773222 0L73.146471 790.090435V146.284462c0-43.881664 29.254914-73.137991 73.136578-73.137991z" fill="#cccccc" p-id="3863"></path><path d="M261.028626 286.980542l1.280494 10.909642q19.812328-1.522177 38.502457-2.72635v12.194376h11.227646v-12.836037q12.434646-0.723635 24.384512-1.281907 0.322244-4.812454 0.963904-10.426277-11.948454 0.879103-25.34559 1.683299v-11.94704h25.830369v-9.626321h-25.830369v-11.873546h-11.226232v11.873546h-19.897129l0.011307-0.00848q5.290166-8.822125 10.269395-18.130443H339.486463v-9.626321h-43.316324q3.205476-6.25831 6.255483-12.673502l-11.066524-3.688841q-3.695908 8.66383-7.466723 16.363756h-21.73731v9.626321H278.99512a208.232969 208.232969 0 0 1-11.066524 17.966495v9.784616h32.884394v12.595767q-18.609568 1.045878-39.785778 1.847247zM285.581327 378.756369h11.547062v-7.059679h86.471527v7.059679h11.547063v-68.023081H285.581327z m11.539995-58.077343h86.471527v15.722096h-86.471527z m0 25.188708h86.471527v15.883218h-86.471527z" fill="#cccccc" p-id="3864"></path><path d="M347.980691 258.433717q0 27.431693-14.441601 42.35242 5.134697 4.330502 8.98466 8.02217 12.756889-14.515096 15.722096-36.417768h25.830369v33.68859h11.226232v-33.68859h22.941483v-9.627734H359.047215v-20.374841q26.309494-1.284734 56.6329-4.652746l-3.691668-10.587398a413.199687 413.199687 0 0 1-64.009169 5.618063h0.001413zM568.892815 353.087122q-1.44727 9.469439-12.355498 9.466612H534.556911q-11.708184 0-11.711011-12.673502v-42.191298h-12.994332l0.011307 0.00424v44.110627q0 22.141528 21.016501 22.138701h27.751111q20.695671 0 22.783188-16.045753 1.281908-8.02217 2.887472-23.903974-7.386163-2.408347-13.480524-4.652746-0.641661 14.602723-1.927808 23.747093z" fill="#cccccc" p-id="3865"></path><path d="M425.463318 368.812044a103.523584 103.523584 0 0 1 8.66383 11.388768q54.870454-29.84004 67.057763-84.066007h81.178534v-12.51238H503.915502a298.244935 298.244935 0 0 0 4.17362-37.22055h62.085601v-12.51238h-130.268391v12.51238h54.707919a224.681526 224.681526 0 0 1-4.012498 37.22055h-62.88697l-0.00424 0.001413v12.51662h60.000911q-14.441601 48.769025-62.248136 72.671586zM712.4693 263.890658v-9.466613h-56.788368q3.448572-4.254181 6.416605-8.66383l-10.585985-4.972162a142.544741 142.544741 0 0 1-36.096937 37.380258q4.654159 4.493037 7.859635 7.859634a211.736661 211.736661 0 0 0 16.606852-14.279066 91.877587 91.877587 0 0 0 19.490085 17.88876q-18.373539 7.462483-46.526041 13.236014a68.105055 68.105055 0 0 1 5.455528 10.267982q32.487243-8.420734 52.13845-17.244273a300.937365 300.937365 0 0 0 48.127365 14.679044 90.366717 90.366717 0 0 1 5.294405-12.034668 222.157284 222.157284 0 0 1-41.47049-8.904099 123.974746 123.974746 0 0 0 30.078896-25.746981z m-42.351007 20.688604a74.123096 74.123096 0 0 1-23.502582-19.651206 5.235045 5.235045 0 0 0 0.483365-0.559686h49.487007l0.002826-0.00424v0.00424h-0.002826q-9.86235 11.306793-26.46779 20.210892z" fill="#cccccc" p-id="3866"></path><path d="M609.950607 370.574491h117.43518v7.701339h12.034668V227.314595H597.917353v150.961235h12.034668z m0.005654-131.712833h117.43518v120.16153h-117.43518z" fill="#cccccc" p-id="3867"></path><path d="M615.413202 278.168311h0.001413l-0.002827-0.002827 0.001414 0.002827zM643.804559 318.917993l0.002827 0.001413 0.001413-0.001413h-0.00424zM626.963091 340.253911l0.002827 0.001414q40.751096 5.62089 76.200718 13.480524l4.330502-12.194376q-37.059428-7.066746-77.167449-12.355499zM696.584669 316.193056q-25.983011-4.49021-49.570394-8.02217l-3.205476 10.747107q23.102605 3.205476 49.410686 8.502708zM795.735351 320.523558h66.257808v57.753685h13.794288v-69.949475h-79.089605q0.483365-17.966494 0.481952-28.235889h114.70883v-12.034668h-42.996908v-46.366332h-13.635992v46.366332h-58.077343v-43.47462h-13.635993l0.002827 0.00424v66.575812q0 31.127601-4.972162 45.242719-4.974989 15.723509-19.736007 31.284483a98.124591 98.124591 0 0 1 10.108273 11.390181q23.583144-23.901147 26.790032-58.556468z" fill="#cccccc" p-id="3868"></path>
                    </svg>
                </div>
                <div style="flex:1;margin-left: 10px;" >
                    <div class="twoRow" style="height:34px;">
                        {{item.wzbt}}
                    </div>
                     <div style="width:80px;color:#7F7F7F;">
                        {{item.qyrq.split(' ')[0]}}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div style="border-bottom:1px solid #E6E6E6;padding-left:20px;font-size:14px;height:25px;line-height: 25px;color:#3dbbaa;">医疗服务资源</div>
            <div>
                <div v-for="item in items"  @click="goHis(item)" style="font-size:12px;color: #808080;border-bottom:1px solid #E6E6E6;display:flex;">
                    <div style="width:50px;">
                        <img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=46e2e1b4372ac65c73086e219a9bd974/b8389b504fc2d562f950ed39e51190ef77c66c8d.jpg" style="width:40px;height:40px;margin-left:5px;">
                    </div>
                    <div style="flex:1;">
                        <div style="display: flex;">
                            <div style="flex:1;color:#333333;font-size:14px;">
                                {{item.mc}}
                            </div>
                            <div style="width:100px;">
                                {{item.lxdh?item.lxdh:'暂无电话'}}
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div  style="flex:1">
                                {{item.szddz?item.szddz:'暂无地址'}}
                            </div>
                            <div  style="width:80px;">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
    data() {
            return {
                items: [],
                newsList:[],
                adList:[],
            }
        },
        methods:{
            goMoreNews(){
                this.$router.push({
                    path:'/index/newsList'
                })
            },
            goArticle(id,title){
                this.$router.push({
                    path:'/index/articlePage',
                    query:{
                        id:id,
                        title:title,
                    }
                })
            },
            boundHandle(){
                this.$router.push({
                    path:'/index/personalCenter'
                })
            },
            goHis(item){
                this.$router.push({
                    name: 'hospitalPage',
                    query:{
                        id:item.id,
                        dyms:0,//普通模式进入
                    },
                })
            },
            loadNewsList(){
                let params = {
                    wzlx:"01",
                    length:"3",
                }
                this.api.getArticleList(params).then(
                    res=>{
                        console.log(res);
                        this.newsList = res.data; 
                    }, err=>{
                        console.log(err);
                    })
            },
            loadAdList(){
                let params = {
                    wzlx:'03',
                    length:'5',
                }
                this.api.getArticleList(params).then(
                    res=>{
                        console.log(res);
                        this.adList = res.data;
                    }, err=>{
                        console.log(err);
                    })
            },
            loadHisList(){
                let params = {
                }
                this.api.GetHisList(params).then(
                    res=>{
                        console.log(res);
                        this.items = res.data;
                    }, err=>{
                        console.log(err);
                    });
            }
        },
        mounted() {
            if (this.$store.getters.getEnterMode == 1) {
                this.$router.push({
                    name: 'hospitalPage',
                    query: {
                        id: this.$store.getters.getCurrentHis.id,
                        dyms: 1
                    }
                })
                return;
            }
            debugger
            let title = this.api.indexTitle();
            this.$store.commit('setPageTitle',title);
            this.$store.commit('setBackBtn',false);
            this.loadHisList();
            this.loadNewsList();
            this.loadAdList();
        },
        computed:{
            handleUser() {
                return this.$store.getters.getHandleUser;
            }
        }
}
</script>
<style scoped>
.hisList{
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
    height:100%;
}

.head {
    background: #3dbbaa;
}

</style>
