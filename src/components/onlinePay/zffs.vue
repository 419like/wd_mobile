<template>
	<transition name="slide-fade">
	<div @click="closeWrap" class="zffs">
		<div v-show="show" class="zfChoose" @click.stop>
			<div class="zfxz">
				<label for="wx">微信支付</label><input v-model="picked" checked="1" id="wx" type="radio" name="zffs" value="1">
			</div>
			<div class="zfxz">
				<label for="zfb">支付宝支付</label><input v-model="picked" id="zfb" type="radio" name="zffs" value="2">
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
.slide-fade-enter-active .zfChoose{transition: 0.3s}
.slide-fade-enter .zfChoose{transform: translateY(200px);}

.zfChoose{position: fixed;bottom: 0;height: 200px;width:100%;background: #fff}
.zfChoose .zfxz{height: 40px;line-height: 40px;padding: 5 25px;}
.zfChoose .zfxz label{display: inline-block;height: 40px;width: 200px}
.zfChoose .zfxz:not(:last-child){border-bottom: 1px solid #ccc}
.zfChoose .zfxz input{float: right;height: 20px;width: 20px;vertical-align: middle;margin-top: 8px}
.zfChoose .btnwrap{width: 200px;margin: 20px auto}

</style>