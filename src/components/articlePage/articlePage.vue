<template>
    <div>
        <div v-show="article.wzbt" style="font-size: 22px;font-weight: bold;line-height: 24px;text-align: center;margin:5px;">{{article.wzbt}}</div>
        <div v-show="article.qyrq" style="font-size: 12px;color:#B3B3B3;text-align: center;">{{article.qyrq?article.qyrq.split(' ')[0]:''}}</div>
        <div class="html ql-editor acticleBox" style="height: auto;">
            <div v-html="article.nr">
            </div>
            <div style="width:100%;height:40px;line-height: 40px;text-align: center;color:#999999;">万达信息股份有限公司 版权所有</div>
        </div>
    </div>
</template>
<script type="text/javascript">
import '@/assets/css/quill.core.css';
let Base64 = require('js-base64').Base64;
export default {
    data() {
            return {
                article: {
                    text: '文章'
                },
                items: [],
                info:{}
            }
        },
        methods: {
            loadArticle(id){
                var params = {
                    id:id
                }
                this.api.getActicleDetail(params).then(
                    res => {
                        let data = res.data;
                        if (data.length) {
                            data = data[0];
                            if(!data.nr){
                                data.nr = '';
                            }
                            data.nr = Base64.decode(data.nr)
                            
                            data.nr = this.completeImgSrc(data.nr,this.axios.defaults.imgUrl)
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
            this.$store.commit('setPageTitle',this.$route.query.title);
            this.loadArticle(this.$route.query.id);
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
