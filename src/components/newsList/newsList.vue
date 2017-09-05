<template>
    <div>
        <div class="infoItem" v-for="item in newsList" @click="goArticle(item)">
            &nbsp;{{item.wzjj}}
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
                        debugger
                        console.log(res);
                        this.newsList = res.data;
                    }, err=>{
                        console.log(err);
                    })
            },
            goArticle(item){
                debugger
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
            this.loadNewsList();
        }
}
</script>
<style scoped>

</style>
