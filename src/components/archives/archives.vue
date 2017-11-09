<template>
	<div>
		<div class="mesinfo">
			
		</div>
		<div class="list">
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'archives',
		data() {
			return {
				sfzh: ''
			}
		},
		created() {
			let handerUser = this.$store.getters.getHandleUser;
			this.sfzh = handerUser.sfzh;

			this.$store.commit('setPageTitle',`健康档案 - ${handerUser.hzxm}`);
			this.getPersonArchives()
		},
		methods: {
			getPersonArchives() {
				let param = {sfzh: this.sfzh};
				this.api.getPersonArchives(param)
					.then(res => {
						console.log(res)
					}, err => {

					})
			}
		}
	}
</script>

<style type="text/css" scoped>
	
</style>