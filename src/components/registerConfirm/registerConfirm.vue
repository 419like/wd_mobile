<template>
    <div>
        <div class="inPageBody">
            <div class="center">
                预约挂号确认
            </div>
            <div>
                <div>
                    号别信息
                </div>
                <div>
                    <div>
                        <span>科室：</span><span>{{registerInfo.ksmc}}</span>
                    </div>
                    <div>
                        <span>医生：</span><span></span>
                    </div>
                    <div>
                        <span>号类：</span><span>普通挂号</span>
                    </div>
                    <div>
                        <span>日期：</span><span>2017-08-23(周三)</span>
                    </div>
                    <div>
                        <span>金额：</span><span>¥0.00</span>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    就诊人员信息
                </div>
                <div>
                    <div>
                        <span>姓名：</span><span>内科</span>
                    </div>
                    <div>
                        <span>身份证号：</span><span>500000000000000000</span>
                    </div>
                    <div>
                        <span>手机号：</span><span>普通挂号</span>
                    </div>
                    <div>
                        <span>地址：</span><span>2017-08-23(周三)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import mbSelect from '@/components/common/mbSelect/mbSelect.vue';
export default {
    data() {
            return {
                registerInfo:{},
            }
        },
        methods: {
        },
        components: {
        },
        mounted() {
            this.registerInfo = this.$route.query;
        },
        computed:{
            pageTitle() {
                return this.$store.getters.pageTitle;
            },
        }
}
</script>
<style scoped>
.t2{
    width:100%;
    font-size: 12px;
    color:#999999;
}
.item{
    padding:5px;
    border:1px solid #E6E6E6;
}


.modeHead{
    height:25px;
    width:100%;
    background: #CCCCCC;
    padding-top:6px;
}
.headTitle{
    margin-left:10px;
    font-size:14px;
    color:#7F7F7F;
}
</style>
