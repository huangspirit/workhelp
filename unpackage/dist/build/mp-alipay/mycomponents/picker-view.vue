<template>
    <view>
        <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
            <picker-view-column>
                <view class="item" v-for="(item,index) in province" :key="index">{{item}}</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in city" :key="index">{{item}}</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in workAreaList" :key="index">{{item}}</view>
            </picker-view-column>
        </picker-view>
    </view>
</template>

<script>
    export default {
		props:{
		   province:{
			   type:Array,
			   default:[]
		   },
		   city:{
			   type:Array,
			   default:[]
		   },
		   workAreaList:{
			   type:Array,
			   default:[]
		   }
		},
        data () {
            return {
				value:[],
                visible: true,
                indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
            }
        },
        methods: {
            bindChange (e) {
                const val = e.detail.value
                console.log(e.detail)
            }
        }
    }
</script>

<style>
	
    picker-view {
        width: 100%;
        height: 600rpx;
        margin-top:20rpx;
    }

    .item {
        line-height: 100rpx;
        text-align: center;
    }
</style>
