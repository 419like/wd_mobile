<template>
    <div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        this.$store.commit('setEnterMode',0);
        
        this.$router.push({
        	name:'home'
        })
    },
    components: {
        
    },
    computed: {

    }
}

</script>
<style scoped>


</style>
