<template>
    <div style="overflow-y:auto;">
        <div class="bigWindow" :class="{menuOut:menuAble}" style="min-height: 450px;">
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
                <div class="outMenu" style="position:relative;">
                    <div style="margin-bottom: 40px;margin-top:20px;">
                        <div style="text-align: center;margin-top:10px;margin-bottom:10px;">
                            <svg style="fill:#FFFFFF;" viewBox="0 0 1024 1024" width="40" height="40">
                                <path d="M947.2 1024 76.8 1024C34.133333 1024 0 989.866667 0 947.2c0-162.133333 119.466667-290.133333 281.6-307.2C341.333333 682.666667 426.666667 699.733333 512 699.733333c85.333333 0 170.666667-25.6 230.4-59.733333 153.6 17.066667 281.6 145.066667 281.6 307.2C1024 989.866667 989.866667 1024 947.2 1024zM512 571.733333c-145.066667 0-256-128-256-290.133333C256 128 366.933333 0 512 0c145.066667 0 256 128 256 290.133333C768 443.733333 657.066667 571.733333 512 571.733333z"></path>
                            </svg>
                        </div>
                        <div style="text-align:center;">
                            <mt-button @click="go('login')" v-if="!appUserInfo||!appUserInfo.userId" type="primary" style="height:25px;width:80px;font-size:15px;">登&nbsp;&nbsp;录</mt-button>
                            <span @click="go('personalCenter')" v-if="appUserInfo&&appUserInfo.userId" style="color:#fff;">{{appUserInfo.xm?appUserInfo.xm:'未录入'}}</span>
                        </div>
                    </div>
                    <div class="list">
                        <div class="menuItem" @click="go('personalCenter')">
                            <svg viewBox="0 0 1024 1024" class="svgIcon" style="margin:4px;margin-top:8px;height:16px;">
                                <path d="M792.494137 223.561929l-265.614739 0c-11.032275 0-3.704372 25.738223-3.704372 36.84213 0 11.09265 0.039909 4.007271 11.143816 4.007271l259.42066 0L792.494137 223.561929zM174.482068 499.712639l0 61.963299 295.260972 0 0-61.963299c0-48.400385-39.200853-87.599191-87.600215-87.599191l-120.069753 0C213.672688 412.112424 174.482068 451.312254 174.482068 499.712639zM546.523827 615.845728l-416.798148 0L129.72568 140.829586l747.33252 0-0.061398 286.313174c26.892514 6.983048 37.469417 21.437263 59.037664 42.307614 0.566912 0.576122 1.073449 1.143034 1.649571 1.721203L937.684036 149.999442c-0.070608-40.586411-32.985285-73.581929-73.511321-73.581929l-732.828163 0c-40.587434 0-64.605478 32.92491-64.605478 73.521554l0 468.06277c0 40.596644 24.018044 61.042322 64.605478 61.042322l410.58258 0L546.523827 615.845728zM426.10001 277.953777c0-57.711457-46.811189-104.523669-104.523669-104.523669-57.722714 0-104.533903 46.811189-104.533903 104.523669 0 57.731923 46.811189 104.532879 104.533903 104.532879C379.288821 382.486657 426.10001 335.746076 426.10001 277.953777zM924.658358 534.217535c-45.293624-43.836435-108.784721-46.244277-150.838554-5.526882l-29.624744 28.674092c-11.406806 11.032275-11.468204 29.048622-0.183172 40.150482 11.356664 11.164282 29.807916 11.22568 41.16458 0.132007l29.624744-28.674092c21.751418-21.062733 50.29248-12.368714 68.885972 5.647633 9.888218 9.575086 15.343468 22.31833 15.343468 35.839289 0 13.501515-5.455251 26.254993-15.343468 35.830079l-93.431019 90.324258c-42.692377 41.355938-62.732826 21.95301-71.30507 13.633522-11.417039-11.032275-29.868291-10.961667-41.16458 0.130983-11.345407 11.103907-11.285032 29.11923 0.132007 40.151505 19.594287 18.966999 41.983225 28.420311 65.465056 28.420311 28.724234 0 59.047897-14.078661 87.904137-42.054857l93.369621-90.323235c20.992124-20.303439 32.600521-47.389357 32.600521-76.183176C957.259903 581.594612 945.650483 554.570092 924.658358 534.217535zM700.68199 863.354069c-11.345407-11.042508-29.806893-11.103907-41.223931-0.070608l-23.78473 23.025436c-20.607361 19.919698-54.169791 19.919698-74.777152 0-9.898451-9.574062-15.353702-22.32754-15.353702-35.839289 0-13.573147 5.455251-26.264203 15.353702-35.839289l87.529606-84.675603c18.13812-17.570185 52.256207-43.38004 77.124619-19.351763 11.417039 11.103907 29.878524 10.98111 41.235188-0.12075 11.34643-11.093674 11.224657-29.108997-0.132007-40.151505-42.307614-40.910799-104.785636-33.360839-159.209207 19.281155l-87.529606 84.685836c-20.992124 20.354604-32.540146 47.378101-32.540146 76.172943s11.548022 45.486006 32.600521 65.779211c21.629645 20.940959 49.989581 31.335714 78.399659 31.335714 28.420311 0 56.831413-10.394755 78.400683-31.397112l23.78473-23.016226C711.978279 882.128687 712.048887 874.44672 700.68199 863.354069zM792.494137 325.696176l-265.614739 0c-11.032275 0-3.704372 25.738223-3.704372 36.84213 0 11.09265 0.039909 3.997038 11.143816 3.997038l259.42066 0L792.494137 325.696176zM523.174003 468.862996c0 11.102883 0.039909 4.007271 11.143816 4.007271l259.42066 0-1.244342-40.839168-265.614739 0C515.8461 432.031099 523.174003 457.770345 523.174003 468.862996z" p-id="3595"></path>
                            </svg>
                            <div>
                                就诊人-{{handleUser.hzxm?handleUser.hzxm:'未绑定'}}
                            </div>
                        </div>
                        <div class="menuItem" @click="go('home')">
                            <svg viewBox="0 0 1024 1024" class="svgIcon">
                                <path d="M793.431919 526.002424l19.730101-19.717172L515.542626 208.665859l-0.530101 0.530101-1.111919-1.111919L215.195152 506.789495l19.794747 19.794747 46.105859-46.105859L281.095758 787.393939l0.005172 0 27.998384 0 121.355636 0 28.003556 0 0-28.003556L458.458505 544.694303l112.015515 0 0 214.696081L570.47402 787.393939l28.003556 0 121.346586 0 28.004848 0 0.001293 0 0-28.003556L747.830303 759.390384 747.830303 480.400808 793.431919 526.002424zM719.825455 759.390384l-121.346586 0L598.478869 544.694303l0-28.003556-28.003556 0L458.459798 516.690747l-28.003556 0 0 28.003556 0 214.696081L309.100606 759.390384 309.100606 452.473535 514.495354 247.078788l205.330101 205.317172L719.825455 759.390384z"></path>
                            </svg>
                            <div>
                                首&nbsp;&nbsp;&nbsp;&nbsp;页
                            </div>
                        </div>
                        <div class="menuItem" @click="go('medicalRecord')">
                            <svg viewBox="0 0 1024 1024" class="svgIcon" style="margin:4px;height:16px;">
                                <path d="M926.208 784.896V236.544c0-98.816-80.384-179.2-179.2-179.2H276.992c-98.816 0-179.2 80.384-179.2 179.2v550.912c0 98.816 80.384 179.2 179.2 179.2h473.088c47.104 0 93.184-19.968 126.464-54.272 33.792-35.328 51.2-80.384 49.664-127.488z m-777.728 3.072V236.544c0-70.656 57.344-128 128-128h23.04v42.496c0 39.424 32.256 71.68 71.68 71.68h282.624c39.424 0 71.68-32.256 71.68-71.68v-42.496h20.48c70.656 0 128 57.344 128 128v549.376c2.048 33.28-10.24 66.048-34.816 91.136-23.552 24.576-56.32 38.912-89.6 38.912H276.48c-70.656 0-128-57.344-128-128zM675.328 151.04c0 9.728-7.68 20.48-20.48 20.48H372.224c-9.728 0-20.48-7.68-20.48-20.48v-42.496h323.584v42.496z" p-id="2277"></path>
                                <path d="M257.024 357.376h512c14.336 0 25.6-11.264 25.6-25.6s-11.264-25.6-25.6-25.6h-512c-14.336 0-25.6 11.264-25.6 25.6s11.264 25.6 25.6 25.6zM257.024 503.296h512c14.336 0 25.6-11.264 25.6-25.6s-11.264-25.6-25.6-25.6h-512c-14.336 0-25.6 11.264-25.6 25.6s11.264 25.6 25.6 25.6zM257.024 652.288h512c14.336 0 25.6-11.264 25.6-25.6s-11.264-25.6-25.6-25.6h-512c-14.336 0-25.6 11.264-25.6 25.6s11.264 25.6 25.6 25.6zM794.624 773.12c0-14.336-11.264-25.6-25.6-25.6h-512c-14.336 0-25.6 11.264-25.6 25.6s11.264 25.6 25.6 25.6h512c14.336 0 25.6-11.264 25.6-25.6z"></path>
                            </svg>
                            <div>就诊记录查询</div>
                        </div>
                        <div class="menuItem" @click="goAppointment()">
                            <svg viewBox="0 0 1024 1024" class="svgIcon" style="margin:4px;margin-top:8px;height:16px;">
                                <path d="M1009.28515625 761.4558410644529H128.42333984375006c-30.255688476562497 0-38.29833984374999-23.438534545898438-38.29833984374999-53.655908203124994V164.04071350097655C90.125 133.785107421875 114.63593750000001 109.274169921875 144.89154357910155 109.274169921875h174.67849731445312v75.71576843261718H193.26272583007807a27.383312988281247 27.383312988281247 0 0 0-27.383312988281247 27.383312988281247v407.1876525878906c0 15.127844238281249 12.25546875 27.383312988281247 27.383312988281247 27.383312988281247h751.5661926269532c15.127844238281249 0 27.383312988281247-12.25546875 27.383312988281247-27.383312988281247V212.37316894531256a27.383312988281247 27.383312988281247 0 0 0-27.383312988281247-27.383312988281247h-126.34579467773436V109.274169921875h173.10800170898438c30.255688476562497 0 54.76654357910156 24.5109375 54.76654357910156 54.76654357910156v543.7589721679688c-0.03829833984375 30.217373657226563-6.817096252441406 53.655908203124994-37.07276000976563 53.655908203124994Zm-612.7726135253906 38.29833984374999h344.68505859375v76.59659729003907h38.29833984374999v38.29833984374999H358.21337890625v-38.29833984374999h38.29833984374999v-76.59659729003907Z" p-id="1462"></path>
                                <path d="M758.8520812988281 567.6669006347656H377.6690673828125s-65.64325561523438 3.676640625-58.481515502929696-10.761849975585937c0 0 31.710992431640626-102.25607299804688 84.40960693359374-155.06954956054688 34.698229980468746-34.73654479980469 80.23493957519531 0 80.23493957519531 0s5.3617593383789055 12.676766967773437 65.2603546142578 13.825717163085937h38.29833984374999c59.89858703613281-1.1106518554687501 72.4220947265625-13.825717163085937 72.4220947265625-13.825717163085937s40.74941711425782-34.73654479980469 75.48596191406249 0c42.62601928710937 42.70264892578125 82.03499450683594 155.60595703125 82.41806030273438 153.95883178710935 3.6000439453125 18.383203125-58.175161743164054 9.153286743164063-58.8644989013672 11.8724853515625Zm-191.1851806640625-188.54269409179688c-72.11574096679686 0-130.48214721679688-61.54538269042969-130.48214721679688-137.52960205078125C437.1839294433594 165.57264709472656 495.5509948730469 109.274169921875 567.6669006347656 109.274169921875s130.5208740234375 56.29847717285158 130.5208740234375 132.32043457031247c0 75.98380737304687-58.404885864257814 137.52960205078125-130.5208740234375 137.52960205078125Z" p-id="1463"></path>
                            </svg>
                            <div>在线挂号</div>
                        </div>
                        <div class="menuItem" @click="toOnlinePay()">
                            <svg viewBox="0 0 1024 1024" class="svgIcon" style="margin:4px;margin-top: 8px;height:16px;">
                                <path d="M967.232 816.704H739.84c-4.672 0-9.344 1.28-13.44 3.648l-213.952 127.68H191.936c-29.824 0-54.144-24.384-54.144-54.208v-20.032c0-29.888 24.32-54.272 54.144-54.272h156.608c2.752 11.264 8.384 21.568 16.704 30.016l6.656 6.656c12.48 12.48 28.928 18.752 45.312 18.752 15.808 0 31.616-5.76 43.904-17.344l179.008-136.448a26.27 26.27 0 0 0 4.992-36.864c-8.832-11.584-25.344-13.824-36.8-4.928L428.096 816.768l-2.624 2.304c-4.544 4.48-11.904 4.416-16.32 0.064l-6.656-6.656c-3.008-2.944-3.392-6.464-3.392-8.192s0.384-5.184 3.2-7.936l283.008-277.568h281.984c14.528 0 26.304-11.776 26.304-26.24 0-14.592-11.84-26.368-26.304-26.368H872.96c1.472-14.528 2.496-29.12 2.496-43.584C875.456 189.504 685.888 0 452.992 0 219.968 0 30.464 189.504 30.464 422.528c0 83.648 34.112 210.304 97.408 280.192 5.184 5.76 12.288 8.704 19.52 8.704 6.272 0 12.544-2.24 17.6-6.784 10.752-9.664 11.584-26.304 1.92-37.184-51.776-57.216-83.84-171.648-83.84-244.928 0-204.032 166.016-369.984 369.984-369.984 204.032 0 369.92 165.952 369.92 369.984 0 14.528-1.152 29.12-2.88 43.584h-144c-6.592 0-12.288 2.688-16.96 6.656-2.048 1.216-4.224 2.176-6.016 3.968L365.312 758.912c-2.56 2.56-4.672 5.312-6.72 8.128H191.936c-58.816 0-106.752 47.872-106.752 106.816v20.032c0 58.752 47.936 106.688 106.752 106.688H519.808c4.736 0 9.344-1.344 13.44-3.712l213.888-127.488h220.096c14.528 0 26.304-11.904 26.304-26.368s-11.776-26.304-26.304-26.304zM325.12 454.272c-14.528 0-26.24 11.776-26.24 26.304 0 14.528 11.712 26.304 26.24 26.304h95.232v66.56c0 14.528 11.776 26.24 26.24 26.24 14.528 0 26.368-11.776 26.368-26.24v-66.56h95.168c14.528 0 26.368-11.776 26.368-26.304 0-14.592-11.84-26.304-26.368-26.304H472.96v-46.72h95.168c14.528 0 26.368-11.776 26.368-26.304 0-14.464-11.84-26.304-26.368-26.304h-52.672l46.208-96c6.272-13.056 0.832-28.736-12.288-35.072-13.056-6.208-28.8-0.768-35.2 12.352l-57.088 118.72h-27.776l-57.088-118.72c-6.336-13.12-22.016-18.56-35.136-12.288-13.12 6.336-18.624 22.016-12.288 35.072l46.144 96H325.12c-14.528 0-26.24 11.84-26.24 26.304 0 14.528 11.712 26.304 26.24 26.304h95.232v46.656H325.12z"></path>
                            </svg>
                            <div>在线缴费</div>
                        </div>
                    </div>
                    <div style="text-align:center;position:absolute;bottom: 10px;width:100%;" @click="loginOut()">
                        <mt-button v-if="appUserInfo&&appUserInfo.userId" type="primary" style="height:25px;width:80px;font-size:15px;">注&nbsp;&nbsp;销</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { getUrlParams, checkBrowser }  from '@/util/util.js'

export default {
    data() {
        return {
            selected: 'home',
            menuAble: false,
            appUserInfo: {},
            handleUser:[],
            // pageTitle:'',
            // backBtnHide:'',
        }
    },
    methods: {
        loginOut() {
            this.outMenu();
            this.$store.commit('loginOut');
            // eventHub.$emit('loginStateChanged');
            this.$emit('loginoutEvent');
            // this.$router.push({
            //     path: '/'
            // })
        },
        goAppointment() {
            this.outMenu();
            if (this.$store.getters.getCurrentHis.id) {
                this.$router.push({
                    path: '/index/appointment',
                    query: {
                        jgid: this.$store.getters.getCurrentHis.id
                    }
                })
            } else {
                this.$toast('请选择就诊医院。');
            }
            this.$store.commit('setBackBtn', false);
        },
        toOnlinePay() {
            this.outMenu();
            if (!this.$store.getters.getCurrentHis.id) {
                this.$toast('请选择就诊医院。');
                return;
            }
            let state = this.$store.getters.loginState;
            if (state) {
                this.$router.push({ path: '/index/onlinePay', query: { jgid: this.$store.getters.getCurrentHis.id } });
            } else {
                this.$router.push({ path: '/index/login' });
            }
            this.$store.commit('setBackBtn', false);

        },
        outMenu() {
            this.menuAble = false;
            this.init();
        },
        enterMenu() {
            this.menuAble = true;
            this.init();
        },
        go(url) {
            this.outMenu();
            if (url == 'home') {
                if (this.$store.getters.getEnterMode == 1) {
                    this.$router.push({
                        name: 'hospitalPage',
                        query: {
                            id: this.$store.getters.getCurrentHis.id,
                            dyms: 1
                        }
                    })
                    return;
                }
            }
            this.$router.push({
                path: '/index/' + url
            })
        },
        init() {
            this.appUserInfo = JSON.parse(window.localStorage.getItem("appUserInfo"));
            this.handleUser = this.$store.getters.getHandleUser;
            // this.pageTitle = this.$store.getters.pageTitle;
            // this.backBtnHide = this.$store.getters.backBtnHide
            console.log(this.appUserInfo);
            

        },
        getCode(jgid) {
            this.api.GetAppId({ "jgid": this.$store.getters.getCurrentHis.id })
                .then(res => {
                    
                    console.log(res);
                    if (res.code === '1') {
                        if (res.data.length && res.data[0].appid) {
                            this.requestCode(res.data[0].appid);
                        } else {
                            this.$messagebox('此机构未开通微信公众号支付')
                        }
                    } else {
                        this.$toast('系统异常')
                    }
                }, err => {})
        },
        requestCode(appid) {
            let redirect_uri = encodeURIComponent(location.href);
            let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
            location.href = url;
        },
        getOpenidByCode(code) {
            let params = {
                code: code,
                jgid: this.$store.getters.getCurrentHis.id,
            }
            this.api.getOpenid(params)
                .then(
                    res => {
                        if (res.code == 1) {
                            let openid = res.data;
                            this.$store.commit('setOpenid', openid);
                            this.loginByOpenid(openid);
                        } else {
                            this.$toast(res.msg);
                        }
                    }
                )
        },
        loginByOpenid(openid) {
            
            let params = {
                bsh: openid,
                lx: '2',
            }
            this.api.searchOpenid(params)
                .then(
                    res => {
                        
                        if (res.code == 1) {
                            // 已注册用户登录成功
                            let loginObj = {
                                userId: res.appid,
                                userNum: res.appuser[0].sjh,
                            }
                            if (res.user) {
                                this.$store.commit('setBoundList', res.user);
                                for (var i = res.user.length - 1; i >= 0; i--) {
                                    if (res.user[i].gxmc == '本人') {
                                        this.$store.commit('setHandleUser', res.user[i]);
                                        break;
                                    }
                                }
                            }
                            // this.$toast('登录成功！');
                            res.appuser[0].userId = loginObj.userId;
                            res.appuser[0].userNum = loginObj.userNum;
                            this.$store.commit('setAppUserInfo', res.appuser[0]);
                            this.$router.push({
                                name: 'home'
                            });
                        } else {
                            // 未注册用户
                            this.$messagebox.confirm('', {
                                message: '你尚未绑定账号，是否去登录？',
                                title: '提示',
                                confirmButtonText: '是',
                                cancelButtonText: '否'
                            }).then(() => {
                                this.$router.push({
                                    name: 'login'
                                })
                            });
                        }
                    }
                )
        },
        checkCode() {
            if (location.search) {
                let code = location.search.split('&')[0].split('=')[1];
                this.getOpenidByCode(code);
            } else {
                this.getCode();
            }
        }
    },
    watch: {

    },
    mounted() {
        this.init();
        // eventHub.$on('loginStateChanged',()=>{console.log('loginStateChanged');this.init();});
        this.$on('loginoutEvent',()=>{console.log('loginoutEvent');this.init();});
        console.log(this.$store.getters.getCurrentHis.id);
        if (checkBrowser() == 1) {
            let openid = this.$store.getters.getOpenId;
            
            if (openid) {
                // 根据openid直接登录
                this.loginByOpenid(openid);
            } else {
                // 获取openid
                this.checkCode();
            }
        }

        // this.$store.commit('setOpenid', 'oTlDMwq0hTBLeCQTaTLtyLOtyBEg');
        // this.loginByOpenid('oTlDMwq0hTBLeCQTaTLtyLOtyBEg');
    },
    created() {

    },
    computed: {
        pageTitle() {
            return this.$store.getters.pageTitle;
        },
        backBtnHide() {
            return this.$store.getters.backBtnHide;
        },
        // handleUser() {
        //     return this.$store.getters.getHandleUser;
        // },
        // appUserInfo(){
        //     return this.$store.getters.getAppUserInfo;
        // },
    }
}

</script>
<style type="text/css">
.svgIcon {
    height: 25px;
    width: auto;
    fill: #FFFFFF;
}

.menuItem {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #666666;
    font-size: 12px;
    display: flex;
}

.list {
    color: #FFFFFF;
    padding-left: 20px;
}

.pageMask {
    background: rgba(0, 0, 0, 0.1);
}

.menuMask {
    display: flex;
}

.enterMenuBtn {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    width: 35px;
}

.body {
    height: calc(100% - 40px);
    overflow-y: auto;
}

.head {
    height: 40px;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
}

.smallindow {
    height: 100%;
    width: calc(100% - 200px);
    position: absolute;
    overflow: hidden;
}

.bigWindow {
    height: 100%;
    width: calc(100% + 200px);
    position: absolute;
    overflow: hidden;
    left: 0px;
    transition: left linear 0.3s;
}

.bigWindow.menuOut {
    left: -200px;
}

.outMenu {
    height: 100%;
    width: 200px;
    background: #4C4C4C;
    position: absolute;
    left: calc(100% - 200px);
    top: 0px;
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
