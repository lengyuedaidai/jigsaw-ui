//引入axios
import axios from 'axios';
import qs from 'qs'
let cancel ,promiseArr = {}
let instance = axios.create({
	  baseURL: 'http://localhost:8089/jigsaw/rest/dataServices',
	  timeout: 1000,
	  headers: {'X-Requested-With': 'XMLHttpRequest'}
	});
const CancelToken = axios.CancelToken;
//请求拦截器
instance.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
      return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器即异常处理
instance.interceptors.response.use(response => {
	if(response.data&&response.data.statusCode===0){
		return response.data.data;
	}else{
		debugger;
		return Promise.reject(response)
	}
}, err => {
	debugger;
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败"
    }
    return Promise.reject(err)
})

export default {
  //get请求
    get (url,param) {
      return new Promise((resolve,reject) => {
    	  instance({
          method: 'get',
          url,
          params: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        }).catch(function (error) {
        	reject(error)
		});
      })
    },
  //post请求
    post (url,param) {
      return new Promise((resolve,reject) => {
    	  instance({
          method: 'post',
          url,
          transformRequest: [function (data) {
              // 对 data 进行任意转换处理
              return qs.stringify(data)
          }],
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        }).catch(function (error) {
        	reject(error)
		});
      })
     }
  }