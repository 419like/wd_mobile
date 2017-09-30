<template>
	<div>
		<div v-if="!tipShow" class="help">
			<p>请点击右上角用外部浏览器打开支付！</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {checkBrowser} from '@/util/util.js'

	export default {
		data() {
			return {
				data: {},
				tipShow: true
			}
		},
		mounted() {
			this.$nextTick(function(){
				this.$store.commit('setPageTitle', '支付宝支付')
				let param = this.$route.query;
				if (param.data) {
					this.data = JSON.parse(decodeURI(param.data));
				}
				this.checkLx();
			})
		},
		methods: {
			checkLx() {
				let lx = checkBrowser();
				if (lx == '1') {
					this.tipShow = false;
				} else if (lx == '2' || lx == '3') {
					this.tipShow = true;
					this.startpay()
				}
			},
			startpay() {

			}
		}
	}
</script>

<style type="text/css" scoped>
.help{padding: 100px 10px}
.help p{text-align: center}
</style>