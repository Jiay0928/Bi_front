import axios from "axios";
// 接口1
export let getDataBaseType = () => axios.get('http://127.0.0.1:8081/api/v1/datasource/list');
// 接口2
export let getDataBaseName = (datasourceType) =>  axios.post(`http://127.0.0.1:8081/api/v1/db/list/?dataType=${datasourceType}`)

// 动态切换数据源
export let switchDataSource = (key,url,port,dataName,username,password,dataType) => axios.post('http://127.0.0.1:8081/api/v1/datasource/link', {
	key,
	url,
	port,
	dataName,
	username,
	password,
	dataType
})