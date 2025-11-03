import Constant from "../Network/Constant";
import API from "../Network/Api";

export function SignUp(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.NEW_SIGNUP_REQUEST,
      body: body,
      isLoading: true,
    });
    return (
      API.post("authentication/sign_up", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          const responseData = response.data;
          if (responseData.success === "yes" && responseData.data) {
            callback(responseData, true);
            dispatch({
              type: Constant.NEW_SIGNUP_SUCCESS,
              payload: responseData.data,
              isLoading: false,
            });
          } else {
            callback(responseData.data, false);
            dispatch({
              type: Constant.NEW_SIGNUP_FAILURE,
              isLoading: false,
              payload: responseData,
            });
          }
        })
        .catch((error) => {
          callback(error.response, false);
          dispatch({
            type: Constant.NEW_SIGNUP_FAILURE,
            isLoading: false,
            payload: error,
          });
        })
    );
  };
}

export function SignIn(body, callback) {
  return (dispatch) => {
    dispatch({ type: Constant.SIGNIN_REQUEST, body: body, isLoading: true });
    return API.post("authentication/login", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.SIGNIN_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.SIGNIN_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.SIGNIN_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function ForgotPassword(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.FORGOT_PASSWORD_REQUEST,
      body: body,
      isLoading: true,
    });
    return API.post("authentication/forgot_password", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.FORGOT_PASSWORD_SUCCESS,
            payload: response.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.FORGOT_PASSWORD_FAILURE,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({ type: Constant.FORGOT_PASSWORD_FAILURE, payload: error });
      });
  };
}

export function privacyPolicy() {
  return (dispatch) => {
    dispatch({ type: Constant.PRIVACY_POLICY_REQUEST, isLoading: true });
    return API.get("cms/privacy_policy")
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          dispatch({
            type: Constant.PRIVACY_POLICY_SUCCESS,
            isLoading: false,
            payload: response.data,
          });
        } else {
          dispatch({
            type: Constant.PRIVACY_POLICY_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: Constant.PRIVACY_POLICY_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function termsOfSerivce() {
  return (dispatch) => {
    dispatch({ type: Constant.TERMS_OF_SERVICE_REQUEST, isLoading: true });
    return API.get("cms/terms_conditions")
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          dispatch({
            type: Constant.TERMS_OF_SERVICE_SUCCESS,
            isLoading: false,
            payload: response.data,
          });
        } else {
          dispatch({
            type: Constant.TERMS_OF_SERVICE_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: Constant.TERMS_OF_SERVICE_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function aboutUs() {
  return (dispatch) => {
    dispatch({ type: Constant.ABOUT_US_REQUEST, isLoading: true });
    return API.get("cms/about")
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          dispatch({
            type: Constant.ABOUT_US_SUCCESS,
            isLoading: false,
            payload: response.data,
          });
        } else {
          dispatch({
            type: Constant.ABOUT_US_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: Constant.ABOUT_US_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function changePassword(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.CHANGE_PASSWORD_REQUEST,
      body: body,
      isLoading: true,
    });
    return API.post("authentication/change_password", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.CHANGE_PASSWORD_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.CHANGE_PASSWORD_FAILURE,
            isLoading: false,
            payload: error,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.CHANGE_PASSWORD_FAILURE,
          isLoading: false,
          status: error?.response?.status,
          payload: error,
        });
      });
  };
}

export function editProfile(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.EDIT_PROFILE_REQUEST,
      body: body,
      isLoading: true,
    });
    return API.post("authentication/update_profile", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.EDIT_PROFILE_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.EDIT_PROFILE_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.EDIT_PROFILE_FAILURE,
          isLoading: false,
          status: error?.response?.status,
          payload: error,
        });
      });
  };
}

export function userDetails(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.USER_DETAILS_REQUEST,
      body: body,
      isLoading: true,
    });
    return API.post("authentication/user_details", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.USER_DETAILS_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.USER_DETAILS_FAILURE,
            payload: responseData,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.USER_DETAILS_FAILURE,
          payload: error,
          status: error?.response?.status,
          isLoading: false,
        });
      });
  };
}

export function logout(body, callback) {
  return (dispatch) => {
    dispatch({ type: Constant.LOGOUT_REQUEST, body: body, isLoading: true });
    return API.post("authentication/logout", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.LOGOUT_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.LOGOUT_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.LOGOUT_FAILURE,
          isLoading: false,
          status: error?.response?.status,
          payload: error,
        });
      });
  };
}
