import {
  SET_HEALTH_STATUS_COLOR_ATP,
  SET_HEALTH_STATUS_COLOR_CALIB,
} from './types';

const initialState = {
  healthStatusColorAtp: 'red',
  healthStatusColorCalib: 'red',
};

const healthStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HEALTH_STATUS_COLOR_ATP:
      return {
        ...state,
        healthStatusColorAtp: action.payload,
      };
    case SET_HEALTH_STATUS_COLOR_CALIB:
      return {
        ...state,
        healthStatusColorCalib: action.payload,
      };
    default:
      return state;
  }
};

export default healthStatusReducer;
