/*
* 基础信息配置
*/
let hostConfig = {
	development: 'http://39.105.28.121:8080/train-cms',
	production: 'http://39.105.28.121:8080/train-cms'
}
export default {
	// 本地
	HOST: hostConfig[process.env.NODE_ENV] || 'http://39.105.28.121:8080/train-cms',
	HOST_IMG: 'http://39.105.28.121:7777/img/',
	USER_INFO: '/v1/users',
	//  人员登录
	LOGIN: '/usr/sysusr/login', 

	// 人员操作
	USER_LIST: '/usr/sysusr/list',
	USER_ADD: '/usr/sysusr/add',
	USER_UPDATE: '/usr/sysusr/update',
	USER_DELETE: '/usr/sysusr/delete',

	// 商户机构信息
	MERCHANTS_LIST: '/edu/corporat/list',
	MERCHANTS_DETAIL: '/edu/corporat/detail',
	MERCHANTS_DETAIL_UPDATE: '/edu/corporat/update',


	userType: [{
		key: '1',
		name: 'cms人员'
	}, {
		key: '2',
		name: 'mis人员'
	}],
	roleType: [{
		key: '1',
		name: '员工'
	}, {
		key: '2',
		name: '经理'
	}],
}