import { SET_HEALTH_STATUS_COLOR_ATP, SET_HEALTH_STATUS_COLOR_CALIB } from './types';

export const setHealthStatusColorAtp = (color) => ({
    type: SET_HEALTH_STATUS_COLOR_ATP,
    payload: color,
});

export const setHealthStatusColorCalib = (color) => ({
    type: SET_HEALTH_STATUS_COLOR_CALIB,
    payload: color,
});