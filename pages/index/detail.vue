<template>
	<view class="detail">
		 <view class="topimg">
			<swiper class="swiper topimg" :circular="true" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="item in goodsdetail.url.split(',')" >
					<image class="swiper-item topimg" :src="item"/>
				</swiper-item>
			</swiper>
		</view>
		<view class="title">
			<view class="name">{{goodsdetail.goodsName}}</view>
			<view class="desc">月销量：{{goodsdetail.amount}}</view>
		</view>
		<view  v-if="goodsId">
			<addbusketDetail :goodsId="goodsId"></addbusketDetail>
		</view>
	</view>
</template>

<script>
	import addbusketDetail from "@/mycomponents/addbusketdetail"
	export default {
		onLoad:function(option){
			console.log(option)
		},
		components:{
			addbusketDetail
		},
		data() {
			return {
				goodsId:this.$route.query.goodsId,
				goodsdetail:{}
			};
		},
		mounted(){
			this.getGoodsDetail()
		},
		methods:{
			getGoodsDetail(){
				this.http({
					url:"/api/app/v1/goods/getGoodsDetail",
					data:{goodsId:this.$route.query.goodsId},
					method:"get",
					success:res=>{
						if(res.success){
							this.goodsdetail = res.result
						}
					},
					fail:err=>{
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.detail{
	width:100%;
	.topimg{
		width:100%;
		height:750upx;
	}
	.title{
		padding:30upx;
		border-bottom:1upx solid #f0f0f0;
		.name{
			font-size: 28upx;
			color: #333333;
			font-weight:bold;
		}
		.desc{
			font-size: 24upx;
			color: #666666;
			margin-top:10upx;
		}
	}
}
</style>

