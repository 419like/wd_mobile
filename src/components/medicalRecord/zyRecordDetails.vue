<template>
	<div class="record-details">
		<div  class="contain">
			<div ref="title" class="title">
				<h1>{{jldata.jgjc}}<span>({{duration}})</span></h1>
				<p><span>No:{{jldata.zyh}}</span>
					<span>{{jldata.ryksmc}}</span>
					<span>{{jldata.zyysxm}}</span>
				</p>
				<p>{{jldata.zd}}</p>
			</div>
			<ul ref="ulList">
				<li  v-for="(item, index) in mxdata">
					<p><span>{{item.no.slice(-4)}}</span>
						<span>{{item.xmmc}}</span>
						<span class="right">￥: {{item.ssje|formatAmount}}</span>
						<span class="right">{{item.sl+item.xmdw}}</span>
					</p>
					<p><!-- <span>{{item.xh}}</span> -->
						<span>{{item.xmgg}}</span>
						<span>{{item.xmcd}}</span>
						
					</p>
				</li>
			</ul>
			<p v-if="isNodata">未查询到任何记录！</p>
			<div class="footer">
                <span @click="choosePre" class="preday">前一天</span>
                <span class="curdate">{{curdate}}</span>
                <span @click="chooseNext" class="nextday">后一天</span>
            </div>
		</div>
		<!-- <div class="footer">
			<span>万达信息股份有限公司 版权所有</span>
		</div> -->
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'zyRecordDetails',
		data() {
			return {
                minDate: '',
                maxDate: '',
                curdate: '',
                duration: '',
				jldata: null,
				mxdata: [],
				isNodata: false,
			}
		},
		created() {
			this.jldata = JSON.parse(this.$route.query.data);
			this.init();
		},
		mounted() {
			this.$nextTick(function(){
				this.$refs.ulList.style.height = this.$refs.title.parentNode.offsetHeight - this.$refs.title.offsetHeight - 52 +'px';
			})
		},
		methods: {
			init() {
				let handerUser = this.$store.getters.getHandleUser
				this.$store.commit('setPageTitle',`住院费用记录 - ${handerUser.hzxm}`);
				this.brid = handerUser.hzid;
				this.minDate = this.jldata.rysj;
				this.maxDate = this.jldata.cysj?this.jldata.cysj:new Date();
				this.curdate = this.jldata.rysj;
				this.duration = this.getDuration();
				this.loadFyjlmx();
			},
			getDuration() {
				let a = this.jldata.rysj.replace(/-/g, '');
				let b = this.jldata.cysj?this.jldata.cysj.replace(/-/g, '') : '在院';
				return `${a}~${b}`;
			},
			loadFyjlmx() {
				let params = {
					brid: this.brid,
					dqrq: this.curdate
				};
				this.api.getZyfyOneDay(params)
					.then(res => {
						if (res.code == 1) {
							if (res.data.length) {
								this.mxdata = res.data;
							} else {
								this.isNodata = true;
								// this.$toast({message:'未查询到更多数据！',duration: 800});
								this.mxdata = [];
							}
						} else {
							this.$toast({message:'查询失败！',duration: 800})
						}					
					}, err => {this.$toast({message:'查询失败！',duration: 800})})
			},
			checkDateLimit(a) {
                // -1 前一天  1 后一天
                if (a === '-1') {
                    return new Date(this.curdate) - new Date(this.minDate) > 0
                } else if (a === '1') {
                    return new Date(this.maxDate) - new Date(this.curdate)  > 0
                }
            },
            FillTwo(n) {
                return n < 10 ? '0' + n : n;
            },
            setCurDate(a) {
                let d = new Date(this.curdate); 
                d.setDate(d.getDate() + a); 
                let m = d.getMonth() + 1; 
                this.curdate =  d.getFullYear() + '-' + this.FillTwo(m) + '-' + this.FillTwo(d.getDate()); 
            },
            choosePre() {
                if (this.checkDateLimit('-1')) {
                    this.setCurDate(-1);
                    this.loadFyjlmx();
                } else {
                    this.$toast({message:'已是第一天',duration: 800})
                }
            },
            chooseNext() {
                if (this.checkDateLimit('1')) {
                    this.setCurDate(1);
                    this.loadFyjlmx();
                } else {
                    this.$toast({message:'已是最后一天',duration: 800})
                }
            }
		}
	}
</script>

<style type="text/css" scoped>
.right{float: right}
.record-details{height:100%;}
h1{font-weight: normal;font-size: 16px;text-align: center;padding: 4px 0}
.title{border-bottom: 1px solid #ccc}
.title p{min-height: 16px;text-align: left;padding: 4px 2px 4px 10px;font-size: 14px}

.contain li{position: relative; padding: 2px 0 2px 2px; border-bottom: 1px solid #ccc;font-size: 14px}
.contain{height: calc(100% - 40px);position: relative;}
.contain li p{min-height: 20px; line-height: 20px; margin-left: 10px; padding:1px 10px 1px 2px}
.contain li span{margin-right: 2px}

.contain .footer{position:absolute;bottom: 0;text-align: center;height: 52px;width: 100%;line-height: 52px}
.contain .footer span{display: inline-block;float: left;box-sizing: border-box}
/*.contain ul {height: calc(100% - 92px);overflow-y: scroll;padding-bottom: 52px}*/
.contain ul{padding-bottom: 52px;overflow: scroll;}
.contain .preday{width:30%;background: #fc9}
.contain .nextday{width:30%;background: #cf9}
.contain .curdate{width:40%;background: #9c9}
.pay{background: #ccc}
</style>