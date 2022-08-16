import {createStore, applyMiddleware} from 'redux';
import thunk  from 'redux-thunk';
const GET_DATABASE_INFO = 'GET_DATABASE_INFO';
const GET_DATA = 'GET_DATA';
const GET_DATABASE_INFO_START = 'GET_DATABASE_INFO_START';
const GET_DATA_START = 'GET_DATA_START';
const REFRESH = 'REFRESH';
const initialState = {
    dataBaseInfoLoading: false,
    dataLoading: false,
    dataBaseInfo: {
        dimensionList: [
        {
                name: "name",
                type: "String",
                descr: "randomStuff",
                isPartition: true
            }
        ],
        matricList: [
            {
                name: "age",
                type: "Int",
                descr: "randomStuff",
                isPartition: true
            },
            {
                name: "salary",
                type: "Int",
                descr: "randomStuff",
                isPartition: true
            }
        ],
        functionList: [
            {
                name: "求和",
                value: "max",
            },
            {
                name: "平均值",
                value: "average",
            }
        ],
    },
    graphData: {},
    name: "lalalla"
    
    
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATABASE_INFO:
            return {
                ...state,
                dataBaseInfo: action.payload,
                dataBaseInfoLoading: false,
            }

        case GET_DATA:
            return {
               ...state,
               dgraphData: action.payload,
               dataBaseInfoLoading: false,
            }

        case GET_DATABASE_INFO_START:
            return {
                ...state,
                dataBaseInfoLoading: true
            }

        case GET_DATA_START: 
            return {
                ...state,
                dataLoading: true,
            }
            
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
