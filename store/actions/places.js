import {
  ADD_PLACE,
  DELETE_PLACE,
  SELECT_PLACE,
  DESELECT_PLACE,
  CONS_START,
  CONS_SUCCESS
} from './actionTypes';

export const addPlace = placeName => {
  return {
    type: ADD_PLACE,
    placeName: placeName
  };
};

export const deletePlace = () => {
  return {
    type: DELETE_PLACE
  };
};

export const selectPlace = key => {
  return {
    type: SELECT_PLACE,
    placeKey: key
  };
};

export const deselectPlace = () => {
  return {
    type: DESELECT_PLACE
  };
};

export const getCons = () => dispatch => {
  dispatch({
    type: CONS_START
  });
  return axios
    .get('https://key-conservation-staging.herokuapp.com/api/cons')
    .then(res => {
      console.log("hello")
      dispatch({
        type: CONS_SUCCESS,
        payload: res.data
      }).catch(err => {
        console.log(err);
      });
    });
};
