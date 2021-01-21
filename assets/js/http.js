let root = process.env.NODE_ENV;

// let devport = "http://127.0.0.1:8888"
// let appport = ""
// const deleteObjNull=(obj)=>{
// 	    for(let key in obj){
// 	        if(obj[key]==='' || obj[key]===undefined || obj[key]===null || obj[key]=='-' || obj[key]=='NaN'){
// 	            delete obj[key];
// 	        }
// 	    }
// 	}
// const port = root === 'development'?devport:appport;
module.exports = (params) => {
	let url = params.url;	
	let method = params.method;	
	
	let header =params.header;
	var  token=localStorage.getItem("accessToken");
	 if(header){
		header={"accessToken":token};	
	 }
	let data = params.data || {};
	//	请求方式 GET POST
	if	(method) {
		method = method.toUpperCase();	//	小写转大写
		if (method == "POST") {
			header = {"content-type":"application/x-www-form-urlencoded","accessToken":token}
		}
	}
	//	发起请求 加载动画
	if (!params.hideLoading){
		uni.showLoading({
			title:"加载中"
		})
	}
	//	发起网络请求
	uni.request({
		url:url,
		method:method || "GET",
		header:header,
		data:data,
		dataType:"json",
		sslVerify:false,	//	是否验证ssl证书
		success: res => {
			if	(res.statusCode && res.statusCode != 200){
				//	api错误
				uni.showModal({
					content:res.msg
				})
				return;
			}
			if(res.statusCode==401){
				localStorage.removeItem("accessToken");
				localStorage.removeItem("");
				console.log("重新授权")
			}
			typeof params.success == "function" && params.success(res.data);
		},
		fail: err => {
			uni.showModal({
				content:err.msg
			})
			typeof params.fail == "function" && params.fail(err.data);
		},
		complete: (e) => {
			console.log("请求完成");
			uni.hideLoading()
			typeof params.complete == "function" && params.complete(e.data);
			return;
		}
	})
}