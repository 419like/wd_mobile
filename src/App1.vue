<template>
    <div>
        <mt-tabbar fixed v-model="selected">
            <mt-tab-item id="1">
                <div class="menuBtn">主页</div>
            </mt-tab-item>
            <mt-tab-item id="2">
                <div class="menuBtn">我的咨询</div>
            </mt-tab-item>
            <mt-tab-item id="3">
                <div class="menuBtn">健康档案</div>
            </mt-tab-item>
            <mt-tab-item id="4">
                <div class="menuBtn">个人中心</div>
            </mt-tab-item>
        </mt-tabbar>
        <!-- tab-container -->
        <!-- <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <index></index>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <consult/>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <health-record/>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <personal-center/>
            </mt-tab-container-item>
        </mt-tab-container> -->

        <!-- <div class="footBar"></div> -->
        <router-view></router-view>
    </div>
</template>
<script type="text/javascript">

const routes = [
    { path: '/index', component: index },
    { path: '/consult', component: consult },
]

const router = new VueRouter({
  routes
})

export default {
    data() {
            return {
                selected: '1',
                list:[]
            }
        },
        watch: {
            selected: function(val, oldVal) {
                // 这里就可以通过 val 的值变更来确定
                console.log(val)
            }
        },
        methods: {
            
        },
        components:{
            personalCenter,index,consult,healthRecord
        }
}
</script>
<style scoped>
.menuBtn {
    height: 30px;

}

.topBar {
    height: 40px;
}

.footBar {
    height: 44px;
}
</style>
