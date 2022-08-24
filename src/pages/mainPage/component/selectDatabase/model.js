import axios from "axios";

export let getDataBaseType = () => axios.get('/api/v1/datasource/list');
export let getDataBaseName = (datasourceType) =>  axios.get(`/api/v1/db/list/${datasourceType}`)