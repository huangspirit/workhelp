<template>
	<view class="orderlist">
		<view class="type">
			<view class="item" :class="choseType.type == item.type?'active':''" v-for="item in tabs" @click="chose(item)">{{item.name}}</view>
		</view>
		<orderlist :type="choseType.type" v-show="choseType.type==0"></orderlist>
		<orderlist :type="choseType.type" v-show="choseType.type==1"></orderlist>
		<orderlist :type="choseType.type" v-show="choseType.type==2"></orderlist>
		<orderlist :type="choseType.type" v-show="choseType.type==3"></orderlist>
	</view>
</template>

<script>
	import orderlist from "../../mycomponents/orderlist.vue"
	export default {
		components:{
			orderlist
		},
	  data() {
	    return {
	      choseType:{type:'0',name:"全部"},
		  tabs:[
			  {type:'0',name:"全部"},
			  {type:'1',name:"待领取"},
			  {type:'2',name:"已领取"},
			  {type:'3',name:"已取消"}
		  ]
	    };
	  },
	  methods:{
		 chose(item){
			 this.choseType = item
		 }
	  }
	};
</script>

<style lang="less" scoped>
	.orderlist{
		.type{
			display:flex;
			justify-content: space-around;
			margin-top:10upx;
			.item{
				color: #666;
				border-bottom:6upx solid transparent;
				padding-bottom:6upx;
				font-size:30upx;
				&.active{
					color: #333333;
					font-weight: bold;
					border-color:#007CF9;
				}
			}
		}
		.list{
			
		}
	}
</style>
