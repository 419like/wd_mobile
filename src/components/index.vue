<template>
    <div>
        <router-view keep-alive transition transition-mode="out-in"></router-view>
        <mt-tabbar fixed v-model="selected" class="foot">
            <mt-tab-item id="home">
                <icon name="home" scale="1.3"></icon>
                <div class="menuBtn">主页</div>
            </mt-tab-item>
            <mt-tab-item id="consult">
                <icon name="user-md" scale="1.3"></icon>
                <div class="menuBtn">我的咨询</div>
            </mt-tab-item>
            <mt-tab-item id="healthRecord">
                <icon name="file-text-o" scale="1.3"></icon>
                <div class="menuBtn">健康档案</div>
            </mt-tab-item>
            <mt-tab-item id="personalCenter">
                <icon name="user" scale="1.3"></icon>
                <div class="menuBtn">个人中心</div>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>````
<script type="text/javascript">
import axios from 'axios';
export default {
    data() {
            return {
                selected: 'home'
            }
        },
        methods: {
            go(url) {
                this.$router.push({
                    path: '/index/' + url
                })
            }
        },
        watch: {
            selected: function(val, oldVal) {
                // 这里就可以通过 val 的值变更来确定
                this.$router.push({
                    path: '/index/' + val
                })
            }
        },
        mounted() {
            let url = this.$router.currentRoute.path.split('/')[2];
            if(url){
                this.selected = url;
            }else{
                this.$router.push({
                    path: '/index/home'
                })
            }
        },
        created(){

        }

}
</script>
<style type="text/css">
.menuBtn {
    margin-top: 5px;
}

.foot {
    border-top: 1px solid #E6E6E6;
    height: 50px;
    color: #808080;
}

.icon {
    font-size: 24px;
}
</style>
