<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            maskShow: 1,
        }
    }, mounted() {
    	let _this = this;
        setTimeout(function() {
        	document.getElementById('mask').style.display = 'none'
        })
    }
}
</script>
<style scoped>
</style>
