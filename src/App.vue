<template>
    <div class="window" id="app">
        <div v-if="maskShow" class="mask flex center">
            <icon scale="3" class="fa-pulse icon" name="spinner"></icon>
        </div>
        <router-view class="window" keep-alive transition transition-mode="out-in"></router-view>
    </div>
</template>
<script type="text/javascript">
// import sysConfig from '../../../static/sysConfig/config.json'

export default {
    data() {
        return {}
    }, mounted() {
        let _this = this;
        setTimeout(() => {
            document.getElementById('mask').style.display = 'none';
            // document.title = sysConfig.indexTitle;
        });
    }, computed: {
        maskShow() {
            return this.$store.state.maskShow;
        }
    }
}
</script>
<style scoped>
.fa-pulse {
    animation: fa-spin 1s infinite steps(8);
}

.center {
    align-items: center;
    justify-content: center;
}

.icon {
    font-size: 30px;
    color: #fff;
}
</style>
