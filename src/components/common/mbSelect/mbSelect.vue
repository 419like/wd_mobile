<template>
    <div>
        <div class="listItem" @click="selectRelation()">
            <div class="topLine flex">
                <span class="itemTitle">{{config.title}}</span>
                <span class="shortWord" >{{value[config.textFeild]}}</span>
                <svg viewBox="0 0 1024 1024" class="svgIcon" style="margin-top:18px;margin-left:-10px;height:20px;fill:#000;">
                    <path d="M103.4496 256.606208H0l513.211392 510.787584L1024 256.606208H914.891776l-402.48832 396.83072-408.953856-396.83072z" p-id="1535"></path>
                </svg>
            </div>
        </div>
        <div class="mask pCenter" v-if="relationSelect">
            <div class="outTouch" @click="closeWin()">
            </div>
            <div class="selectBox">
                <div class="selectHead">
                    {{config.winTitle}}
                </div>
                <div class="selectList">
                    <div class="selectItem" v-for="item in config.options" @click="selectItem(item);">
                        <span class="itemText">
                            <svg v-show="!(item==value)" viewBox="0 0 1408 1792" class="svgIcon" style="margin-top:-10px;height:20px;fill:#000000;">
                                <path d="M1120 256h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-832q0-66-47-113t-113-47zM1408 416v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"></path>
                            </svg>
                            <svg v-show="item==value" viewBox="0 0 1664 1792" class="svgIcon" style="height:20px;fill:#000000;">
                                <path d="M1408 930v318q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-10 10-23 10-3 0-9-2-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-254q0-13 9-22l64-64q10-10 23-10 6 0 12 3 20 8 20 29zM1639 441l-814 814q-24 24-57 24t-57-24l-430-430q-24-24-24-57t24-57l110-110q24-24 57-24t57 24l263 263 647-647q24-24 57-24t57 24l110 110q24 24 24 57t-24 57z"></path>
                            </svg>
                            <span>{{item[config.textFeild]}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                relationSelect:false,
                relation:{}
            }
        },
        methods: {
            selectRelation(){
                this.relationSelect = true;
            },
            closeWin(){
                this.relationSelect = false;
            },
            selectItem(item){
                this.$emit('input', item);
                this.$emit('select')
                this.relationSelect = false;
            },
            reConfig(){
                this.config = this.config;
            }
        },
        mounted(){

        },
        props:['config','value']
}
</script>
<style scoped>

</style>
