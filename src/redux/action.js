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
        axios.get(`http://127.0.0.1:4523/m1/1455832-0-default/api/v1/dataset/info${dataSetId}`, {method: 'GET'}).then(
            (response => {
                if (response.status === 200 ){
                dispatch({
                    type: GET_DATABASE_INFO,
                    payload: response.data
                    
                })}else{
                    console.log('get Database Info', response.status)
                    dispatch({
                        type: GET_DATABASE_INFO_FAILED,
                    })
                }

            })
        ).catch (
            err => {
                console.log("updateDatabaseInfoFailed", err);
            }
        )
    }
}

export const updateGraphData = (dimension, matricList)  => {
    return function(dispatch, getState) {
        const {dataSetId} = getState();
        let selectFields = matricList.map(value => {
            return  {"functionName":"sum",
                "functionField":value}})
    
        axios.post('http://127.0.0.1:8081/api/v1/query', 
        {
            data: {
                tableName: dimension,
                dataSetId,
                cache: true,
                selectFields,
                groupByField: dimension,
                orderByField: null,
                orderStyle: null,
            }
        })
        .then(
            (response => {
                if (response.status === 200 ){
                    dispatch({
                        type: GET_GRAPHDATA,
                        payload: response.data
                        
                    })

                }else{
                    console.log("updateGraphDataFailed", response.status);
                    dispatch({
                        type: GET_GRAPHDATA_FAILED
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
export const updateAnalyticData = (dimension, matric)  => {
    return function(dispatch, getState) {
        const {dataSetId} = getState();
        
        axios.post('http://127.0.0.1:8081/api/v1/query', 
            {
                data: {
                    tableName: dimension,
                    dataSetId,
                    selectFields: [
                        {functionName: "max", functionField: matric},
                        {functionName: "avg", functionField: matric},
                        {functionName: "min", functionField: matric},
                        {functionName: "sum", functionField: matric},
                    ],
                    groupByField: null,
                    orderByField: null,
                    orderStyle: null,

                }
            
        
            }).then(
            (response => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_ANALYTICDATA,
                        payload: response.data
                        
                    });
                }else {
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



