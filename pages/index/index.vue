<template>
	<view class="container">
		<view class="notice">
			<view class="img"></view>
			<view class="page-section-spacing">
				<swiper class="swiper" :autoplay="true" :interval="5000" :duration="3000" :vertical="false" :circular="true">
					<swiper-item v-for="item in noticeList" :key="item.id">
						<view class="swiper-item">{{item.content}}</view>
					</swiper-item>
					
				</swiper>
			</view>
		</view>
		<view class="area" @click="openpop('workArea')">
			<view class="text">{{defaultArea.name}}</view>
			<view class="areaIcon"></view>
		</view>
		<view class="searchwrap">
			<view class="search">
				<input class="input" type="text" v-model="searchCont" placeholder="请输入要搜索的办公用品" @input="binddata" />
				<view class="serachIcon"></view>
			</view>
		</view>
		<view class="cont">
			<view class="left">
				<view class="item"
         v-for="item in catelist" 
         :class="item.categoryId==choseCate.categoryId?'active':''" 
         @click="choseCate=item"
         :key="item.categoryId">
					<view class="icon"></view>
					<view class="text">{{item.categroryName}}</view>
				</view>
			</view>
			<view class="right">
				<view class="title">
					<view class="price item" @click="sortPrice">
						<text>价格</text>
						<view class="icon">
							<view class="up"></view>
							<view class="down"></view>
						</view>
					</view>	
					<view class="sellenum item" @click="sortAmount">销量</view>
				</view>
				<view class="empty" v-if="goodslist.length==0">
					<view class="image"></view>
					<view>暂无办公用品</view>
				</view>
				 <scroll-view 
				 :scroll-top="scrollTop" 
				 scroll-y="true" 
				 class="scroll-Y" 
				 @scrolltoupper="upper"
				  @scrolltolower="lower"
				                @scroll="scroll">
				<view class="goodslist">
					<view v-for="item in goodslist" class="item" @click="getDetail(item)" :key="item.id">
						<view class="imgwrap">
							<image :src="item.url.split(',')[0]" class="img"></image>
						</view>
						<view class="detail">
							<view class="name">{{item.goodsName}}</view>
							<view class="num">
								<text>{{item.isEngh?'库存充足':''}}</text>
								<text>月销量：{{item.amount}}</text>
							</view>
							<view class="oper" @click.stop="openpop('addbusket',item)">
								<text class="price">￥{{item.price}}</text>
								<text class="btn"></text>
							</view>
						</view>
					</view>
					<view style="height:100px;"></view>
				</view>
				</scroll-view>
			</view>
		</view>
		<view class="bottom">
			<view>总计：<text class="money" @click="openpop('cart')">￥3.89</text></view>
			<view class="keyMoney">个人余额：￥8 <view class="instro"></view></view>
			<view class="btnwrap" @click="buyHandler"><view class="btn">领取</view></view>
		</view>
		<uni-popup ref="addbusket" type="bottom" @change="changepop">
			<view class="addbusket">
				<view class="title">
					<image class="img" :src="addBusketItem.url.split(',')[0]" v-if="addBusketItem.url"></image>
					<view class="name">{{addBusketItem.goodsName}}</view>
					<view class="close" @click="closePop"></view>
				</view>
				<addbusketDetail :showKeyMoney="false" :goodsId='addBusketItem.goodsId' :storeId="addBusketItem.storeId"></addbusketDetail>
			</view>
		</uni-popup>
		<uni-popup ref="workArea" type="bottom" @change="changepop">
			<view class="workArea">
				<view class="title">
					<view class="close" @click="closePop">取消</view>
					<view class="name">您需要选择您的职场地点</view>
					<view class="ensure" @click="ensureArea">确认</view>
				</view>
				<view class="pick">
				 <picker-view indicator-style="height: 50px;" style="width: 100%; height: 150px;"  @change="bindChange1">
				    <picker-view-column>
				        <view v-for="(item,index) in this.data1" style="line-height: 50px; text-align: center;" :key='index'>{{item.title}}
				        </view>
				    </picker-view-column>
				    
				    <picker-view-column>
				         <view v-for="(item,index) in this.data2" style="line-height: 50px; text-align: center;" :key="index">{{item.title}}
				         </view>
				     </picker-view-column>
				     
				    <picker-view-column>
				        <view v-for="(item,index) in this.data3" style="line-height: 50px; text-align: center;" :key="index">{{item.name}}
				        </view>
				    </picker-view-column>
				 </picker-view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="cart" type="bottom" @change="changepop">
			<view class="workArea">
				<view class="title">
					<div style="width:100%;">
						<view class="close" @click="closePop"></view>
						<view class="name">总计：3.89</view>
						<view class="subtitle">
							<view>商品列表</view>
							<view class="clearCart" @click="clearCart">
								<text class="deleteicon"></text>
								清空购物车
							</view>
						</view>
					</div>
				</view>
				
				<view class="goodslist">
				<view v-for="item in selectGoods" class="item" :key="item.id">
					<view class="name">{{item.goodsName}}</view>
					<view class="sub">
						<text class="desc">{{item.choseGuige.title}}</text>
						<text class="price">￥{{item.price}}</text>
						<view class="count">
							<uni-number-box :min="0" :max="9" :step="1"></uni-number-box>
						</view>
					</view>
				</view>
				<view v-if="selectGoods.length==0" style="color:#ccc;text-align:center;padding:30px;">空空如也</view>
				
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="buyRes" type="center">
			<view class="buyRes">
				<view class="title">温馨提示</view>
				<view class="cont">您的订单已经提交成功，请在【orderExpireTime】之前到指定地点【address】领取，领取时间为【timeRange】过期将进行自动退货处理。</view>
				<view class="btnwrap" @click="closePop">
					知道了
				</view>
			</view>
			
		</uni-popup>
		
		<uni-popup ref="login" type="center" @change="changepop">
			<view class="buyRes ">
			<view class="title">
			    <view class="cont">系统检测到您未登录，请授权登录使用</view>
				<view class="btnwrap" @click="sureLogin">
					确认
				</view>
			</view>
			</view>
		</uni-popup>
		
		
	</view>
</template>
<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	// import pickView from "@/mycomponents/picker-view"
	import * as dd from 'dingtalk-jsapi'; 
	import addbusketDetail from "@/mycomponents/addbusketdetail"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	const app = getApp({allowDefault: true})
	export default {
		components: {
			uniLoadMore,
			uniNumberBox,
			uniSearchBar,
			uniPopup,
			addbusketDetail,
		//pickView
		},
		onLoad:function(option){
			console.log(option)
			console.log("uni",uni)
			//  this.loadProvinces(1)//页面加载 1标识页面加载 2主动调用
		},
		data() {
			return {
				 scrollTop: 0,
				  old: {
				                 scrollTop: 0
				             },
				pageNumber:1,
				pageSize:10,
				searchKey:"",
				reload: true,
				sortFlag:true,
				status: 'more',
				contentText: {
						contentdown: '上拉加载更多~',
						contentrefresh: '加载中',
						contentnomore: '我是有底线的~'
				},
				sortParam:{
					name:"createTime",
					order:"desc"
				},
				totalCount:0,
				data1:[],//省
				data2:[],//市
				data3:[],//区
				storeId:"1343926392932405249",
				selectGoods:[],
				popName:"",
				addBusketItem:{},
				show:false,
				defaultArea:{name:"点击选择职场"},
				indexVal:[0,0,0],//picker-view选中数组下标初始值
				searchCont:"",
				choseCate:{categroryName:"全部用品",categoryId:"-1"},
				noticeList:[],
				catelist:[],
				goodslist:[]
			}
		},
		mounted(){
			console.log(this.$service)
			//监控是否登录
			this.checkLogin();
			this.getnoticelist();
			if(localStorage.getItem('defaultArea')){
				this.defaultArea = {
					name:localStorage.getItem('defaultArea') || '点击选择职场'}
			}else{
				this.loadProvinces()//页面加载 1标识页面加载 2主动调用
			}
		},
		watch:{
			choseCate:{
				handler:function(val){
					this.pageNumber = 1;
					this.getGoodsList()
				},
				deep:true
			},
			defaultArea:{
				//监控职场位置
				handler:function(val){
					console.log("11111",val);
					this.getGoodsCategory();
					localStorage.setItem("defaultArea",val.name)
				},
				deep:true
			},
			indexVal:{
				//监控三级联动
				handler:function(val,oldval){
					if(val[0]!=oldval[0]){
						this.indexVal[1] = 0
						this.indexVal[2] = 0
						this.loadCities(this.data1[val[0]].id)
						return;
					}else {
						if(val[1]!=oldval[1]){
							this.indexVal[2] = 0
							this.loadAreas(this.data2[val[1]].id)
							return;
						}
					}
				},
				deep:true
			},
			
		},
		methods: {
			clearCart(){
				localStorage.removeItem("busket")
				this.selectGoods = []
			},
			
			
			 checkLogin(){
				 var  token=localStorage.getItem("accessToken")
				 if(token==null){
					this.openpop("login",null,true)
				 }
			 },
			
			  upper: function(e) {
					//下滑到顶部
				},
				lower: function(e) {
					//上拉到底部
					if(this.pageNumber<this.totalCount){
						this.pageNumber++;
						this.getGoodsList()
					}
				},
				scroll: function(e) {
					this.old.scrollTop = e.detail.scrollTop
				},
			sortPrice(){
			    if(this.sortFlag){
					this.sortFlag=false;
				    this.sortParam={name:"price",order:"desc"};
				}else{
					this.sortFlag=true;
				    this.sortParam={name:"price",order:"asc"};
				}
					this.getGoodsList()
			},
			
			sortAmount(){
			    if(this.sortFlag){
					this.sortFlag=false;
				    this.sortParam={name:"amount",order:"desc"};
				}else{
					this.sortFlag=true;
				    this.sortParam={name:"amount",order:"asc"};
				}
				this.pageNumber = 1
					this.getGoodsList()
			},
			
			getnoticelist(){
				this.http({
					url:"/api/app/v1/goods/getFeedBack",
					data:{pageSize:20,pageNumber:1},
					success:res=>{
					      this.noticeList=res.result.content;
					}
				})
			},
			binddata(e){
				//根据关键字搜索
				console.log(e.detail);
			   this.searchKey=e.detail.value;
			   this.pageNumber = 1
				this.getGoodsList()
			},
		
		
		bindChange1(e){//picker-view组件的change事件
				 this.indexVal =[e.target.value[0]||0,e.target.value[1]||0,e.target.value[2]||0] ;
		     },
			getGoodsCategory(){
				this.http({
					url:"/api/app/v1/goods/getGoodsCategory",
					data:{address:this.defaultArea.name},
					method:"get",
					success:res=>{
						if(res.success){
							this.catelist=[];
							if(res.result.length>0){
								this.catelist.push({"categroryName":"全部用品","categoryId":"-1"})
								for(let item of res.result){
									this.catelist.push({"categroryName":item.categroryName,"categoryId":item.categoryId})
								}
							}else{
								this.catelist=[];
							}
							this.pageNumber = 1;
							this.getGoodsList()
						}
					},
					fail:err=>{
						console.log(err)
					}
				})
			},
			
			getGoodsList(){
			
		      this.http({
		     	url:"/api/app/v1/goods/getGoodsList",
		     	data:{
					cateId:this.choseCate.categoryId=="-1"?"":this.choseCate.categoryId,
					storeId:this.storeId,
					goodsName:this.searchKey,
					pageSize:this.pageSize,
					isSale:1,
					pageNumber:this.pageNumber,
					sort:this.sortParam.name,
					order:this.sortParam.order,
					},
		     	method:"get",
		     	success:res=>{
		     		if(res.success){
		     			        this.totalCount = res.result.totalPages
		     					if (res.result.content) {
									if(this.pageNumber==1){
										this.goodslist = res.result.content
									}else{
										this.goodslist = [...this.goodslist,...res.result.content]
									}
		     					} else {
									if(this.pageNumber==1){
										this.goodslist=[];
									}
									   
		     					}
								if(res.result.last){
									this.reload = false;
								}
								console.log(this.goodslist)
		     		}else{
						 uni.showToast({
							 icon:"none",
						      title: res.message
						   })
					}
	
		     	},
		     	fail:err=>{
		     		uni.showToast({
						icon:"none",
		     		   title: '服务器异常'
		     		  })
		     	}
		     })	
			},
			
			onReachBottom() {
					if (this.totalCount > this.pageNumber) {
							this.status = 'loading';
							this.pageNumber++
							this.getGoodsList();//执行的方法
					} else { //停止加载
							this.status = 'noMore'
					}
			},
			
		
	      
				
				 loadProvinces() { // 加载省份
				                let that=this;
				                  this.http({
				                    url:"/api/app/v1/goods/getFirstRegion",
				                    method: 'get',
				                    success: res => {
				                        this.data1 = res.result;//页面赋值
				                        this.loadCities(this.data1[0].id)//调用市
				                    },
				                    fail:async(res) => {
				                    }
				                })
				            },
				            loadCities(AreaId) {//加载市
				                let that=this;
				                this.http({
				                   	url:"/api/app/v1/goods/getSecondRegion",
				                   	data:{pageSize:20,pageNumber:1,parentId:AreaId},
				                    method: 'get',
				                    success:  res => {
				                        that.data2 = res.result;
										if(that.data2.length){
											this.loadAreas(res.result[0].id)
										}else{
											this.data2 = []
										}
				                    },
				                    fail:async(res) => {
				                    }
				                })
				            },
				            loadAreas(AreaId) {//加载区域
				                let that=this;
				                 this.http({
				                   url:"/api/app/v1/goods/getWareHouse",
				                   	data:{regionId:AreaId},
				                    method: 'get',
				                    success: async (res) => {
				                        this.data3= res.result;
				                    },
				                    fail:async(res) => {
				                    }
				                })
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
				this.popName = name;
				if(name=="addbusket"){
					//加入购物篮
					console.log("加入购物篮:",item)
					this.addBusketItem = item;
				}else if(name == "workArea"){
					this.indexVal = [0,0,0]
				}else if(name == "cart"){
					this.selectGoods =JSON.parse(localStorage.getItem("busket")) || []
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
			ensureArea(){
				console.log("确认选择")
				console.log(this.data3)
				console.log(this.indexVal)
				this.defaultArea = {
					name:this.data3[this.indexVal[2]].name,
				}
				//仓库id赋值
				this.storeId=this.data3[this.indexVal[2]].id;
				this.$refs[this.popName].close()
			},
			
		
			sureLogin(){
				  console.log("确认登录");
				  let that=this;
				  if(dd.env.platform != "notInDingTalk"){
					  dd.ready(function() {
					                    dd.runtime.permission.requestAuthCode({
					                        corpId: "dingf18bee9ed6460022", 
					                        onSuccess: function(info) {
					                           var code = info.code; // 通过该免登授权码可以获取用户身份
					  										   console.log(code);
					                           that.getLogin(code); 
					                        },
					                        onFail: function(err) {
					                          console.log("登录异常，请稍后重试!" , JSON.stringify(err));
					                        }
					                    });
					                });
					         
				  }
				   this.$refs[this.popName].close()
		         
			},
			getLogin(code){
						   let that=this;
						this.http({
						   url:"/api/social/dingding/getUserInfoByCode",
						   	data:{authCode:code},
						    method: 'get',
						    success: async (res) => {
								  if(res.success){
									  var  accessToken= res.result;
									  localStorage.setItem("accessToken",accessToken);
									  //调用获取用户信息的接口
									  that.getUserInfo();
									  uni.showLoading({
									       title: '数据加载中'
									       });
									     setTimeout(function () {
									      uni.hideLoading();
									   }, 1000);
								   }else{
									   uni.showToast({
									   	icon:"none",
									   	title: res.message
									   })
								  }
								
						    },
						    fail:async(res) => {
						    }
						})
			},
			getUserInfo(){
				this.http({
				   url:"/api/app/v1/member/info",
				   	data:{},
					header:{},
				    method: 'get',
				    success: async (res) => {
						  if(res.success){
					        localStorage.setItem("userInfo",JSON.stringify(res.result));
						   }else{
							   uni.showToast({
							   	icon:"none",
							   	title: res.message
							   })
						  }
				    },
				    fail:async(res) => {
				    }
				})
			},
			changepop(e){
				//监控弹框状态
				console.log(e)
				if(!e.show){
					uni.showTabBar({})
				}
			},
		
			getDetail(item){
				//跳转到商品详情
				uni.navigateTo({
					url: '/pages/index/detail?goodsId=' + item.id
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "~@/assets/css/public.less";
	.container {
		display:flex;
		flex-direction:column;
		height:100%;
		position:relative;
		.scroll-Y{
			height:500px;
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
		.workArea{
			background:#fff;
			.title{
				padding:30upx;
				text-align:center;
				font-weight:bold;
				border-bottom:1upx solid #f0f0f0;
				font-size:30upx;
				display: flex;
				justify-content: space-between;
				.close{
					font-weight: normal;
					color:#666;
				}
				.ensure{
					font-weight: normal;
					color:#007AFF;
				}
				// .close{
				// 	width:30upx;
				// 	height:30upx;
				// 	float:right;
				// 	margin-top:5upx;
				// 	.bg-image("~@/assets/img/说明")
				// }
				.subtitle{
					display:flex;
					justify-content:space-between;
					margin-top:36upx;
					color:#666;
					font-size:26upx;
					.clearCart{
						display:flex;
						align-items:center;
						.deleteicon{
							width:24upx;
							height:30upx;
							margin-right:10upx;
							.bg-image("~@/assets/img/清空")
						}
					}
					
				}
			}
			.pick{
				height:500upx;
			}
			.goodslist{
				.item{
					padding:30upx;
					border-bottom:1upx solid #f0f0f0;
					.name{
						white-space:nowrap;
						width:100%;
						overflow:hidden;
						text-overflow:ellipsis;
						font-weight:bold;
						color:#333;
					}
					.sub{
						display:flex;
						justify-content:space-between;
						align-items:center;
						.desc{
							color:#999;
							padding-right:20upx;
							border-right:1upx solid #999;
							margin-right:20upx;
						}
						.price{
							font-size: 28upx;
							color: #FF4117;
							font-weight:bold;
							text-align:left;
							flex:1;
						}
					}
					
					
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
					width:132upx;
					height:52upx;
					line-height:52upx;
					background: #FF4117;
					border-radius: 26upx;
					color:#fff;
					text-align:center;
				}
			}
		}
		.notice{
			display:flex;
			background-color: rgba(248,89,0,0.05);
			padding:21upx 0;
			align-items:center;
			.img{
				margin-left:30upx;
				margin-right:20upx;
				height:30upx;
				width:29upx;
				.bg-image('~@/assets/img/吐槽图标');
			}
			.page-section-spacing{
				flex:1;
				width:0;
				.swiper{
					height:36upx;
					line-height:1;
					.swiper-item{
						width:100%;
						font-size: 15px;
						color: #FF5725;
						white-space:nowrap;
						overflow:hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
		.area{
			margin-top:30upx;
			display:flex;
			align-items: center;
			.text{
				color:#666;
				font-size:28upx;
				margin-left:30upx;
				margin-right:11upx;
			}
			.areaIcon{
				width:22upx;
				height:28upx;
				.bg-image('~@/assets/img/定位');
			}
		}
		.searchwrap{
			padding:0 30upx;
			margin:20upx 0;
			.search{
				width:100%;
				height:64upx;
				padding:0 30upx;
				box-sizing: border-box;
				background: #F6F6F6;
				border-radius: 32upx;
				border-radius: 32upx;
				display: flex;
				align-items: center;
				.input{
					font-size: 26upx;
					flex:1;
				}
				.serachIcon{
					height:36upx;
					width:36upx;
					.bg-image('~@/assets/img/搜索');
				}
			}
			
		}
		.cont{
			display: flex;
			flex:1;
			.left{
				padding-top:2upx;
				font-size:26upx;
				color: #666666;
				letter-spacing: 0;
				width:200upx;
				background: #F8F8F8;
				.item{
					height:88upx;
					display: flex;
					align-items: center;
					&.active{
						background-color: #fff;
						color:#333;
						.icon{
							.bg-image('~@/assets/img/选中滑块')
						}
					}
					.icon{
						width:6upx;
						height:40upx;
						margin-right:24upx;
					}

				}
			}
			.right{
				font-size:26upx;
				flex:1;
				padding-right:30upx;
				.empty{
					margin:200upx auto;
					font-family: PingFangSC-Regular;
					font-size: 13px;
					color: #AAABB3;
					letter-spacing: 0;
					text-align:center;
					.image{
						width:70upx;
						height:70upx;
						margin:0 auto 20upx;
						.bg-image('~@/assets/img/领用篮')
					}
				}
				.title{
					display:flex;
					height:88upx;
					align-items:center;
					border-bottom:1upx solid #f8f8f8;
					.item{
						flex:1;
						text-align:center;
						&.price{
							display:flex;
							justify-content: center;
							align-items:center;
							.icon{
								margin-left:6upx;
								.up{
									width:0;
									border:8upx solid transparent;
									border-bottom-color:#d8d8d8;
									margin-bottom:5upx;
								}
								.down{
									width:0;
									border:8upx solid transparent;
									border-top-color:#d8d8d8;
								}
							}
						}
					}
				}
				.goodslist{
					padding-left:20upx;
					padding-top:20upx;
					.item{
						display:flex;
						margin-bottom:36upx;
						.img{
							width:160upx;
							height:160upx;
							margin-right:20upx;
						}
						.detail{
							flex:1;
							display:flex;
							flex-direction:column;
							justify-content:space-between;
							.num{
								display:flex;
								justify-content:space-between;
							}
							.oper{
								display:flex;
								justify-content:space-between;	
								.price{
									font-size: 28upx;
									color: #FF4117;
									font-weight:bold;
									
								}
								.btn{
									width:90upx;
									height:36upx;
									.bg-image('~@/assets/img/添加')
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
			}
		}
	}
</style>
