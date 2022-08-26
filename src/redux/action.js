import axios from 'axios';
export const GET_DATABASE_INFO = 'GET_DATABASE_INFO';
export const GET_DATABASE_INFO_START = 'GET_DATABASE_INFO_START';
export const GET_DATABASE_INFO_FAILED = 'GET_DATABASE_INFO_FAILED';
export const GET_GRAPHDATA_START = 'GET_DATA_START';
export const GET_GRAPHDATA = 'GET_DATA';
export const GET_GRAPHDATA_FAILED = 'GET_DATA_FAILED';
export const REFRESH = 'REFRESH';
export const SET_DATASETID = 'SET_DATASETID';
export const GET_ANALYTICDATA_START = 'GET_ANALYTICDATA_START';
export const GET_ANALYTICDATA = 'GET_ANALYTICDATA';
export const GET_ANALYTICDATA_FAILED = 'GET_ANALYTICDATA_FAILED';

export const updateDatabaseInfo = ()  => {

    return function(dispatch, getState) {
        const {dataSetId} = getState();
        axios.get(`http://127.0.0.1:8081/api/v1/dataset/info/${dataSetId}`, {method: 'GET'}).then(
            (response => {
                console.log(response)
                if (response.status === 200 ){
                    dispatch({
                        type: GET_DATABASE_INFO,
                        payload: response.data.data

                })}else{
                    console.log('get Database Info', response.status)
                    dispatch({
                        type: GET_DATABASE_INFO_FAILED,
                    })
                }

            })
        ).catch(
            err => {
                console.log("updateDatabaseInfoFailed", err);
            }
        )
    }
}

export const updateGraphData = (dimension, matricList) => {
    return function (dispatch, getState) {
        const { dataSetId } = getState();
        let selectFields = matricList.map(value => {
            return {
                "functionName": "avg",
                "functionField": value
            }
        })
        axios.post('http://127.0.0.1:8081/api/v1/query',
            {
                    tableName: "stock_day",
                    dimensionField:dimension,
                    dataSetId,
                    cache: true,
                    selectFields,
                    groupByField: dimension,
                    orderByField: dimension,
                    orderStyle: "asc",
            })
            .then(
                (response => {
                    if (response.status === 200) {
                        console.log('response.data===', response.data.data)
                        dispatch({
                            type: GET_GRAPHDATA,
                            payload: response.data.data

                        })
                    } else {
                        console.log("updateGraphDataFailed", response.status);
                        dispatch({
                            type: GET_GRAPHDATA_FAILED,
                            payload: {}
                        });
                    }


                })
            ).catch(
                err => {
                    console.log("updateGraphDataFailed", err);
                    dispatch({
                        type: GET_GRAPHDATA_FAILED
                    });
                }
            )
    }
}
export const updateAnalyticData = (dimension, matric) => {
    return function (dispatch, getState) {
        const { dataSetId } = getState();
        
        axios.post('http://127.0.0.1:8081/api/v1/query',
            {
                tableName: "stock_day",
                dataSetId,
                dimensionField:dimension,
                selectFields: [
                    { functionName: "max", functionField: matric },
                    { functionName: "avg", functionField: matric },
                    { functionName: "min", functionField: matric },
                    { functionName: "sum", functionField: matric },
                ],
                groupByField: dimension,
                orderByField: dimension,
                orderStyle: 'asc',
            }).then(
                (response => {
                    if (response.status === 200) {
                        dispatch({
                            type: GET_ANALYTICDATA,
                            payload: response.data.data
                        });
                    } else {
                        console.log("update Analytic Data Failed", response.status);
                        dispatch({
                            type: GET_ANALYTICDATA_FAILED
                        });
                    }
                })
            ).catch(
                err => {
                    console.log("UpdateAnalyticDataFailed", err);
                }
            )
    }
}



