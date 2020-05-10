import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/config';

//Device List in Devices Page

export const fetchDevices = () => (dispatch) => {
    return fetch(baseUrl+'/config/devices/')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(devices=> dispatch(addDevices(devices)))
        .catch(error => dispatch(devicesFailed(error.message)))
}

export const devicesFailed = (errmess) => ({
    type:ActionTypes.DEVICES_FAILED,
    payload: errmess
});

export const addDevices = (devices) => ({
    type: ActionTypes.ADD_DEVICES,
    payload: devices
});

// Device Details in Devices List

export const fetchDeviceDetails = (id) => (dispatch) => {
    dispatch(deviceDetailsLoading);
    return fetch(baseUrl+'/config/devices/'+id+'/')
        .then(response=> {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(deviceDetails => dispatch(addDeviceDetails(deviceDetails)))
        .catch(error => dispatch(deviceDetailsFailed(error.message)))
}

export const deviceDetailsLoading = () => ({
    type: ActionTypes.DEVICEDETAIL_LOADING,
    payload: null
})

export const deviceDetailsFailed = (errmess) => ({
    type: ActionTypes.DEVICEDETAIL_FAILED,
    payload: errmess
});

export const addDeviceDetails = (deviceDetails) => ({
    type: ActionTypes.ADD_DEVICEDETAIL,
    payload: deviceDetails
});


// Chart Loading

export const fetchChart = (channel, measurement) => (dispatch) => {
    dispatch(chartLoading);
    //define last 24 hours to fetch
    var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    var today = new Date(Date.now());
    startTime = yesterday.toISOString();
    endTime = today.toISOString();
    //now fetch
    return fetch(baseUrl+'/data/'+channel+'/'+measurement+'?start='+startTime+'&end='+endTime)
        .then(response=> {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(chartData => dispatch(addChart(chartData)))
        .catch(error => dispatch(chartFailed(error.message)))
}

export const chartLoading = () => ({
    type: ActionTypes.CHART_LOADINGG,
    payload: null
})

export const chartFailed = (errmess) => ({
    type: ActionTypes.CHART_FAILED,
    payload: errmess
});

export const addChart = (chartData) => ({
    type: ActionTypes.ADD_CHART,
    payload: chartData
});