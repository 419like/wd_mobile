<template>
	<div class="record-details">
		<div class="title">
			<h1>{{jldata.jgjc}}<span>({{jldata.no.slice(0,6)}})</span></h1>
			<p><span>{{jldata.jzzt}}</span>
				<span>{{jldata.no}}</span>
				<span>{{jldata.zxks}}</span>
				<span>{{jldata.ysxm}}</span>
			</p>
			<p>{{jldata.mzzd}}</p>
		</div>
		<div class="contain">
			<ul>
				<li @click="showFymx(item, index)" v-for="(item, index) in mxdata">
					<p><span>{{item.no}}</span>
						<span>{{item.kdbmmc}}</span>
						<span>{{item.kdrxm}}</span>
						<!-- <span>{{item.djlx}}</span> -->
						<span class="right amount">￥: {{item.ssje|formatAmount}}</span>
					</p>
					<div v-if="mxCheckList[index]">
						<ul v-if="item.djlx!='中草药'" @click.stop>
							<li v-if="item.mx" v-for="subItem in item.mx">
								<p><span>{{subItem.xmmc}}</span>
									<span class="right amount">￥:{{subItem.ssje|formatAmount}}</span>
									<span class="right quantity">{{subItem.sl+subItem.xmdw}}</span>
								</p>
							</li>
						</ul>
						<div class="zcy" v-if="item.djlx=='中草药'">
							<div class="zcy-item" v-for="subItem in item.mx">
								<span class="xmmc">{{subItem.xmmc}}</span>
								<span class="sldw">{{subItem.sl+subItem.xmdw}}</span>
							</div>
						</div>
						<p v-if="isNodata">未查询到任何记录！</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="footer">
			<span>万达信息股份有限公司 版权所有</span>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'mzRecordDetails',
		data() {
			return {
				jldata: null,
				mxdata: [],
				mxCheckList: [],
				isNodata: false,
			}
		},
		created() {
			this.jldata = JSON.parse(this.$route.query.data);
			this.loadMzfymx();
			let handerUser = this.$store.getters.getHandleUser
			this.$store.commit('setPageTitle',`门诊费用记录 - ${handerUser.hzxm}`);
		},
		methods: {
			showFymx(item, index) {
				this.$set(this.mxCheckList, index, !this.mxCheckList[index])
				if (item.mx && item.mx.length) return;
				let param = {
					id: item.id
				}
				item.mx = [];
				this.api.getMzfymx(param)
					.then(res => {
						item.mx.push(...res.data);
						this.$set(this.mxdata, index, item);
					})
			},
			loadMzfymx() {
				this.api.getMzfyjl({"ghid":this.jldata.id})
					.then(res => {
						if (res.code == 1) {
							if (res.data.length) {
								this.mxdata = res.data;
							} else {
								this.isNodata = true;
								this.mxdata = [];
								// this.$toast({message:'未查询到更多数据！',duration: 800});
							}
						} else {
							this.$toast({message:'查询失败！',duration: 800});
						}
						
					}, err => {this.$toast({message:'查询失败！',duration: 800})})
			}
		}
	}
</script>

<style type="text/css" scoped>
.right{float: right}
.record-details{position: relative}
h1{font-weight: normal;font-size: 16px;text-align: center;padding: 4px 0}
.title{border-bottom: 1px solid #ccc}
.title p{min-height: 16px;text-align: left;padding: 4px 2px 4px 10px;font-size: 14px}
.contain{min-height: calc(100% - 125px)}
.contain li{position: relative; padding: 2px 0 2px 2px; border-bottom: 1px solid #ccc;font-size: 14px}
.contain li p{min-height: 40px; line-height: 40px; padding:4px 10px 4px 5px}
.contain li span{margin-right: 2px}
.contain li ul li{border-bottom: 0;padding-left: 20px;color: #3dbbaa}
.contain .zcy{color: #3dbbaa }
.contain li ul li p{min-height: 20;height: 20px;line-height: 20px}
/*.contain li ul li:not(:last-child) p{border-bottom:1px solid #0271bc}*/
.footer{ width: 100%;height: 40px; line-height: 40px;background-color: #fff;text-align: center;}
.footer span{font-size: 14px;color: #0271bc;}
.quantity{display: inline-block;widows: 60px;}
.amount{display: inline-block;width: 80px;text-align: right}
.zcy-item{display: inline-block;width: 105px;}
.contain .zcy-item span{margin:0;}
.xmmc{display: inline-block;width: 60px}
.sldw{display: inline-block;width: 40px}
</style>