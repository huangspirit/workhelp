<template>
	<view class="busket">
		<view class="area" >
			<view class="text">{{defaultArea.name}}</view>
			<view class="icon">
				<view class="areaIcon"></view>
			</view>
			<view @click="edit">{{isEditting?'完成':'编辑'}}</view>
		</view>
		<view class="goodslist">
			<view v-for="(item,index) in goodslist" class="item">
				<view class="selectIcon readonly" v-if="item.choseGuige.num<1"></view>
				<view class="selectIcon" v-else :class="item.selected?'active':''" @click="changeSelect(index)"></view>
				<view class="imgwrap">
					<image :src="item.url.split(',')[0]" class="img"></image>
				</view>
				<view class="detail">
					<view class="name">{{item.goodsName}}</view>
					<view class="num">
						<view class="start">起始添加量：{{item.choseGuige.beginCount}}</view>
						<text>{{Number(item.choseGuige.showCount)>item.choseGuige.num ? item.choseGuige.num:"库存充足"}}</text>
						
					</view>
					<view class="desc">{{item.readonly?"":item.choseGuige.title}}</view>
					<view v-if="item.choseGuige.num<1" class="oper">
						<text>重新选择</text>
						<view class="selectBtn" @click.stop="openpop('addbusket',item)" >
							<text>请选择</text>
							<view class="icon"></view>
						</view>
					</view>
					<view v-else class="oper">
						<text class="price">￥{{item.choseGuige.price}}</text>
						<view class="btn">
							<uni-number-box :value="item.goodsNumber" :min="Number(item.choseGuige.beginCount)" :max="item.choseGuige.num" :step="Number(item.choseGuige.beginCount)" @change="monitorNumber($event,item,index)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="!isEditting">
			<view>总计：<text class="money" >￥{{carPrice}}</text></view>
			<view class="keyMoney">个人余额：￥8 <view class="instro"></view></view>
			<view class="btnwrap" @click="buyHandler"><view class="btn">领取</view></view>
		</view>
		<view class="bottom" v-if="isEditting">
			<view  @click="changeAllCheck" class="allcheck">
				<view class="selectIcon" :class="isAllcheck?'active':''"></view>
				全选
				</view>
		
			<view class="btnwrap" @click="clearCart">
				<view class="btn">删除</view>
				</view>
		</view>
		<uni-popup ref="addbusket" type="bottom" @change="changepop">
			<view class="addbusket">
				<view class="title">
					<image class="img" :src="addBusketItem.url.split(',')[0]" v-if="addBusketItem.url"></image>
					<view class="name">{{addBusketItem.goodsName}}</view>
					<view class="close" @click="closePop"></view>
				</view>
				<addbusketDetail :showKeyMoney="false" :goodsId='addBusketItem.id' :storeId="addBusketItem.storeId"></addbusketDetail>
			</view>
		</uni-popup>
		<!-- <uni-popup ref="cart" type="bottom" @change="changepop">
			<view class="workArea">
				<view class="title">
					<view class="close" @click="closePop"></view>
					<view class="name">总计：3.89</view>
					<view class="subtitle">
						<view>商品列表</view>
						<view class="clearCart">
							<text class="deleteicon"></text>
							清空购物车
						</view>
					</view>
				</view>
				
				<view class="goodslist">
				<view v-for="item in selectGoods" class="item">
					<view class="name">{{item.name}}</view>
					<view class="sub">
						<text class="desc">{{item.color}}</text>
						<text class="price">￥{{item.price}}</text>
						<view class="count">
							<uni-number-box :min="0" :max="9" :step="1"></uni-number-box>
						</view>
					</view>
				</view>
				</view>
			</view>
		</uni-popup> -->
		<uni-popup ref="buyRes" type="center">
			<view class="buyRes">
				<view class="title">温馨提示</view>
				<view class="cont">您的订单已经提交成功，请在【orderExpireTime】之前到指定地点【address】领取，领取时间为【timeRange】过期将进行自动退货处理。</view>
				<view class="btnwrap" @click="closePop">
					知道了
				</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import addbusketDetail from "@/mycomponents/addbusketdetail"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {uniNumberBox,addbusketDetail},
		data() {
			return {
				carPrice:0,
				isAllcheck:false,
				isEditting:false,
				popName:"",
				addBusketItem:{},
				defaultArea:{name:"望京职场"},
				goodslist:[]
			};
		},
		onShow(){
			this.init()
		},
		watch:{
			goodslist:{
				handler:function(val){
					console.log("111111")
					localStorage.setItem("busket",JSON.stringify(val))
				},
				deep:true
			}
		},
		methods:{
			
			
			monitorNumber(e,item,index){
				  if(e!=item.goodsNumber){
					  let items=item;
					  items.goodsNumber=e;
					 this.goodslist.splice(index, 1);
					 this.goodslist.splice(index,0,items);
				     localStorage.setItem("busket",JSON.stringify(this.goodslist))
					 this.initCarPrice();
				  }  
			},
			//删除
			clearCart(){
				let arr = [];
				this.goodslist.forEach(item=>{
					if(!item.selected){
						arr.push(item)
					}
				})
				this.$nextTick(()=>{
					this.goodslist = arr;
					this.isEditting = false;
				})
				
			},
			//全选
			changeAllCheck(){
				this.isAllcheck = !this.isAllcheck;
				this.goodslist = this.goodslist.map(item=>{
					item.selected = this.isAllcheck;
					return item
				})
			},
			//全删
			deleteall(){
				this.goodslist = []
				localStorage.removeItem("busket")
				 this.initCarPrice();
			},
			//删除物品
			delete(index){
				// window.localStorage.setItem(key,value);//设置指定key的数据（JSON格式） // 保存数据，以键值对的方式储存信息。
				// window.localStorage.getItem(key);//获取指定key的数据  // 获取数据，将键值传入，即可获取到对应的value值。
				// window.localStorage.removeItem(key);//删除指定key的数据  // 删除单个数据，根据键值移除对应的信息。
				this.goodslist.splice(index,1);
				localStorage.setItem("busket",JSON.stringify(this.goodslist))
				this.initCarPrice();
			},
			init(){
				//获取购物篮列表
				this.initCarPrice();
			},
			
			initCarPrice(){
				this.carPrice=0;
				this.goodslist=JSON.parse(localStorage.getItem("busket")) || [];
				 let carCount=this.goodslist.length;
				if(carCount!=0){
					for(let item of this.goodslist){
						this.carPrice+=item.choseGuige.price * item.goodsNumber
					}
					var num=this.carPrice;
					this.carPrice=num.toFixed(2);
				}
			},
			changeSelect(index){
			 this.goodslist.splice(index,1,{...this.goodslist[index],selected:!this.goodslist[index].selected},)
			},
			edit(){
				this.isEditting=!this.isEditting
			},
			buyHandler(){
				//status 表示购买结果0:正常，1：超出部门限额2：正常余额不足3：库存不足
				let status = 0
				if(status==0){
					this.openpop("buyRes",null,true)
				}else if(status==1){
					uni.showToast({
						icon:"none",
						title:"超出部门限额"
					})
				}
				else if(status==2){
					uni.showToast({
						icon:"none",
						title:"正常余额不足"
					})
				}
				else if(status==3){
					uni.showToast({
						icon:"none",
						title:"库存不足"
					})
				}
				
			},
			openpop(name,item,showBottom){
				console.log("showbottom:",showBottom)
				this.popName = name;
				if(name=="addbusket"){
					//加入购物篮
					console.log("加入购物篮:",item)
					this.addBusketItem = item;
				}
				this.$refs[name].open()
				if(!showBottom){
					setTimeout(function(){
						uni.hideTabBar({})
					},50)
				}
				
			},
			closePop(){
				//关闭弹框
				this.$refs[this.popName].close()
			
			},
			changepop(e){
				//监控弹框状态
				console.log(e)
				if(!e.show){
					uni.showTabBar({})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "~@/assets/css/public.less";
.busket{
	.selectIcon{
		width:30upx;
		height:30upx;
		border:1upx solid #ccc;
		margin-right:20upx;
		border-radius:30upx;
		&.readonly{
			background:#f0f0f0;
		}
		&.active{
			.bg-image("~@/assets/img/选中");
			border-color:#fff;
		}
	}
	.buyRes{
		background:#fff;
		width:440upx;
		padding:30upx;
		border-radius:20upx;
		font-size:28upx;
		.title{
			text-align:center;
			font-weight:bold;
			
		}
		.cont{
			padding:30upx 0;
		}
		.btnwrap{
			background: #007CF9;
			border-radius: 30upx;
			color:#fff;
			height:60upx;
			line-height:60upx;
			text-align:center;
		}
	}
	.addbusket{
		background:#fff;
		border-top-left-radius:20upx;
		border-top-right-radius:20upx;
		.title{
			display:flex;
			align-items:center;
			padding:30upx;
			border-bottom:1upx solid #f0f0f0;
			.img{
				width:80upx;
				height:80upx;
				margin:0 20upx;
			}
			.name{
				flex:1;
				width:0;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
			}
			.close{
				width:30upx;
				height:30upx;
				.bg-image("~@/assets/img/close")
			}
		}
	}
	.area{
			padding:30upx;
			display:flex;
			align-items: center;
			justify-content:space-between;
			border-bottom:1upx solid #f0f0f0;
			.text{
				color:#666;
				font-size:28upx;
				margin-right:11upx;
			}
			.icon{
				flex:1;
			}
			.areaIcon{
				width:22upx;
				height:28upx;
				.bg-image('~@/assets/img/定位');
			}
		}
	.goodslist{
		padding:0 30upx;
		.item{
			height:160upx;
			display:flex;
			margin-top:40upx;
			align-items:center;
			
			.img{
				width:160upx;
				height:160upx;
				margin-right:20upx;
			}
			.detail{
				height:100%;
				flex:1;
				display:flex;
				flex-direction:column;
				justify-content:space-between;
				.num{
					display:flex;
					.start{
						margin-right:40upx;
					}
				}
				.oper{
					display:flex;
					justify-content:space-between;	
					align-items:baseline;
					.selectBtn{
						border:1upx solid #007CF9;
						color:#007CF9;
						height:44upx;
						display:flex;
						align-items:center;
						padding:0 22upx;
						border-radius:44upx;
						.icon{
							width:15upx;
							height:9upx;
							margin-left:10upx;
							.bg-image("~@/assets/img/展开备份")
						}
					}
					.price{
						font-size: 28upx;
						color: #FF4117;
						font-weight:bold;
						
					}
					.btn{
						
					}
				}
		}
		
			font-size: 22upx;
			color: #666666;
			.name{
				font-weight:bold;
				font-family: PingFangSC-Medium;
				font-size: 26upx;
				color: #333333;
			}
		}
	}
	.bottom{
			position:fixed;
			bottom:49px;
			width:100%;
			left:0;
			display:flex;
			justify-content:space-between;
			background:#fff;
			padding:30upx 30upx 26upx;
			box-sizing:border-box;
			font-size:26upx;
			color:#333;
			align-items:center;
			.allcheck{
				display: flex;
				align-items: center;
			}
			.money{
				font-size:36upx;
				color: #FF4117;
				font-weight:bold;
			}
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
				.btn{
					float:right;
					padding:0 40upx;
					height:52upx;
					line-height:52upx;
					background: #FF4117;
					border-radius: 26upx;
					color:#fff;
					text-align:center;
				}
			}
		}
		.addbusket{
			background:#fff;
			border-top-left-radius:20upx;
			border-top-right-radius:20upx;
			.title{
				display:flex;
				align-items:center;
				padding:30upx;
				border-bottom:1upx solid #f0f0f0;
				.img{
					width:80upx;
					height:80upx;
					margin:0 20upx;
				}
				.name{
					flex:1;
					width:0;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.close{
					width:40upx;
					height:40upx;
					.bg-image("~@/assets/img/close")
				}
			}
		}
}
</style>
