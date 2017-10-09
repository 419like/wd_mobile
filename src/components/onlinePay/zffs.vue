<template>
	<transition name="slide-fade">
	<div @click="closeWrap" class="zffs">
		<div v-show="show" class="zfChoose" @click.stop>
			<div class="zfxz">
				
				<label for="wx">
					<span class="icon_wx"></span>
					微信支付
					<input v-model="picked"  id="wx" type="radio" name="zffs" value="1">
				</label>
			</div>
			<div class="zfxz">
				<label for="zfb">
					<span class="icon_alipay"></span>
					支付宝支付 
					<input v-model="picked" id="zfb" type="radio" name="zffs" value="2">
				</label>
				
			</div>
			<div class="btnwrap">
				<button @click="selectZffs" class="mint-button mint-button--primary mint-button--large green">
            		<label class="mint-button-text">确认选择</label>
        		</button>
			</div>	
		</div>
	</div>
	</transition>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				picked: '1',
				show: true
			}
		},
		mounted(){
			// this.show = true;
		},
		methods: {
			closeWrap() {
				this.$emit('confirmZffs', '');
			},
			selectZffs() {
				this.$emit('confirmZffs', this.picked);
			}
		}
	}
</script>
<style type="text/css" scoped>
/*d6d6d6*/
.zffs{position: fixed;top: 0;z-index: 5;height: 100%;width: 100%;background: rgba(0,0,0,0.4)}
.slide-fade-enter-active{transition:0.2s}  
/*.slide-fade-enter{height: 0}*/
.slide-fade-enter-active .zfChoose{transition: 0.1s ease-in}
.slide-fade-enter .zfChoose{transform: translateY(200px);}

.zfChoose{position: fixed;bottom: 0;height: 200px;width:100%;background: #fff}
.zfChoose .zfxz{height: 40px;line-height: 40px;padding: 5px 25px 5px 25px;}
.zfChoose .zfxz span{position: absolute;display: inline-block;width: 32px;height: 32px;top: 4px;left: 0}
.zfChoose .zfxz label{ position: relative;display: inline-block;height: 40px;width: 90%;padding-left: 40px}
.zfChoose .zfxz:not(:last-child){border-bottom: 1px solid #ccc}
.zfChoose .zfxz input{float: right;height: 20px;width: 20px;vertical-align: middle;margin-top: 8px;}
.zfChoose .btnwrap{width: 200px;margin: 20px auto}

.icon_wx{background-image:url(../../../static/img/wxpay.png); background-repeat:no-repeat; background-size:100% 100%}
.icon_alipay{background-image:url(../../../static/img/alipay.png); background-repeat:no-repeat; background-size:100% 100%}

</style>