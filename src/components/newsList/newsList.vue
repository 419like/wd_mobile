<template>
    <div>
        <div v-for="item in newsList" @click="goArticle(item)" class="flex">
            <div style="width:50px;">
                <img :src="item.zst" style="margin:5px;width:40px;height:40px;">
            </div>
            <div class="flex1">
                <div class="flex ">
                    <div class="flex1" style="font-size: 16px;font-weight: bold;">
                        &nbsp;{{item.wzbt}}
                    </div>
                    <div style="color:#B3B3B3;font-size: 14px;line-height: 22px;">
                        {{item.qyrq.split(' ')[0]}}&nbsp;
                    </div>
                </div>
                <div class="infoItem" style="height:20px;line-height: 20px;">
                    &nbsp;{{item.wzjj}}
                </div>
            </div>
            
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                newsList:[],
            }
        },
        methods: {
            loadNewsList(){
                let params = {
                    xgid:'1',
                    wzlx:'1',
                    length:'9999',
                }
                this.api.getArticleList(params).then(
                    res=>{
                        
                        console.log(res);
                        this.newsList = res.data;
                    }, err=>{
                        console.log(err);
                    })
            },
            goArticle(item){
                
                this.$router.push({
                    path:'/index/articlePage',
                    query:{
                        id:item.id
                    }
                })
            },
        },
        components: {

        },
        mounted() {
            this.$store.commit('setPageTitle','新闻列表');
            this.loadNewsList();
        }
}
</script>
<style scoped>

</style>
