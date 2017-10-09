<template>
    <div id="personinfo" class="holePage">
        <mt-header fixed :title=msg class="green">
            <mt-button icon="back" slot="left" @click="quit()"></mt-button>
        </mt-header>
        <div class="holeHeight" style="position:relative">
            <div class="topBar"></div>
            <mt-radio :title="title" v-model="value" :options="options">
            </mt-radio>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            msg: '就诊人员选择',
            title:'绑定人员列表',
        }
    },
    methods: {
        quit() {
            this.$emit('close');
        },
    },
    mounted() {

    },
    components: {

    },
    computed: {
        value: {
            get:function(){
                return this.chooseValue;
            },
            set:function(val){
                this.$emit('change', val);
            }
        },
    },
    props: ['chooseValue','options']
}

</script>
<style scoped>


</style>
