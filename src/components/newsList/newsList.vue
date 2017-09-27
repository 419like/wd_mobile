<template>
    <div style="width:100%;">
        <div v-for="item in newsList" @click="goArticle(item.id,'资讯信息')" class="flex" style="border-bottom:1px solid #CCCCCC;width:100%;">
            <div style="width:50px;">
                <img :src="item.zst" style="margin:5px;width:30px;height:30px;">
            </div>
            <div class="flex1">
                <div class="flex ">
                    <div class="flex1" style="font-size: 14px;color:#666666;">
                        &nbsp;{{item.wzbt}}
                    </div>
                    <div style="color:#B3B3B3;font-size: 12px;line-height: 22px;">
                        {{item.qyrq.split(' ')[0]}}&nbsp;
                    </div>
                </div>
                <div  style="height:20px;line-height: 20px;border:0px;border:0px;color:#999999;font-size: 13px;">
                    <div class="singleRow" style="width:100%;">
                        &nbsp;{{item.wzjj}}
                    </div>
                </div>
                <div style="width:10px;">
                    
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
                    wzlx:"01",
                    length:"999",
                }
                this.api.getArticleList(params).then(
                    res=>{
                        console.log(res);
                        this.newsList = res.data;
                    }, err=>{
                        console.log(err);
                    })
            }
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
