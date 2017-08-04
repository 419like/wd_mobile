<template>
    <div>
        <mt-header fixed :title="info.text" class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="topBar"></div>
        <div class="html ql-editor acticleBox" v-html="acticle.nr"></div>
    </div>
</template>
<script type="text/javascript">
import '@/assets/css/quill.core.css';
export default {
    data() {
            return {
                acticle: {
                    text: '文章'
                },
                items: [],
                info:{}

            }
        },
        methods: {
            goActicle() {
                
            }
        },
        components: {

        },
        mounted() {
            this.info = JSON.parse(this.$route.params.info);
            var params = {
                xgid: this.info.xgid,
                lx: this.info.lx + '',
            }
            this.api.getActicle(params).then(
                res => {
                    console.log(res);
                    let data = res.data;
                    if (data.length) {
                        data = data[0];
                        data.nr = decodeURIComponent(data.nr)
                    } else {
                        data = {
                            nr: '',
                            id: '',
                            startTime: ''
                        }
                    }
                    this.acticle = data;
                }
            );
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
