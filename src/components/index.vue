<template>
    <div>
        <router-view></router-view>
        <mt-tabbar fixed v-model="selected" class="foot">
            <mt-tab-item id="home">
                <icon name="home" scale="1.3"></icon>
                <div class="menuBtn">主页</div>
            </mt-tab-item>
            <mt-tab-item id="consult">
                <icon name="user-md" scale="1.3"></icon>
                <div class="menuBtn">我的咨询</div>
            </mt-tab-item>
            <mt-tab-item id="healthRecord">
                <icon name="file-text-o" scale="1.3"></icon>
                <div class="menuBtn">健康档案</div>
            </mt-tab-item>
            <mt-tab-item id="personalCenter">
                <icon name="user" scale="1.3"></icon>
                <div class="menuBtn">个人中心</div>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>````
<script type="text/javascript">
import axios from 'axios';
export default {
    data() {
            return {
                selected: 'home'
            }
        },
        methods: {
            go(url) {
                this.$router.push({
                    path: '/index/' + url
                })
            }
        },
        watch: {
            selected: function(val, oldVal) {
                // 这里就可以通过 val 的值变更来确定
                this.$router.push({
                    path: '/index/' + val
                })
            }
        },
        mounted() {
            this.$router.push({
                path: '/index/' + 'home'
            });
            var newSrc = {
                // gljgid: '',
                // jgid: '70'
                jb: "1"
            }
            // var param = {
            //     "data": JSON.stringify(newSrc)
            // };
            // this.$http.post("http://172.16.110.168:8080/testapi/rest/queryDataBySql/050101/2", param, {
            //     emulateJSON: true
            // }).then(
            //     function(res) {
            //         // 处理成功的结果
            //         debugger
            //         let data = JSON.parse(res.body);
            //         console.log(data);
            //         data = data.data;
            //     },
            //     function(res) {
            //         // 处理失败的结果
            //         console.log(res);
            //     }
            // );
            // let url = 'http://172.16.110.168:8080/testapi/rest/queryDataBySql/050101/2';
            // debugger
            // axios({
            //     url: url,
            //     method: 'post',
            //     data: {
            //         "data": JSON.stringify(newSrc)
            //     },
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }).then((response) => {
            //     debugger
            //     console.log(response)
            // });
            // axios({
            //     method: 'post',
            //     url: url,
            //     params: {
            //         data: JSON.stringify(newSrc)
            //     }
            // }).then(function(response) {
            //     alert(JSON.stringify(response.data));
            // }).catch(function(error) {
            //     alert(error);
            // });
            // axios.post(url, {
            //         data:JSON.stringify(newSrc)
            //     })
            //     .then(function(response) {
            //         console.log(response);
            //     })
            //     .catch(function(error) {
            //         console.log(error);
            //     });

            //     let url = 'http://172.16.110.168:8080/testapi/rest/queryDataBySql/050101/2';
            //     var param = {"jb": '1'};
            //     var str = JSON.stringify(param);
            //     this.$http({
            //         url: url,
            //         method: 'POST',             
            //         data: {"data": str}
            //     }).then((response) => {
            //         console.log(response)
            //     });
        }

}
</script>
<style type="text/css">
.menuBtn {
    margin-top: 5px;
}

.foot {
    border-top: 1px solid #E6E6E6;
    height: 50px;
    color: #808080;
}

.icon {
    font-size: 24px;
}
</style>
