
<script>
	export default {
		globalData:{
			name:12,
			port:"http://127.0.0.1:8888"
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function(options) {
			console.log('App Show')
			console.log(options)
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
/* 	@import "/wxcomponents/vant/common/index.wxss"; */
	
	/*每个页面公共css */
</style>
