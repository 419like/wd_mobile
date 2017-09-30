<template>
    <div>
        <div v-show="article.wzbt" style="font-size: 22px;font-weight: bold;line-height: 40px;height:40px;text-align: center;">{{article.wzbt}}</div>
        <!-- <div v-show="article.qyrq" style="font-size: 12px;color:#B3B3B3;text-align: center;">{{article.qyrq?article.qyrq.split(' ')[0]:''}}</div> -->
        <div v-if="type==3" style="text-align: center;">
            <img :src="article.zst" style="width:70px;height:auto;">
        </div>
        <div class="html ql-editor acticleBox" style="height: auto;">
            <div v-html="article.nr">
            </div>
            <div style="width:100%;height:40px;line-height: 40px;text-align: center;color:#999999;">万达信息股份有限公司 版权所有</div>
        </div>
    </div>
</template>
<script type="text/javascript">
import '@/assets/css/quill.core.css';
export default {
    data() {
            return {
                article: {
                    text: '文章'
                },
                items: [],
                info:{},
                type:'',
            }
        },
        methods: {
            loadArticle(item){
                var params = {
                    xgid:item.xgjgid,
                    lx:item.lx
                }
                this.api.getIntro(params).then(
                    res => {
                        debugger
                        console.log(res);
                        let data = res.data;
                        if (data.length) {
                            data = data[0];
                            data.nr = decodeURIComponent(data.nr)
                            if(data.nr.indexOf('<')<0){
                                data.nr = decodeURIComponent(data.nr)
                            }
                        } else {
                            data = {
                                nr: '',
                                id: '',
                                startTime: ''
                            }
                        }
                        this.article = data;
                    }
                );
            }
        },
        components: {

        },
        mounted() {
            this.loadArticle(this.$route.query);
            this.type = this.$route.query.lx;
            this.$store.commit('setPageTitle',this.$route.query.title);
        }
}
</script>
<style scoped>
.acticleBox{
    width:100%;
}
.borderB {
    border-bottom: 1px solid #CCCCCC
}

.marginT5 {
    margin-top: 5px;
}

.marginL20 {
    margin-left: 20px;
}

.infoContent {
    color: #999999;
    font-size: 12px;
}

.infoImg {
    width: 60px;
    padding: 5px;
}

.img {
    width: 100%;
}

.mint-swipe {
    width: 100%;
    height: 150px;
}
</style>
