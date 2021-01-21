<template>
	<view class="orderlist">
		<view  v-for="item in list" v-if="list.length">
			<orderItem :item0="item"></orderItem>
		</view>
	</view>
</template>

<script>
	import orderItem from "./orderitem.vue"
	export default({
		components:{
			orderItem
		},
		props:{
			type:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				list:[
					{orderNo:'123456777778',
					num:5,
					time:"2020年12月29日13:42:07",
					status:'待领取',
					area:'望京职场',},
					{orderNo:'123456777778',
					num:5,
					time:"2020年12月29日13:42:07",
					status:'待领取',
					area:'望京职场',}
				],
				pageSize:10,
				pageNumber:1
			}
		},
		methods:{
			init(){
				//根据类型获取订单列表
			},
		}
	})
</script>

<style>
</style>
