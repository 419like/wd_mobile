<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script type="text/javascript">

import md5 from 'js-md5';

export default {
    data() {
        return {
            maskShow: 1,
        }
    }, mounted() {
    	let _this = this;
        setTimeout(()=> {
        	document.getElementById('mask').style.display = 'none'
        });
    }
}
</script>
<style scoped>
</style>
