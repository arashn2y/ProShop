import axios from "axios";
import * as constants from "../constants/userConstants";

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: constants.USER_LOGIN_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/login", { email, password }, config);

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({ type: constants.USER_LOGOUT });
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: constants.USER_REGISTER_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users", { name, email, password }, config);

    dispatch({ type: constants.USER_REGISTER_SUCCESS, payload: data });
    dispatch({
      type: constants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.USER_DETAILS_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: constants.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.userInfo.token;
    dispatch({ type: constants.USER_UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put("/api/users/profile", user, config);

    dispatch({ type: constants.USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: constants.USER_DETAILS_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};