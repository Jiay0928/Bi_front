import axios from "axios";
// 接口3
export let getTableList = (dbName) => axios.post('http://127.0.0.1:8081/api/v1/table/list',{dbName});
// 接口4
export let getTableInfo = (datasourceType, dbName,tableName) => axios.post('http://127.0.0.1:8081/api/v1/table/schema', {datasourceType,dbName, tableName});
// 接口5 
export let getDataSetId = (payload) => axios.post(
'http://127.0.0.1:8081/api/v1/dataset/create',payload
)