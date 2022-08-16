import axios from 'axios';
const GET_DATABASE_INFO = 'GET_DATABASE_INFO';
const GET_DATA = 'GET_DATA';

export const updateDatabaseInfo = ()  => {
    return function(dispatch) {
        axios.get('https://jsonplaceholder.typicode.com/posts', {method: 'GET'}).then(
            (response => {
                dispatch({
                    type: GET_DATABASE_INFO,
                    payload: response.data
                    
                })

            })
        )
    }
}

export const updateData = ()  => {
    return function(dispatch) {
        axios.get('https://jsonplaceholder.typicode.com/posts', {method: 'GET'}).then(
            (response => {
                dispatch({
                    type: GET_DATA,
                    payload: response.data
                    
                })

            })
        )
    }
}



