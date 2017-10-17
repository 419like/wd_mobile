<template>
	<div class="record-details">
		<div class="title">
			<h1>{{jldata.jgjc}}<span>({{jldata.no.slice(0,6)}})</span></h1>
			<p><span>{{jldata.jzzt}}</span>
				<span>No:{{jldata.no}}</span>
				<span>{{jldata.zxks}}</span>
				<span>{{jldata.ysxm}}</span>
			</p>
			<p>{{jldata.mzzd}}</p>
		</div>
		<div class="contain">
			<ul>
				<li  v-for="(item, index) in mxdata">
					<p><span>{{item.no.slice(-4)}}</span>
						<span>{{item.xmmc}}</span>
						<span class="right">￥: {{item.ssje|formatAmount}}</span>
						<span class="right">{{item.sl+item.xmdw}}</span>
					</p>
					<p><span>{{item.xh}}</span>
						<span>{{item.xmgg}}</span>
						<span>{{item.xmcd}}</span>
						
					</p>
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
		name: 'recordDetails',
		data() {
			return {
				jldata: null,
				mxdata: []
			}
		},
		created() {
			this.jldata = JSON.parse(this.$route.query.data);
			this.loadMzfymx();
		},
		methods: {
			loadMzfymx() {
				this.api.getMzfyAll({"ghid":this.jldata.id})
					.then(res => {
						if (res.data.length) {
							this.mxdata = res.data;
						} else {
							this.$toast({message:'未查询到更多数据！',duration: 800});
						}
					}, err => {this.$toast({message:'未查询到更多数据！',duration: 800})})
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
.contain li p{min-height: 20px; line-height: 20px; margin-left: 10px; padding:1px 10px 1px 2px}
.contain li span{margin-right: 2px}
.footer{ width: 100%;height: 40px; line-height: 40px;background-color: #fff;text-align: center;}
.footer span{font-size: 14px;color: #0271bc;}
</style>