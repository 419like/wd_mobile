<template>
    <div>
        <div class="bigWindow" :class="{menuOut:menuAble}">
            <div class="smallindow">
                <div class="head green">
                    <div v-if="backBtnHide" style="position:absolute;left:0px;top:0px;" @click="goback()">
                        <svg viewBox="0 0 1024 1024" class="svgIcon" style="margin-top:10px;margin-left:5px;height:20px;fill:#FFFFFF;">
                                <path d="M693.3504 918.903467a34.030933 34.030933 0 0 1-24.132267-10.001067L279.4496 519.0656a34.0992 34.0992 0 0 1 0-48.264533l389.802667-389.802667a34.0992 34.0992 0 1 1 48.264533 48.264533L351.8464 494.933333l365.6704 365.704534a34.0992 34.0992 0 0 1-24.1664 58.2656z"></path>
                        </svg>
                    </div>
                    <div style="display:flex;width:100%;">
                        <div style="width:25px;">
                        </div>
                        <div style="flex:1;text-align:center;margin-top:8px;color:#fff;" class="singleRow">
                            {{pageTitle}}
                        </div>
                        <div style="width:25px;">
                        </div>
                    </div>
                    <div class="enterMenuBtn" @click="enterMenu">
                        <svg viewBox="0 0 1024 1024" class="svgIcon" style="height:30px;margin-top:5px;">
                                <path d="M241.676 282.156h-38.288c-10.581 0-19.137 8.579-19.137 19.137s8.562 19.138 19.137 19.138h38.288c10.581 0 19.137-8.579 19.137-19.138s-8.562-19.137-19.137-19.137zM394.821 320.441h459.418c10.583 0 19.138-8.579 19.138-19.138s-8.562-19.137-19.138-19.137h-459.418c-10.583 0-19.137 8.579-19.137 19.137 0 10.561 8.557 19.138 19.137 19.138zM241.676 511.867h-38.288c-10.581 0-19.137 8.578-19.137 19.137 0 10.581 8.562 19.137 19.137 19.137h38.288c10.581 0 19.137-8.562 19.137-19.137 0-10.561-8.562-19.137-19.137-19.137zM854.234 511.867h-459.418c-10.583 0-19.137 8.578-19.137 19.137 0 10.581 8.557 19.137 19.137 19.137h459.418c10.583 0 19.138-8.562 19.138-19.137 0-10.561-8.562-19.137-19.138-19.137zM241.676 741.581h-38.288c-10.581 0-19.137 8.562-19.137 19.137 0 10.583 8.562 19.138 19.137 19.138h38.288c10.581 0 19.137-8.562 19.137-19.138s-8.562-19.137-19.137-19.137zM854.234 741.581h-459.418c-10.583 0-19.137 8.562-19.137 19.137 0 10.583 8.557 19.138 19.137 19.138h459.418c10.583 0 19.138-8.562 19.138-19.138s-8.562-19.137-19.138-19.137z"></path>
                            </svg>
                    </div>
                </div>
                <div class="topBar"></div>
                <router-view keep-alive transition transition-mode="out-in" class="body"></router-view>
            </div>
            <div class="menuMask">
                <div v-if="menuAble" class="smallindow pageMask" @click="outMenu">
                    
                </div>
                <div class="outMenu">
                    <div @click="go('personalCenter')" style="margin-bottom: 40px;margin-top:20px;">
                        <div style="text-align: center;margin-top:10px;margin-bottom:10px;">
                            <svg style="fill:#FFFFFF;" viewBox="0 0 1024 1024"  width="40" height="40"><path d="M947.2 1024 76.8 1024C34.133333 1024 0 989.866667 0 947.2c0-162.133333 119.466667-290.133333 281.6-307.2C341.333333 682.666667 426.666667 699.733333 512 699.733333c85.333333 0 170.666667-25.6 230.4-59.733333 153.6 17.066667 281.6 145.066667 281.6 307.2C1024 989.866667 989.866667 1024 947.2 1024zM512 571.733333c-145.066667 0-256-128-256-290.133333C256 128 366.933333 0 512 0c145.066667 0 256 128 256 290.133333C768 443.733333 657.066667 571.733333 512 571.733333z"></path>
                            </svg>
                        </div>
                        <div style="text-align:center;">
                            <mt-button v-if="!appUserInfo.xm" type="primary" style="height:25px;width:80px;font-size:15px;">登&nbsp;&nbsp;录</mt-button>
                            <span v-if="appUserInfo.xm" style="color:#fff;">{{appUserInfo.xm}}</span>
                        </div>
                    </div>
                    <div class="list">
                        <div class="menuItem" @click="go('home')">
                                <svg viewBox="0 0 1024 1024" class="svgIcon">
                                <path d="M793.431919 526.002424l19.730101-19.717172L515.542626 208.665859l-0.530101 0.530101-1.111919-1.111919L215.195152 506.789495l19.794747 19.794747 46.105859-46.105859L281.095758 787.393939l0.005172 0 27.998384 0 121.355636 0 28.003556 0 0-28.003556L458.458505 544.694303l112.015515 0 0 214.696081L570.47402 787.393939l28.003556 0 121.346586 0 28.004848 0 0.001293 0 0-28.003556L747.830303 759.390384 747.830303 480.400808 793.431919 526.002424zM719.825455 759.390384l-121.346586 0L598.478869 544.694303l0-28.003556-28.003556 0L458.459798 516.690747l-28.003556 0 0 28.003556 0 214.696081L309.100606 759.390384 309.100606 452.473535 514.495354 247.078788l205.330101 205.317172L719.825455 759.390384z"></path>
                                </svg>
                            <div>
                                首页
                            </div>
                        </div>
                        <div class="menuItem" @click="go('medicalRecord')">
                            <svg viewBox="0 0 1024 1024" class="svgIcon" style="margin:4px;height:16px;">
                                <path d="M926.208 784.896V236.544c0-98.816-80.384-179.2-179.2-179.2H276.992c-98.816 0-179.2 80.384-179.2 179.2v550.912c0 98.816 80.384 179.2 179.2 179.2h473.088c47.104 0 93.184-19.968 126.464-54.272 33.792-35.328 51.2-80.384 49.664-127.488z m-777.728 3.072V236.544c0-70.656 57.344-128 128-128h23.04v42.496c0 39.424 32.256 71.68 71.68 71.68h282.624c39.424 0 71.68-32.256 71.68-71.68v-42.496h20.48c70.656 0 128 57.344 128 128v549.376c2.048 33.28-10.24 66.048-34.816 91.136-23.552 24.576-56.32 38.912-89.6 38.912H276.48c-70.656 0-128-57.344-128-128zM675.328 151.04c0 9.728-7.68 20.48-20.48 20.48H372.224c-9.728 0-20.48-7.68-20.48-20.48v-42.496h323.584v42.496z" p-id="2277"></path><path d="M257.024 357.376h512c14.336 0 25.6-11.264 25.6-25.6s-11.264-25.6-25.6-25.6h-512c-14.336 0-25.6 11.264-25.6 25.6s11.264 25.6 25.6 25.6zM257.024 503.296h512c14.336 0 25.6-11.264 25.6-25.6s-11.264-25.6-25.6-25.6h-512c-14.336 0-25.6 11.264-25.6 25.6s11.264 25.6 25.6 25.6zM257.024 652.288h512c14.336 0 25.6-11.264 25.6-25.6s-11.264-25.6-25.6-25.6h-512c-14.336 0-25.6 11.264-25.6 25.6s11.264 25.6 25.6 25.6zM794.624 773.12c0-14.336-11.264-25.6-25.6-25.6h-512c-14.336 0-25.6 11.264-25.6 25.6s11.264 25.6 25.6 25.6h512c14.336 0 25.6-11.264 25.6-25.6z"></path>
                            </svg>
                            <div>医疗服务记录</div>
                            
                        </div>
                        <div class="menuItem" @click="go('healthRecord')">
                            <svg viewBox="0 0 1024 1024" class="svgIcon" style="margin:4px;height:16px;">
                                <path d="M372.135 897.704h-130.753c-54.070 0-98.065-48.077-98.065-107.099v-557.224c0-59.010 43.994-107.099 98.065-107.099h588.374c54.064 0 98.071 48.088 98.071 107.099v53.625c0 17.74 14.652 32.141 32.693 32.141 18.042 0 32.681-14.401 32.681-32.141v-53.625c0-94.492-73.287-171.382-163.447-171.382h-588.373c-90.092 0-163.442 76.89-163.442 171.382v557.224c0 94.568 73.35 171.395 163.442 171.395h130.753c18.041 0 32.693-14.413 32.693-32.139 0-17.756-14.652-32.155-32.693-32.155zM241.382 319.148c-18.042 0-32.689 14.401-32.689 32.142s14.646 32.141 32.689 32.141h261.505c18.041 0 32.682-14.401 32.682-32.141s-14.641-32.142-32.682-32.142h-261.505zM470.194 544.141c0-17.742-14.64-32.142-32.681-32.142h-196.131c-18.042 0-32.689 14.401-32.689 32.142 0 17.74 14.646 32.141 32.689 32.141h196.129c18.042 0.001 32.682-14.401 32.682-32.141zM862.683 604.083c49.318-35.065 81.479-92.096 81.479-156.368 0-106.333-87.986-192.852-196.115-192.852-108.127 0-196.129 86.519-196.129 192.852 0 64.272 32.167 121.303 81.489 156.368-104.090 51.278-179.56 164.411-179.56 261.475 0 17.741 14.651 32.143 32.693 32.143 18.054 0 32.695-14.403 32.695-32.143 0-88.905 102.502-224.992 228.811-224.992s228.811 136.088 228.811 224.992c0 17.741 14.641 32.143 32.693 32.143 18.044 0 32.695-14.403 32.695-32.143 0-97.066-75.473-210.199-179.562-261.476zM748.046 576.285c-72.169 0-130.752-57.606-130.752-128.569 0-70.914 58.583-128.569 130.752-128.569s130.752 57.654 130.752 128.569c0 70.964-58.583 128.569-130.752 128.569z"></path>
                            </svg>
                            <div>健康档案</div>
                        </div>
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
                selected: 'home',
                menuAble:false,
            }
        },
        methods: {
            outMenu(){
                this.menuAble = false;
            },
            enterMenu(){
                this.menuAble = true;
            },
            go(url) {
                this.$router.push({
                    path: '/index/' + url
                })
                this.outMenu();
            }
        },
        watch: {
        },
        mounted() {
            let url = this.$router.currentRoute.path.split('/')[2];
            if(url){
                this.selected = url;
            }else{
                this.$router.push({
                    path: '/index/home'
                })
            }
        },
        created(){

        },
        computed:{
            pageTitle() {
                return this.$store.getters.pageTitle;
            },
            appUserInfo(){
                return this.$store.getters.getAppUserInfo;
            },
            backBtnHide(){
                return this.$store.getters.backBtnHide;
            }
        }
}
</script>
<style type="text/css">
.svgIcon{
    height:25px;
    width:auto;
    fill:#FFFFFF;
}
.menuItem{
    height:30px;
    line-height: 30px;
    border-bottom: 1px solid #666666;
    font-size: 12px;
    display: flex;
}
.list{
    color:#FFFFFF;
    padding-left:20px;
}
.pageMask{
    background: rgba(0,0,0,0.1);
}
.menuMask{
    display: flex;
}
.enterMenuBtn{
    position: absolute;
    right:0px;
    top:0px;
    height:100%;
    width:35px;
}
.body{
    height:calc(100% - 40px);
    overflow-y: auto;
}
.head{
    height:40px;
    width:100%;
    position: absolute;
    top:0px;
    left:0px;
}
.smallindow{
    height:100%;
    width:calc(100% - 200px);
    position: absolute;
    overflow: hidden;
}
.bigWindow{
    height:100%;
    width:calc(100% + 200px);
    position: absolute;
    overflow: hidden;
    left:0px;
    transition:left linear 0.3s;
}
.bigWindow.menuOut{
    left:-200px;
}
.outMenu{
    height:100%;
    width:200px;
    background: #4C4C4C;
    position: absolute;
    left:calc(100% - 200px);
    top:0px;
}
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
