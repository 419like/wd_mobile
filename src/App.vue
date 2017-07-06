<template>
    <div id="app">
        <div v-if="maskShow" class="mask">fuck</div>
        <router-view></router-view>
    </div>
</template>
<script type="text/javascript">

export default {
    data() {
        return {
        }
    }, mounted() {
    	let _this = this;
        setTimeout(()=> {
        	document.getElementById('mask').style.display = 'none'
        });
    },computed:{
        maskShow(){
            return this.$store.state.maskShow;
        }
    }
}
</script>
<style scoped>
</style>
