import axios from 'axios';
import config from './config';
import auth from './auth';
import Cookies from 'js-cookie';
let qs = require('qs');


axios.defaults.withCredentials = true;
axios.interceptors.response.use(function (response) {
	// console.log(response);
	// 用户未登录时自动跳转登录地址
    if (response.data.rspCode === 'CIPSYS9999') {
    	// if (!/\/user$/.test(response.config.url)) {
    	// 	auth.toLogin();
		// }
		// auth.toLogin();
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

function formatParams(json){
	return qs.stringify(json);
}

/**
 * get 请求
 * 
 * @param {any} url 
 * @param {any} params 
 * @returns 
 */
function axiosHttp (type, url, params = {}, async, form) {
	let sessionId = Cookies.get('sessionId');
	params.nocache = +new Date();
	if (sessionId) {
		axios.defaults.headers.sessionId = sessionId;
		params.sessionId = sessionId;
	}
	if (type === 'get') {
		return axios.get(url, {
			params: params,
			async: async
		});
	}
	else if (type === 'post') {
		return axios.post(url, form ? formatParams(params) : params);
	}
}



export default {
	getUserInfo: (params)=>{
		// return axiosHttp('get', `${config.HOST}${config.USER_INFO}`, params);
	},
	login: (data)=> {
		return axiosHttp('post', `${config.HOST}${config.LOGIN}`, data);
	},

	// 人员列表
	getUserList: (params)=>{
		return axiosHttp('post', `${config.HOST}${config.USER_LIST}`, params);
	},
	delUserInfo: (params)=>{
		return axiosHttp('post', `${config.HOST}${config.USER_DELETE}`, params);
	},
	updateUser: (params, type)=>{
		if (type === 'add') {
			return axiosHttp('post', `${config.HOST}${config.USER_ADD}`, params);
		}
		return axiosHttp('post', `${config.HOST}${config.USER_UPDATE}`, params);
	},


	// 商户机构列表
	getMerchantsList:  (params)=>{
		return axiosHttp('post', `${config.HOST}${config.MERCHANTS_LIST}`, params);
	},
	getMerchantsInfo:  (params)=>{
		return axiosHttp('post', `${config.HOST}${config.MERCHANTS_DETAIL}`, params);
	},
	updateMerchantsInfo:  (params)=>{
		return axiosHttp('post', `${config.HOST}${config.MERCHANTS_DETAIL_UPDATE}`, params);
	},
};