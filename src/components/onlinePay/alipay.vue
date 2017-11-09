<template>
	<div>
		<div v-if="!tipShow" class="help">
			<p>请点击右上角用外部浏览器打开支付！</p>
		</div>
		<div v-if="paySuccess">
			<p>支付成功！</p>
		</div>
		<div>
			<items  :model='model' v-for='model in treeData'></items>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {checkBrowser} from '@/util/util.js'

console.log(items)
	export default {
		data() {
			return {
				data: {},
				tipShow: true,
				paySuccess: false,
				treeData:[{
		                "id": "1",
		                "data": {
		                    "menuName": "项目管理",
		                    "menuCode": "",
		                },
		                "childTreeNode": [{
		                    "data": {
		                        "menuName": "项目",
		                        "menuCode": "BusProject",
		                    },
		                    "childTreeNode": [{
		                    	"data": {
		                    		"nemuName": "哈哈"
		                    	}
		                    }]
		                }, {
		                    "data": {
		                        "menuName": "我的任务",
		                        "menuCode": "BusProject",
		                    },
		                    "childTreeNode": []
		                }, {
		                    "data": {
		                        "menuName": "人员周报",
		                        "menuCode": "BusProject",
		                    },
		                    "childTreeNode": []
		                }]
		            }, {
		                "id": "2",
		                "data": {
		                    "menuName": "数据统计",
		                    "menuCode": "BusClock",
		                },
		                "childTreeNode": []
		            }]
			}
		},
		mounted() {
			// this.$nextTick(function(){
			// 	this.$store.commit('setPageTitle', '支付宝支付')
			// 	let param = this.$route.query;
			// 	if (param.data) {
			// 		this.data = JSON.parse(decodeURI(param.data));
			// 	}
			// 	this.checkLx();
			// })
		},
		components: {
			items
		},
		methods: {
			checkLx() {
				let lx = checkBrowser();
				if (lx == '1') {
					this.tipShow = false;
				} else if (lx == '2' || lx == '3') {
					this.tipShow = true;
					if (this.data.Trade_No) {
						this.startpay();
					} else {
						this.getResult();
					}			
				}
			},
			startpay() {
				let param = {
					id: this.data.id,
					returnurl: location.href+`?id=${this.data.id}`
				}
				this.api.getOnlinePay(param)
					.then(res => {
						if (res.code === '1') {
							location.href = res.data;
						}
					}, err => {
						this.$toast(err);
					})
			},
			getResult() {
				let timer = setInterval(() => {
					console.log(111)
				}, 3000);
			},
			polling() {
				
			}
		}
	}
</script>

<style type="text/css" scoped>
.help{padding: 100px 10px}
.help p{text-align: center}
</style>