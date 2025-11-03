import Constant from "../Network/Constant";
import API from "../Network/Api";

export function SignUp(body, callback) {
  console.log(body);
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
        // return API.post('authentication/' + endPoint, body)
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

export function SoundTrackListing(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.SOUNDTRACK_LISTING_REQUEST,
      body: body,
      isLoading: true,
    });
    return API.post("soundtracks/soundtrack_listing", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.SOUNDTRACK_LISTING_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.SOUNDTRACK_LISTING_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.SOUNDTRACK_LISTING_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function getSoundTrackDetails(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.SOUNDTRACK_DETAILS_REQUEST,
      body: body,
      isLoading: true,
    });
    return API.post("soundtracks/soundtrack_details", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.SOUNDTRACK_DETAILS_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.SOUNDTRACK_DETAILS_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.SOUNDTRACK_DETAILS_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export const updateFavoriteStatus = (trackId, isFavorite) => {
  return {
    type: Constant.UPDATE_FAVORITE_STATUS,
    payload: {
      id: trackId,
      is_favorite: isFavorite,
    },
  };
};

export function AddToFavorites(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.ADD_TO_FAVORITES_REQUEST,
      body: body,
      isLoading: true,
    });
    return API.post("soundtracks/add_favorites", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.ADD_TO_FAVORITES_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.ADD_TO_FAVORITES_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.ADD_TO_FAVORITES_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function favoriteTrackList(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.FAVORITES_LIST_REQUEST,
      body: body,
      page: body.page,
      isLoading: true,
    });
    return API.post("soundtracks/favorite_soundtracks", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.FAVORITES_LIST_SUCCESS,
            payload: responseData,
            page: body.page,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.FAVORITES_LIST_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.FAVORITES_LIST_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function SoundTrackView(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.SOUNDTRACK_VIEW_REQUEST,
      body: body,
    });
    return API.post("soundtracks/soundtrack_view", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.SOUNDTRACK_VIEW_SUCCESS,
            payload: responseData.data,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.SOUNDTRACK_VIEW_FAILURE,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.SOUNDTRACK_VIEW_FAILURE,
          payload: error,
        });
      });
  };
}
