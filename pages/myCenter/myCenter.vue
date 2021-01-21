<template>
	<view class="myCenter">
		<view class="title">
			<image :src="info.image" class=" image margin-right"></image>
			<view class="name margin-right">{{info.name}}</view>
			<view class="line margin-right">|</view>
			<view class="depart margin-right">{{info.depart}}</view>
		</view>
		<view class="cont">
			<view class="sub">
				<view class="money item">
					<view class="left">
						<view class="img"></view>余额
					</view>
					<view class="right">8.6</view>
					</view>
				<view class="departmoney item">
					<view class="left">
						<view class="img"></view>
						部门余额
					</view>
					<view class="right">58.8</view></view>
			</view>
		</view>
		<view class="list">
			<view class="item" @click="pushTo(1)">
				<text>订单列表</text>
				<view class="icon"></view>
			</view>
			<view class="item" @click="pushTo(2)">
				<text>意见反馈</text>
				<view class="icon"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					image:require("@/assets/img/fake/1.jpg"),
					name:"小美妞",
					depart:"运营事业部"
				}
			};
		},
		methods:{
			pushTo(item){
				if(item==1){
					uni.navigateTo({
						url:"/pages/myCenter/orderlist"
					})
				}else if(item == 2){
					uni.navigateTo({
						url:"/pages/myCenter/feedback"
					})
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
@import "~@/assets/css/public.less";
.myCenter{
	.title{
		background: #007CF9;
		height:240upx;
		display: flex;
		align-items: center;
		color:#fff;
		font-weight: bold;
		padding:0 30upx;
		.image{
			height:140upx;
			width:140upx;
			border-radius: 100%;
		}
		.margin-right{
			margin-right:30upx;
		}
	}
	.cont{
		background:#fff;
		border-radius: 20upx;
		margin-top:-30upx;
		padding-top:10upx;
		.sub{
			display: flex;
			padding:0 30upx;
			.item{
				background: #F6F8FA;
				border-radius: 20upx;
				height:104upx;
				padding:0 20upx;
				flex:1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
				}
				.img{
					width:48upx;
					height:48upx;
				}
				&.money{
					margin-right:30upx;
					.img{
						.bg-image('~@/assets/img/余额')
					}	
				}
				&.departmoney{
					.img{
						.bg-image('~@/assets/img/部门余额')
					}	
				}
				}
			}
			
		}
		.list{
			padding:30upx;
			.item{
				height:100upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom:1px solid #f0f0f0;
				.icon{
					width:18upx;
					height:32upx;
					.bg-image("~@/assets/img/查看")
				}
			}
		}
	}
	
</style>
