import axios from "axios";
// 接口3
export let getTableList = (datasourceType, dbName) => axios.get('http://127.0.0.1:4523/m1/1455832-0-default/api/v1/table/list',{ datasourceType,dbName});
// 接口4
export let getTableInfo = (datasourceType, dbName,tableName) => axios.get('http://127.0.0.1:4523/m1/1455832-0-default/api/v1/table/schema', {datasourceType,dbName, tableName});
// 接口5 
export let getDataSetId = (payload) => axios.post(
'http://127.0.0.1:4523/m1/1455832-0-default/api/v1/dataset/create',payload
)