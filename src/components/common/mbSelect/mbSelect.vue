<template>
    <div>
        <div class="listItem" @click="selectRelation()">
            <div class="topLine flex">
                <span class="itemTitle">{{config.title}}</span>
                <span class="shortWord" >{{value[config.textFeild]}}</span>
                <icon name="angle-down" scale="1.8" class="itemDownIcn"></icon>
            </div>
        </div>
        <div class="mask pCenter" v-if="relationSelect" >
            <div class="outTouch" @click="closeWin()">
            </div>
            <div class="selectBox">
                <div class="selectHead">
                    {{config.winTitle}}
                </div>
                <div class="selectList">
                    <div class="selectItem" v-for="item in config.options" @click="selectItem(item);">
                        <span class="itemText">
                            <icon name="square-o" scale="1" v-show="!(item==value)"></icon>
                            <icon name="check-square-o" scale="1" v-show="item==value"></icon>
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
