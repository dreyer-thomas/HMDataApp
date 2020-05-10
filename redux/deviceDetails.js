import * as ActionTypes from './ActionTypes';

export const deviceDetails = (state = {
        isLoading: true,
        errMess: null,
        deviceDetails: {}
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_DEVICEDETAIL:
                return {...state, isLoading:false, errMess:null, deviceDetails:action.payload}
            case ActionTypes.DEVICEDETAIL_FAILED:
                return {...state, isLoading:false, errMess: action.payload, deviceDetails: {}}
            case ActionTypes.DEVICEDETAIL_LOADING:
                return {...state, isLoading:true, errMess:null, deviceDetails: {}}
            default:
                return state;
        }
    }