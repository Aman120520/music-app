import Constant from '../Network/Constant';
import API from '../Network/Api';

export function SignUp(body, callback) {
  console.log(body);
  return dispatch => {
    dispatch({
      type: Constant.NEW_SIGNUP_REQUEST,
      body: body,
      isLoading: true,
    });
    return (
      API.post('authentication/sign_up', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        // return API.post('authentication/' + endPoint, body)
        .then(response => {
          const responseData = response.data;
          console.log('responseData', responseData);
          if (responseData.success === 'yes' && responseData.data) {
            console.log('res yes', responseData);
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
        .catch(error => {
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
  return dispatch => {
    dispatch({type: Constant.SIGNIN_REQUEST, body: body, isLoading: true});
    console.log('URL', Constant.BASE_URl);
    return API.post('authentication/login', body)
      .then(response => {
        const responseData = response.data;
        console.log('RESPONSEDATA', responseData);
        if (responseData.success === 'yes' && responseData.data) {
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
      .catch(error => {
        callback(error.response, false);
        dispatch({
          type: Constant.SIGNIN_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function CategoryListing() {
  return dispatch => {
    dispatch({type: Constant.CATEGORY_LISTING_REQUEST, isLoading: true});
    return API.get('categories/category_listing')
      .then(response => {
        const responseData = response.data;
        if (responseData.success === 'yes' && responseData.data) {
          dispatch({
            type: Constant.CATEGORY_LISTING_SUCCESS,
            isLoading: false,
            payload: response.data,
          });
        } else {
          dispatch({
            type: Constant.CATEGORY_LISTING_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: Constant.CATEGORY_LISTING_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}
