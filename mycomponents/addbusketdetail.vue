<template>
	<view class="addbusketDetail">
		<view class="type">
			<view class="gray">选择规格：</view>
			<view class="list">
				<view  v-for="(item,index) in guige" class="item"  :class="choseGuige.id==item.id?'active':''" @click="choseGuige=item">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="detail">
			<view v-for="(item,index) in choseGuige.skuList" class="item">
				<text class="gray">{{item.name}}:</text>
				<text class="value">{{item.value}}</text>
			</view>
			<view  class="item">
			<text class="gray">价格：{{choseGuige.price}}</text>
			</view>
			<view  class="item">
			<text class="gray">库存：{{Number(choseGuige.showCount)>choseGuige.num ? choseGuige.num:"库存充足"}}</text>
			<text class="value">起领量：{{choseGuige.beginCount}}</text>
			</view>
		</view>
		<view class="bottom">
			<uni-number-box :value="parseInt(choseGuige.beginCount)"  :min="0"  :step="parseInt(choseGuige.beginCount)" @change="monitorNumber"></uni-number-box>
			<view class="keyMoney" v-if="showKeyMoney">个人余额：￥8 <view class="instro"></view></view>
			<view class="btnwrap" @click="addBusket" v-if="showPrise" ><view class="btn">加入篮中</view></view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		props:{
			goodsId:{
				type:String,
				default:""
			},
			storeId:{
				type:String,
				default:""
			},
			showKeyMoney:{
				type:Boolean,
				default:true
			}
		},
		 components: {uniNumberBox},
		mounted(){
			this.init()
		},
		data() {
			return {
				carPrice:0,
				showPrise:true,
				goodsDetail:{},
				choseGuige:{},
				guige:[],
				goodsNumber:0,
			};
		},
		methods:{
			
			monitorNumber(e){
				  
				  this.goodsNumber = Number(e);
				  console.log(this.goodsNumber);
				if(e==0){
					this.showPrise=false
				}else{
					this.showPrise=true
				}
			},
			
			//加入购物篮
			addBusket(){
				// window.localStorage.setItem(key,value);//设置指定key的数据（JSON格式） // 保存数据，以键值对的方式储存信息。
				// window.localStorage.getItem(key);//获取指定key的数据  // 获取数据，将键值传入，即可获取到对应的value值。
				// window.localStorage.removeItem(key);//删除指定key的数据  // 删除单个数据，根据键值移除对应的信息。
				// window.localStorage.clear();//清空所有的存储数据  // 删除所有的数据
				let busket =JSON.parse(localStorage.getItem("busket"))
				console.log("goodsDetail:",this.goodsDetail)
				if(busket && busket.length){
					let arr = busket
					for(let i=0;i<arr.length;i++){
						let item = arr[i]
			
						if(item.id==this.goodsDetail.id) {
							console.log("0")
							if(item.choseGuige.id == this.choseGuige.id){
								console.log("1")
								let count = item.goodsNumber + this.goodsNumber
								item.goodsNumber = count >this.choseGuige.num?this.choseGuige.num:count;
								busket[i] = item
							}else{
								busket.push({...this.goodsDetail,goodsNumber:this.goodsNumber,choseGuige:this.choseGuige})
							}
							localStorage.setItem("busket",JSON.stringify(busket))
							break;
						}else{
							if(i==(busket.length-1)){
								busket.push({...this.goodsDetail,goodsNumber:this.goodsNumber,choseGuige:this.choseGuige})
								localStorage.setItem("busket",JSON.stringify(busket))
							}
						}
					}
				}else{
					console.log("shoucijiaru")
					localStorage.setItem("busket",JSON.stringify([{...this.goodsDetail,goodsNumber:this.goodsNumber,choseGuige:this.choseGuige}]))
				}
				this.initCarPrice();
				this.$emit("func",this.carPrice)
				uni.showToast({
					title:"加入成功"
				})
			},
			
			initCarPrice(){
				this.carPrice=0;
				let goodslist=JSON.parse(localStorage.getItem("busket")) || [];
				 let carCount=goodslist.length;
				if(carCount!=0){
					for(let item of goodslist){
						this.carPrice+=item.choseGuige.price * item.goodsNumber
					}
					var num=this.carPrice;
					this.carPrice=num.toFixed(2);
				}
			},
			
			
			
			
			
			
			
			init(){
				this.getGoodsDetail();
			},
			//获取商品详情
			getGoodsDetail(){
				this.http({
					url:"/api/app/v1/goods/getGoodsDetail",
					data:{goodsId:this.goodsId,storeId:this.storeId},
					method:"get",
					success:res=>{
						if(res.success){
							this.goodsDetail = res.result;
							console.log("详情：",res.result)
							 if(res.result.skuList){
								this.guige=res.result.skuList
								this.choseGuige = res.result.skuList[0]
							 }
							  
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
@import "~@/assets/css/public.less";
.addbusketDetail{
	padding:30upx;
	font-size:26upx;
	color:#333;
	background:#fff;
	
	.gray{
		color:#666;
	}
	.type{
		.list{
			display:flex;
			flex-wrap:wrap;
			padding-top:30upx;
			.item{
				padding:12upx 30upx;
				border-radius:60upx;
				margin-right:30upx;
				margin-bottom:30upx;
				border:1upx solid #ccc;
				white-space:nowrap;
				&.active{
					background: #007CF9;
					border: 1px solid #007CF9;
					color:#fff;
				}
			}
		}
	}
	.detail{
		display:flex;
		flex-wrap:wrap;
		.item{
			width:50%;
			padding-bottom:30upx;
			.value{
				padding-left:30upx;
			}
		}
	}
	.bottom{
		display:flex;
		padding-top:30upx ;
		align-items:center;
		.keyMoney{
			margin-left:10upx;
			display:flex;
			align-items:center;
		}
		.instro{
			margin-left:10upx;
			width:25upx;
			height:25upx;
			.bg-image("~@/assets/img/说明")
		}
		.btnwrap{
			flex:1;
			.btn{
				float:right;
				width:200upx;
				padding: 14upx 0;
				background: #007CF9;
				border-radius: 4px;
				border-radius: 4px;
				color:#fff;
				text-align:center;
			}
		}
	}
}
</style>