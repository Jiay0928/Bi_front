import axios from "axios";
// 接口1
export let getDataBaseType = () => axios.get('/http://127.0.0.1:4523/m1/1455832-0-default/api/v1/datasource/list');
// 接口2
export let getDataBaseName = (datasourceType) =>  axios.post(`/api/v1/db/list/${datasourceType}`)

// 动态切换数据源
export let switchDataSource = () => axios.post('http://127.0.0.1:4523/m1/1455832-0-default/api/v1/datasource/link', {
	"key":"clickhouse",
	"url":"121.40.79.160",
	"port":"8123",
	"dataName":"bi_system",
	"username":"default",
	"password":"123123",
	"dataType":"clickhouse"
})