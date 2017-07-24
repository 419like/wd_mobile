<template>
    <div>
        <mt-header fixed :title="info.text" class="green">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="topBar"></div>
        <div>
            <!-- 轮播图部分 -->
            <mt-swipe :auto="8000">
                <mt-swipe-item>
                    <div>
                        <img class="img" src="http://www.hangzhouzk.com/admin/image/2014/05/20140508165323421.jpg">
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <img class="img" src="http://n1.itc.cn/img8/wb/recom/2016/06/08/146535464543258587.JPEG">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div>
            <div class="line1"></div>
            <div class="title1 paddingL5">
                <icon name="hospital-o" scale="0.8"></icon>
                <span>机构列表</span>
            </div>
            <mt-cell v-for="item in items" :title="item.text" label="描述信息" is-link=""></mt-cell>
        </div>
        <div>
            <div class="line1"></div>
            <div class="title1 paddingL5">
                <icon name="hospital-o" scale="0.8"></icon>
                <span>医院简介</span>
            </div>
            <div class="flex marginT5 borderB" @click="goActicle()">
                <div class="flex1 marginL20">
                    <div class="infoTitle">查看详细信息</div>
                    <div class="infoContent">医院信息</div>
                </div>
                <div class="infoImg">
                    <img class="img" src="http://www.hangzhouzk.com/admin/image/2014/05/20140508165323421.jpg">
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                info: {},
                items: []

            }
        },
        methods: {
            goActicle(){
                this.$router.push({
                    path:'/acticle/'+JSON.stringify({xgid:this.info.id,lx:1})
                })
            }
        },
        components: {

        },
        mounted() {
            this.info = JSON.parse(this.$route.params.info);
            var params = {
                gljgid: this.info.id,
            };
            this.api.getBMList(params).then(
                res => {
                    let data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].state == 'open') {
                            data[i].children = [];
                        } else {
                            data[i].children = [{
                                text: '[空]'
                            }]
                        }
                    }
                    this.items = data;
                }
            );
        }
}
</script>
<style scoped>
.borderB{
    border-bottom: 1px solid #CCCCCC
}
.marginT5{
    margin-top: 5px;
}
.marginL20{
    margin-left: 20px;
}
.infoContent{
    color:#999999;
    font-size:12px;
}
.infoImg{
    width:60px;
    padding:5px;
}
.img {
    width: 100%;
}

.mint-swipe {
    width: 100%;
    height: 150px;
}
</style>
