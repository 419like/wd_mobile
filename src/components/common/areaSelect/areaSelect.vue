<template>
	<div class="address">
		<div class="title">
			<ul>
				<li @click="clearCheck(item, index)" v-for="(item,index) in titleList" :class="{active:index === titleList.length-1}">{{item.mc}}</li>
				<li @click="confirmXzqh">确认选择</li>
			</ul>
		</div>
		<div class="addList">
			<ul>
				<li @click="selectItem(item)" v-for="item in xzqhList">{{item.mc}}</li>
			</ul>
		</div>
		<wd-loading v-if="isLoading"></wd-loading>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['target','level','isInit','curxzqh'],
		data() {
			return {
				isLoading: false, // loading状态
				searchMaxLevel: '',  // 查询行政区划级最大级别
				titleList: [], // 已选中区划list
				xzqhList:[]  // 带选择区划列表list
			}
		},
		created() {
			this.searchMaxLevel = this.level || '5';
			if (this.isInit) {
				this.initXzqh(this.curxzqh);
			} else {
				this.xzqhList = this.dicData.province;
			}
		},
		methods: {
			async getNextXzqh(jb, dm) {
				if (jb > this.searchMaxLevel) return false;
				if (jb == '1' || jb =='') {
					this.xzqhList = this.dicData.province;
				} else {
					let url = '/020901/6';
					let params = {"jb":jb,"qhdm": dm};

			  		try {
						let result = await this.commonApi.fetch(url, params);
			  			this.isLoading = false;
			  			if (result.data.length) {
			  				this.xzqhList = result.data;
			  			}
			  		} catch(err) {
			  			this.isLoading = false;
			  			this.$messagebox(err);
			  		}
				}						
			},
			async initXzqh(dqxzqh) {
				let url, params;
				
				if (dqxzqh) {
					url = '/020901/10';
				 	params = {"dqxzqh": dqxzqh};
				} else {
					url = '/020901/7';
				 	params = {"jgid": this.$store.state.userInfo.jgid};
				}
		  		try {
					let result = await this.commonApi.fetch(url, params);
		  			this.isLoading = false;
		  			if (result.data.length) {
		  				this.titleList =  result.data;
		  				let length = this.titleList.length;
		  				if (length > 1) {
		  					this.getNextXzqh(this.titleList[length-1].jb, this.titleList[length-2].dm);
		  				} else {
		  					this.xzqhList = this.dicData.province;
		  				}	
		  			}
		  		} catch(err) {
		  			this.isLoading = false;
		  			this.$messagebox(err);
		  		}
			},
			clearCheck(item, index) {
				this.titleList = this.titleList.slice(0, index+1);
				let jb = item.jb;
				this.getNextXzqh(jb, item.sjid);
			},
			selectItem(item) {
				this.$set(this.titleList,item.jb-1,item);
				let jb = item.jb - '-1' + '';
				this.getNextXzqh(jb, item.dm);
			},
			confirmXzqh() {
				let result = [...this.target, this.titleList[this.titleList.length-1]];
				this.$emit("confirmXzqh", result);
			}
		}
	}
</script>
