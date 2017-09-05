<template>
    <div>
        <div>
            <!-- 轮播图部分 -->
            <mt-swipe :auto="8000">
                <mt-swipe-item v-for="item in adList" >
                    <div>
                        <img class="img" :src="item.zst" @click="goArticle(item.id)">
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div>
            <div class="line1"></div>
            <div style="border-bottom:1px solid #E6E6E6;padding-left:20px;font-size:14px;height:25px;line-height: 25px;color:#3dbbaa;display: flex;">
                <div style="flex:1">咨询信息</div>
                <div style="width:60px;" @click="goMoreNews">更多···</div>
            </div>
            <div class="infoItem" v-for="item in newsList" @click="goArticle(item)">
                &nbsp;{{item.wzjj}}
            </div>
        </div>
        <div>
            <div class="line1"></div>
            <div style="border-bottom:1px solid #E6E6E6;padding-left:20px;font-size:14px;height:25px;line-height: 25px;color:#3dbbaa;">医疗服务资源</div>
            <div>
                <!-- <mt-cell v-for="item in items" :title="item.text" label="描述信息" is-link="" @click.native="goHis(item)"></mt-cell> -->
                <div v-for="item in items"  @click="goHis(item)" style="font-size:12px;color: #808080;border-bottom:1px solid #E6E6E6;display:flex;">
                    <div style="width:50px;">
                        <img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=46e2e1b4372ac65c73086e219a9bd974/b8389b504fc2d562f950ed39e51190ef77c66c8d.jpg" style="width:40px;height:40px;margin-left:5px;">
                    </div>
                    <div style="flex:1;">
                        <div style="display: flex;">
                            <div style="flex:1;color:#333333;font-size:14px;">
                                {{item.text}}
                            </div>
                            <div style="width:80px;">
                                {{item.lxdh?item.lxdh:'暂无电话'}}
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div  style="flex:1">
                                {{item.szddz?item.szddz:'暂无地址'}}
                            </div>
                            <div  style="width:80px;">
                                距离390m
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
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
            goArticle(id){
                this.$router.push({
                    path:'/index/articlePage',
                    query:{
                        id:id
                    }
                })
            },
            boundHandle(){
                this.$router.push({
                    path:'/index/personalCenter'
                })
            },
            goHis(item){
                console.log(item);
                this.$router.push({
                    path: '/index/hospitalPage',
                    query:{
                        id:item.id,
                        text:item.text
                    },
                })
            },
            loadNewsList(){
                let params = {
                    xgid:'1',
                    wzlx:'1',
                    length:'3',
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
                    xgid:'1',
                    wzlx:'2',
                    length:'2',
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
                    length:'999',
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
            this.$store.commit('setPageTitle','健康金牛');
            this.loadHisList();
            this.loadNewsList();
            this.loadAdList();
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
