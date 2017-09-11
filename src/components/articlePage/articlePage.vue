<template>
    <div>
        
        <div class="html ql-editor acticleBox" >
            <span v-if="article.wzbt" style="font-size: 22px;font-weight: bold;line-height: 40px;height:40px;">{{article.wzbt}}</span><br>
            <span v-if="article.wzbt" style="font-size: 12px;color:#B3B3B3;">{{article.qyrq.split(' ')[0]}}</span>
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
                info:{}
            }
        },
        methods: {
            loadArticle(){
                var params = {
                    id:this.$route.query.id
                }
                debugger
                this.api.getActicleDetail(params).then(
                    res => {
                        debugger
                        console.log(res);
                        let data = res.data;
                        if (data.length) {
                            data = data[0];
                            debugger
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
                        debugger
                        this.article = data;
                        this.$store.commit('setPageTitle',this.article.wzbt);
                    }
                );
            }
        },
        components: {

        },
        mounted() {
            this.loadArticle();
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
