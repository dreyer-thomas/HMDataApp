import * as ActionTypes from './ActionTypes';

export const chart = (state = {
        isLoading: true,
        errMess: null,
        chartData: []
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_CHART:
                return {...state, isLoading:false, errMess:null, chartData:action.payload}
            case ActionTypes.CHART_FAILED:
                return {...state, isLoading:false, errMess: action.payload, chartData: []}
            case ActionTypes.CHART_LOADING:
                return {...state, isLoading:true, errMess:null, chartData: []}
            default:
                return state;
        }
    }