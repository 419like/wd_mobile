<template>
    <div id="personinfo" class="holePage">
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="quit()"></mt-button>
        </mt-header>
        <div class="holeHeight">
            <div class="topBar"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                msg: '个人信息',
            }
        },
        methods: {
            quit(){
                this.$emit('close');
            }
        },
        mounted() {

        },
        components: {

        },
        computed: {

        }
}
</script>
<style scoped>
</style>
