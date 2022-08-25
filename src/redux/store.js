import {createStore, applyMiddleware} from 'redux';
import thunk  from 'redux-thunk';
import {GET_DATABASE_INFO, GET_GRAPHDATA, GET_DATABASE_INFO_START, GET_GRAPHDATA_START, REFRESH, SET_DATASETID, GET_DATABASE_INFO_FAILED, GET_GRAPHDATA_FAILED, GET_ANALYTICDATA, GET_ANALYTICDATA_FAILED, GET_ANALYTICDATA_START} from './action';

// const initialState = {
//     dataSetId: -1, 
//     dataBaseInfoLoading: false,
//     dataLoading: false,
//     analyticDataLoading: false,
//     dataBaseInfo: {
//         dimensionList: [
//         {
//                 name: "name",
//                 type: "String",
//                 descr: "randomStuff",
//                 isPartition: true
//             }
//         ],
//         matricList: [
//             {
//                 name: "age",
//                 type: "Int",
//                 descr: "randomStuff",
//                 isPartition: true
//             },
//             {
//                 name: "salary",
//                 type: "Int",
//                 descr: "randomStuff",
//                 isPartition: true
//             }
//         ],
//         functionList: [
//             {
//                 name: "求和",
//                 value: "max",
//             },
//             {
//                 name: "平均值",
//                 value: "average",
//             }
//         ],
//     },
//     graphData: 
//     [{
//             name: 'John Brown',
//             age: 32,
//             salary: 1000,
            
//           },
//           {
//             name: 'Jim Green',
//             age: 42,
//             salary: 100,
            
//           },
//           {
//             name: 'Joe Black',
//             age: 32,
//             salary: 1000,
           
//           },
//           {
//             name: 'John Brown1',
//             age: 32,
//             salary: 1000,
            
//           },
//           {
//             name: 'Jim Green1',
//             age: 42,
//             salary: 1000,
            
//           },
//           {
//             name: 'Joe Black1',
//             age: 32,
//             salary: 1000,
            
//           },],
//     analyticData : {
        
//     },
    
    
// }
const initialState = {
    dataSetId: 1128308738, 
    dataBaseInfoLoading: false,
    dataLoading: false,
    analyticDataLoading: false,
    dataBaseInfo: {},
    graphData: [],
    analyticData: []
    
    
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATASETID:
            return {
                ...state,
                dataSetId: action.payload
            }

        //  database info
        case GET_DATABASE_INFO:
            return {
                ...state,
                dataBaseInfo: action.payload,
                dataBaseInfoLoading: false,
            }

        case GET_DATABASE_INFO_START:
            return {
                ...state,
                dataBaseInfoLoading: true
            }
            case GET_DATABASE_INFO_FAILED:
            return {
                ...state,
                dataBaseInfo: {},
                dataBaseInfoLoading: false,
            }

        //  graphdata
        case GET_GRAPHDATA:
            return {
               ...state,
               graphData: action.payload,
               dataBaseInfoLoading: false,
            }

        case GET_GRAPHDATA_START: 
            return {
                ...state,
                dataLoading: true,
            }
            
        case GET_GRAPHDATA_FAILED:
            return {
                ...state,
                graphData: [],
                dataLoading: false,
                
            } 
        
        // Analytic Data
        case GET_ANALYTICDATA:
            return {
                ...state,
                analyticData: action.payload,
                analyticDataLoading: false
            }
        case GET_ANALYTICDATA_START:
            return {
                ...state,
                analyticDataLoading: true
            }
        case GET_ANALYTICDATA_FAILED:
            return {
                ...state,
                analyticData: [],
                analyticDataLoading: false,
            }

        //  refresh
        case REFRESH: 
            return initialState

        default: 
            return state
    }
}




const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {
    console.log(store.getState())
})
export default store;


