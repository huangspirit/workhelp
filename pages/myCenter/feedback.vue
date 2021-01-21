<template>
	<view class="feedback">
		<view class="title">意见反馈</view>
		<view class="wrap">
			<textarea maxlength="100"
			class="textarea" 
			v-model="content"
			 placeholder-style="color:#999999" 
			placeholder="开始你的吐槽吧" />
			<view class="showshort" :class="content?'active':''">
				<text v-if="content.length">{{content.length}}/100</text> 
				<text v-else class="nocont">文字限制100个字</text>
			</view>
		</view>
		 <view class="btn">
			 <button class="button" :class="content?'':'disabled'"type="default" @click="addFeedBack" :disabled="content.length==0">反馈</button>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:""
			};
		},
		methods:{
			addFeedBack(){
				console.log("12234")
			}
		}
	}
</script>

<style lang="less" scoped>
	.feedback{
		padding:30upx;
		box-sizing: border-box;
		.title{
			margin-bottom:20upx;
		}
		.textarea{
			background: #F6F8FA;
			border-radius: 16upx;
			padding:22upx;
			width:100%;
			box-sizing: border-box;
		}
		.wrap{
			position: relative;
			.showshort{
				position: absolute;
				bottom:20upx;
				right:20upx;
				.nocont{
					color:#999;
				}
			}
		}
		.btn{
			position: fixed;
			bottom:40upx;
			width:100%;
			left:0upx;
			padding:0 30upx;
			box-sizing: border-box;
		}
		.button{
			height:84upx;
			line-height: 84upx;
			background: #007CF9;
			color:#fff;
			border-radius: 48upx;
			&.disabled{
				background: #AAABB3;
			}
		}
		
	}
</style>
