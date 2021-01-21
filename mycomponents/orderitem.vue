<template>
	<view class="orderitemdetail">

	<view class="title">
		<view class="orderNo"><text>领用单号：</text>
		{{item0.orderNo}}</view>
		<view class="detail">查看详情></view>
	</view>
	<view class="cont">
		<view class="item">
			<text>领用总数：</text>
		{{item0.num}}
		</view>
		<view class="item"><text>领用时间：</text>{{item0.time}}</view>
		<view class="item"><text>领用场地：</text> {{item0.area}}</view>
		<view class="item countTime"><view><text>领用状态：</text> {{item0.status}}</view>
		<view class="countTime">
			<text>倒计时：</text>
			12:31:08
		</view>
			
		</view>
	</view>
	</view>
</template>

<script>
	export default({
		props:{
			item0:{
				type:Object,
				default:{}
			}
		},
		data(){
			return{}
		}
	})
</script>
	
<style lang="less" scoped>
	.orderitemdetail{
		padding:0 30upx;
		font-size: 26upx;
		color: #666666;
		.title{
			height:90upx;
			display: flex;
			justify-content: space-between;
			line-height: 90upx;
			.detail{
				font-size: 28upx;
				color: #007CF9;
			}
			border-bottom:1px solid #ccc;
		}
		.cont{
			border-bottom:10upx solid #fafafa;
			padding:20upx 0;
			.item{
				margin-bottom:10upx;
				
				&.countTime{
					display: flex;
					justify-content: space-between;
				}
			}
			
		}
	}
</style>
