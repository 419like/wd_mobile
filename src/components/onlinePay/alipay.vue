<template>
	<div>
		<div v-if="tipShow" class="help">
			<p>请点击右上角用外部浏览器打开支付！</p>
		</div>
		<div class="contain">
		
		</div>
	</div>
</template>

<script type="text/javascript">
	import {checkBrowser} from '@/util/util.js'

	export default {
		data() {
			return {
				data: {},
				tipShow: false,
			}
		},
		mounted() {
			this.$store.commit('setPageTitle', '支付宝支付')
			let param = this.$route.params;
			if (param.data) {
				this.data = JSON.parse(decodeURI(param.data));
			}
			alert(param.data)
			this.checkLx();
		},
		methods: {
			checkLx() {
				let lx = checkBrowser();
				if (lx == '1') {
					this.tipShow = true;
				} else if (lx == '2') {
					this.startpay()
				}
			},
			startpay() {

			}
		}
	}
</script>

<style type="text/css" scoped>
.help{padding: 50px 10px}
.help p{text-align: center}
</style>