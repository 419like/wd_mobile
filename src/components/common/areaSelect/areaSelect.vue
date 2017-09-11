<template>
    <div id="personinfo" class="holePage">
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="quit()"></mt-button>
        </mt-header>
        <div>
        	位置信息
        </div>
    </div>
</template>
<script type="text/javascript">

export default {
    data() {
            return {
            	msg:'地区选择'
            }
        },
        methods: {
            quit(){
                this.$emit('closeAreaWin');
            }
        },
        mounted() {

        },
        components: {

        },
        computed: {

        },
        props:['value']
}
</script>
<style scoped>
</style>

