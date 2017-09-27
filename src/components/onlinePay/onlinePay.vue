<template>
	<div class="onlinepay">
		<div class="title">
			<ul>
				<li @click="changeCheck(item, index)" :class="{current: navCheckList[index]}"
				 v-for="(item, index) in navList">{{item.mc}}</li>
			</ul>
		</div>
		<div class="contain">	
			<div class="cfjf margin48" v-if="navCheckList[0]">
				<ul>
					<li @click="showCfDetail(item)" v-for="(item, index) in djfList">
						<div  @click.stop="selectFyjl(item, index)" class="cfjl-circle-wrap left">
							<span class="circle" :class="{checked: djfCheckList[index]}"></span>
						</div>
						<p>No:{{item.no}}&nbsp;&nbsp;{{item.lx}}<span class="right">￥{{item.ssje}}</span></p>
						<p>{{item.kdbmmc}}&nbsp;&nbsp;{{item.kdrxm}}&nbsp;&nbsp;{{item.lczd}}</p>
					</li>
				</ul>
				<div class="footer">
					<div class="detail">
					<span @click="checkAll" class="circle" :class="{checked:iscffyAllCheck}">
					</span><span  @click="checkAll" class="ckall">全选</span>
					共选择<span class="cfnum">{{xfcount}}</span>张处方 <span class="totalCost">￥{{jfzje|formatAmount}}</span>
					</div>
					<div class="btn-wrap">
						<button class="mint-button mint-button--primary mint-button--large green" @click="confirmCfjf()">
	                    	<label class="mint-button-text font18">确认缴费</label>
	                	</button>
					</div>
				</div>		
			</div>
			<div class="waitpay margin48" v-if="navCheckList[1]">
				<ul>
					<li @click="selectDzfjl(item, index)" v-for="(item, index) in dzfList">
						<span class="circle" :class="{checked: dzfCheckList[index]}">
						</span>
						<p class="p1"><span id="tradeNo">订单号:{{item.out_trade_no}}</span><span class="right">￥{{item.je}}</span></p>
						<p class="p2">日期:{{item.date}}<span class="right">状态: {{item.zt}}</span></p>
						<ul  @click.stop>
							<li v-if="item.mxxx" v-for="subItem in item.mxxx">
								<p>No:{{subItem.no}}&nbsp;&nbsp;{{subItem.lx}}<span class="right">￥{{subItem.je}}</span></p>
								<p>{{subItem.zxks}}&nbsp;&nbsp;{{subItem.ysxm}}&nbsp;&nbsp;{{subItem.zz}}</p>
							</li>
						</ul>
					</li>
				</ul>
				<div class="footer">
					<div class="btn-wrap">
						<div>
							<button class="mint-button mint-button--primary mint-button--large green" @click="cancleDd()">
	                    	<label class="mint-button-text">取消订单</label>
	                		</button>
						</div>
						<div>
							<button class="mint-button mint-button--primary mint-button--large green" @click="confirmDd()">
	                    	<label class="mint-button-text">确认缴费</label>
	                		</button>
						</div>
					</div>
				</div>
			</div>
			<div class="record margin48" v-if="navCheckList[2]">
				<mt-loadmore :autoFill=false :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				  	<ul>
					    <li @click="showDdxx(item, index)" v-for="(item, index) in zflList">
							<p class="p1">订单号:{{item.no}}<span class="right">￥{{item.je}}</span></p>
							<p class="p2">日期:{{item.date}}<span class="right">方式: {{item.fs}}</span></p>
							<ul @click.stop v-if="zfjlCheckList[index]">
								<li v-if="item.mx" v-for="subItem in item.mx">
									<p>No:{{subItem.no}}&nbsp;&nbsp;{{subItem.lx}}<span class="right">￥{{subItem.je}}</span></p>
									<p>{{subItem.zxks}}&nbsp;&nbsp;{{subItem.ysxm}}&nbsp;&nbsp;{{subItem.zz}}</p>
								</li>
							</ul>
						</li>
				  	</ul>
			  	</mt-loadmore>
  				<div v-if="isAllLoad" class="loadmore-tip">
			  		<!-- ------无更多记录------ -->
			  	</div>
			</div>
			<div class="abnormal margin48" v-if="navCheckList[3]">
				<p class="warn-tip">已支付成功但医院处理失败的记录，请点击退费</p>
				<ul>
					<li @click="selectYcjl(item, index)" v-for="(item, index) in ycjlList">
						<span class="circle" :class="{checked: ycjlCheckList[index]}">
						</span>
						<p class="p1">订单号:{{item.no}}<span class="right">￥{{item.je}}</span></p>
						<p class="p2">日期:{{item.date}}<span class="right">方式:{{item.fs}}</span></p>
						<ul  @click.stop>
							<li v-if="item.mx" v-for="subItem in item.mx">
								<p>No:{{subItem.no}}&nbsp;&nbsp;{{subItem.lx}}<span class="right">￥{{subItem.je}}</span></p>
								<p>{{subItem.zxks}}&nbsp;&nbsp;{{subItem.ysxm}}&nbsp;&nbsp;{{subItem.zz}}</p>
							</li>
						</ul>
					</li>
				</ul>
				<div class="footer">
					<div class="btn-wrap">
						<button class="mint-button mint-button--primary mint-button--large green" @click="confirmYctf()">
                    		<label class="mint-button-text">退 费</label>
                		</button>
					</div>
				</div>
			</div>
			<zffs v-if="chooseZffsShow" @confirmZffs="selectZffs"></zffs>
		</div>
	</div>
</template>

<script>
	import zffs from './zffs.vue';
	import {checkBrowser} from '@/util/util.js'

	export default {
		name: 'onlinePay',
		data() {
			return {
				jgid: '',
				isAllLoad: false,
				allLoaded: false, // 是否下拉加载完毕
				iscffyAllCheck: false, // 处方费用是否已全选
				chooseZffsShow: false,
				navList: [{"mc":"待缴费"},{"mc":"待支付"},{"mc":"支付记录"},{"mc":"异常处理"}],
				navCheckList:[true, false, false, false],
				/*待缴费*/
				djfList: [],
				djfCheckList: [],
				/*待支付*/
				dzfList: [],
				dzfCheckList: [],
				/*支付记录*/
				zflList: [{"no":"3432473487324324","je":"48.08","fs":"微信","date":"2017-09-21",
				mx:[{"no":"201708230001","lx":"西药","je":"25.00","zxks":"全科","ysxm":"敬和荣","zz":"流行性感冒"},{"no":"201708230001","lx":"西药","je":"23.08","zxks":"全科","ysxm":"敬和荣","zz":"流行性感冒"}]},{"no":"3432473487324324","je":"25.00","fs":"支付宝","date":"2017-09-21",
				mx:[{"no":"201708230001","lx":"西药","je":"25.00","zxks":"全科","ysxm":"敬和荣","zz":"流行性感冒"}]},{"no":"3432473487324324","je":"48.08","fs":"微信","date":"2017-09-21",
				mx:[{"no":"201708230001","lx":"西药","je":"25.00","zxks":"全科","ysxm":"敬和荣","zz":"流行性感冒"},{"no":"201708230001","lx":"西药","je":"23.08","zxks":"全科","ysxm":"敬和荣","zz":"流行性感冒"}]},{"no":"3432473487324324","je":"25.00","fs":"支付宝","date":"2017-09-21",
				mx:[{"no":"201708230001","lx":"西药","je":"25.00","zxks":"全科","ysxm":"敬和荣","zz":"流行性感冒"}]}],
				zfjlCheckList: [true,false,false,false],
				/*异常记录*/
				ycjlList: [{"no":"3432473487324324","je":"48.08","fs":"微信","date":"2017-09-19"},
				{"no":"3432473487324324","je":"20.00","fs":"支付宝","date":"2017-09-21"},
				{"no":"3432473487324324","je":"48.08","fs":"微信","date":"2017-09-18"}],
				ycjlCheckList: [],
	
			}
		},
		created() {
			this.jgid = this.$route.query.jgid
			let appUserInfo = this.$store.getters.getAppUserInfo;
			this.$store.commit('setPageTitle',`医疗服务记录 -- ${appUserInfo.xm}`);
			let hzid = this.$store.state.hzid;
			this.loadCffyxx();
		},
		computed: {
			/*处方缴费总金额*/
			jfzje: function() {
				let zje = 0;
				this.djfCheckList.forEach((v, i) => {
					if (v) {
						zje += +this.djfList[i].ssje
					}
				});
				return zje;
			},
			/*处方张数*/
			xfcount: function() {
				let count = 0;
				this.djfCheckList.forEach((v, i) => {
					if (v) {
						count++;
					}
				});
				if (count === this.djfList.length) this.iscffyAllCheck = true;
					else this.iscffyAllCheck = false;
				return count;
			}
		},
		methods: {
			sendDdqq(a) {
				this.hzid = '1423292'
				this.jgid = '70'
				if (!this.hzid) {
					this.$messagebox('未绑定患者！');
					return;
				}
				let arr = [];
				this.djfCheckList.forEach((v,i) => {
					if (v) {
						arr.push({"hjid":this.djfList[i].id,"no":this.djfList[i].no});
					}
				})
				let mxxx = [{
					"jgid": this.jgid,
					"brid": this.hzid,
					"zffs": a,
					"total_fee": this.jfzje+'',
					"mxxx": arr,
				}];
				let param = {
					id: '',
					jlxx: mxxx
				}
				console.log(param);
				this.api.cfzfJf(param)
				.then(res => {
					console.log(res)
					if (res.code == '1') {
						alert('订单号:'+res.djxx[0].Trade_No)
					}
				}, err => {})
			},
			selectZffs(a) {
				!a && (this.chooseZffsShow = false);
				if (a) {
					if (a == '1') {
						this.sendDdqq(a);
					} else if (a == '2') { // 选择支付宝方式支付
						var o = {"mc":"hadf","dm":"2131","xm":"张三"};
						let data  = encodeURI(JSON.stringify(o))
						this.$router.push({name:'alipay', params: {"data":data}})
					}
					this.chooseZffsShow = false;
				}
			},
			// 加载处方缴费信息
			loadCffyxx() {
				let param = {
					hzid: '1423292',
					dqjgid: '70'
				};
				this.api.GetCffy(param).then(res => {
					if (res.code == 1) this.djfList = res.data;
					}, err => {})
			},
			// 加载待支付信息
			loadDzfxx() {
				let param = {
					brid: '1423292',
					jgid: '70'
				};
				this.api.GetDzfjl(param).then(res => {
				if (res.code == 1)  this.dzfList = res.dzfxx;
				}, err => {})
			},
			// 加载支付记录信息
			loadZfjlxx() {

			},
			// 加载异常订单
			loadYcxx() {

			},
			// 展示处方详情
			showCfDetail(item) {
				this.$router.push({name: 'mzfymx', params: {data: item}});
				this.$store.commit('setPageTitle', '门诊费用明细');
			},
			// 导航nav切换
			changeCheck(item, index) {
				this.navCheckList = [];
				this.navCheckList[index] = true;
				if (index === 0) {
					this.loadCffyxx();
				} else if (index === 1) {
					this.loadDzfxx();
				}
			},
			// 处方费用选择
			selectFyjl(item, index) {
				if (this.djfCheckList[index]) {
					this.$set(this.djfCheckList, index, false);
				} else {
					this.$set(this.djfCheckList, index, true);
				}
			},
			// 待支付记录选择
			selectDzfjl(item, index) {
				if (this.dzfCheckList[index]) {
					this.$set(this.dzfCheckList, index, false);
				} else {
					this.dzfCheckList = [];
					this.$set(this.dzfCheckList, index, true);
				}
			},
			selectYcjl(item, index) {
				if (this.ycjlCheckList[index]) {
					this.$set(this.ycjlCheckList, index, false);
				} else {
					this.ycjlCheckList = [];
					this.$set(this.ycjlCheckList, index, true);
				}
			},
			// 处方费用全选 
			checkAll() {
				if (this.iscffyAllCheck) {
					this.iscffyAllCheck = false;
					this.djfCheckList = [];
				} else {
					this.iscffyAllCheck = true;
					let arr = new Array(this.djfList.length);
					this.djfCheckList = arr.fill(true);
				}
			},
			// 处方缴费确认
			confirmCfjf() {
				if (this.jfzje != '0') {
					this.chooseZffsShow = true;
				} else {
					this.$messagebox('未选择任何费用')
				}			
			},
			// 待支付取消订单
			cancleDd() {
				let checkOne = this.dzfCheckList.some(v => v==true);
				if (!checkOne) return;
			},
			// 待支付确认缴费
			confirmDd() {
				let ckIndex = this.dzfCheckList.findIndex(v => v==true);
				if (ckIndex === -1) return;
				if (this.dzfList[ckIndex] !== '待支付') return;
				let Daje = this.dzfList[ckIndex].je;
			},
			// 异常记录确认退费
			confirmYctf() {
				let ckIndex = this.ycjlCheckList.findIndex(v => v==true);
				if (ckIndex === -1) return;
				alert(1)
			},
			// load更多支付记录
			loadZfjl() {

			},
			// 上拉加载
			loadBottom() {
				this.$refs.loadmore.onBottomLoaded();
				this.isAllLoad = true;
			},	
			// 展开关闭支付记录详情
			showDdxx(item, index) {
				// this.zfjlCheckList[index] = !this.zfjlCheckList[index];
				this.$set(this.zfjlCheckList, index, !this.zfjlCheckList[index]);
			}
		},
		components:{
			zffs
		},
	}
</script>

<style type="text/css" scoped>
.onlinepay{position: relative;font-family: Microsoft YaHei}
.onlinepay ul{list-style: none}
.margin48{margin-top: 48px}
.left{float:left}
.right{float: right}
.p1{font-size: 16px; font-weight:bold}
.p2{font-size: 14px; font-weight: bold}
.circle{display: inline-block; position: absolute; left: 5px; top: 14px; height:18px; width:18px; border:1px solid #ccc; border-radius: 10px}
.circle:after{border: 2px solid transparent; border-left: 0; border-top: 0; content: ""; top: 3px; left: 6px; position: absolute; width: 4px; height: 8px; border-color: #fff; transform: rotate(45deg) scale(0); -webkit-transition: -webkit-transform 0.2s; transition: -webkit-transform 0.2s; transition: transform 0.2s}
.checked{background-color: #26a2ff}
.checked:after{transform: rotate(45deg) scale(1)}


/* title导航样式 */
.title{position: fixed; top: 39px; width: 100%; background: #fff; z-index: 2}
.title ul {border-bottom: 1px solid #ccc} 
.title .current {border-bottom: 3px solid #3399ff}
.title li {display: inline-block; width:25%; height: 45px; line-height: 45px; font-size:18px; text-align: center}

/* 处方待缴费记录 */
.cfjl-circle-wrap{position: absolute;top: 1px;width: 45px;height: 65px}
.cfjl-circle-wrap .circle{top: 20px;left: 8px}
.cfjf {padding-bottom: 100px}
.cfjf li{position: relative; padding: 5px 0 5px 2px; border-bottom: 1px solid #ccc;font-size: 14px}
.cfjf li p{height: 24px; line-height: 24px; margin-left: 40px; padding:2px 4px}
.cfjf li p:last-child{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.cfjf .footer{position: fixed; width: 100%; bottom: 0; height: 100px; background-color: #fff}
.cfjf .btn-wrap{width: 200px; margin: 0 auto 5px} 
.ckall{margin-left: 28px; margin-right: 10px}
.cfnum{color: red}
.detail{height: 40px; line-height: 40px; padding: 2px 0 8px; padding-left:10px; border-top: 1px solid #ccc}
.totalCost{color: red; font-size:18px;  margin-left: 10px}

/* 待支付 */
.waitpay .footer{position: fixed; width: 100%;bottom: 0; height: 50px;background-color: #fff} 
.waitpay .btn-wrap{width: 100%; text-align: center}
.waitpay .btn-wrap div{display: inline-block;width:100px;padding: 0 15px}
.waitpay{padding-bottom: 50px}
.waitpay li{position: relative; padding: 10px 0 2px 2px; border-bottom: 1px solid #ccc}
.waitpay li p{box-sizing: border-box; height: 24px; line-height: 24px; margin-left: 30px; padding:2px 4px}
/*.watipay li p .tradeNo{display: inline-block;width: 120px;white-space: nowrap;overflow:hidden;text-overflow: ellipsis;}*/
#tradeNo {display: inline-block;width: 180px;white-space: nowrap;overflow:hidden;text-overflow: ellipsis;}
.waitpay li ul{margin-top:10px; font-size:14px}
.waitpay li ul li{border-bottom:0;border-top: 1px solid #ccc;padding:0}

/* 支付记录 */
.record li{position: relative; padding: 10px 0 0px 2px; border-bottom: 1px solid #ccc}
.record li p{height: 24px; line-height: 24px; margin-left: 5px; padding:2px 4px}
.record li ul{font-size:14px}
.record li ul li{border-bottom:0;border-top: 1px solid #ccc;padding:0;font-weight: normal}
.record li ul li p{box-sizing: border-box; height: 24px; line-height: 24px; margin-left: 35px; padding:2px 4px}
.record .loadmore-tip{height: 45px;line-height: 45px;text-align: center;}

/* 异常处理 */
.abnormal{padding-bottom: 50px}
.abnormal .footer{position: fixed; width: 100%;bottom: 0; height: 50px; background-color: #fff}
.abnormal .btn-wrap{width: 200px;margin: 0 auto 5px}
.abnormal li{position: relative; padding: 10px 0 10px 2px; border-bottom: 1px solid #ccc}
.abnormal li p{box-sizing: border-box; height: 24px; line-height: 24px; margin-left: 35px; padding:2px 4px}
.abnormal .warn-tip{color:red;padding: 2px 5px}
</style>