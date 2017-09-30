<template>
	<div class="mzfymx">
		<div class="title">
			<p>No:{{jldata.no}}&nbsp;&nbsp;{{jldata.kdbmmc}}&nbsp;&nbsp;{{jldata.kdrxm}}<span class="right">￥{{jldata.ssje|formatAmount}}</span></p>
			<p>{{jldata.lczd}}</p>
		</div>
		<div class="contain">
			<ul>
				<li  v-for="(item, index) in mxdata">
					<p>{{item.xmmc}}&nbsp;&nbsp;{{item.lx}}
						<span class="right">￥{{item.ssje|formatAmount}}</span>
						<span class="right">{{item.sl+item.xmdw}}&nbsp;&nbsp;</span>
					</p>
					<p>{{item.xmgg}}&nbsp;&nbsp;{{item.xmcd}}&nbsp;&nbsp;</p>
				</li>
			</ul>
		</div>
		<div class="footer">
			<span @click="toMain">返回</span>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'mzfymx',
		data() {
			return {
				jldata: null,
				mxdata: []
			}
		},
		created() {
			console.log(this.$route.params)
			this.jldata = this.$route.params.data;
			this.loadMzfymx();
		},
		methods: {
			loadMzfymx() {
				this.api.GetMzfymx({id:this.jldata.id}).then(res => {
					if (res.code == 1) this.mxdata = res.data;
					}, err => {});
			},
			toMain() {
				this.$router.push({'path':'/index/home'})
			}
		}
	}
</script>

<style type="text/css" scoped="">
.right{float: right}
.mzfymx{position: relative}
.title{border-bottom: 1px solid #ccc;padding-bottom: 10px}
.title p{min-height: 24px; line-height: 24px; padding:2px 4px;font-size: 14px;font-weight: bold}
.contain li{position: relative; padding: 2px 0 2px 2px; border-bottom: 1px solid #ccc;font-size: 14px}
.contain li p{min-height: 20px; line-height: 20px; margin-left: 10px; padding:1px 10px 1px 2px}
.footer{ width: 100%; margin-top: 35px;height: 40px; background-color: #fff;text-align: center;}
.footer span{font-size: 18px;color: #0271bc;padding: 10px}
</style>