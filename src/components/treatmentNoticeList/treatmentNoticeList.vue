<template>
    <div>
        <div v-if="!noticeList.length" style="text-align: center;">暂无。</div>
        <div v-if="noticeList.length" v-for="item in noticeList" @click="goArticle(item.id,'就诊须知')" class="flex" style="border:1px solid #CCCCCC;height:40px;line-height: 40px;">
            <div class="flex1">
                <div class="flex ">
                    <div class="flex1 singleRow" style="font-size: 20px;color:#666666;" >
                        &nbsp;{{item.wzbt}}
                    </div>
                    <div style="color:#B3B3B3;font-size: 14px;line-height: 22px;">
                        {{item.qyrq.split(' ')[0]}}&nbsp;
                    </div>
                </div>
                <!-- <div class="singleRow" style="height:20px;line-height: 20px;border:0px;border:0px;color:#999999;font-size: 13px;">
                    &nbsp;{{item.wzjj}}
                </div> -->
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                noticeList:[],
            }
        },
        methods: {
            loadNoticeList(id){
                let params = {
                    wzlx:"02",
                    length:"999",
                    xgjgid:id
                }
                this.api.getArticleList(params).then(
                    res=>{
                        console.log(res);
                        this.noticeList = res.data;
                    }, err=>{
                        console.log(err);
                    })
            }
        },
        components: {

        },
        mounted() {
            this.$store.commit('setPageTitle','就诊须知列表');
            this.loadNoticeList(this.$route.query.jgid);
        }
}
</script>
<style scoped>

</style>
