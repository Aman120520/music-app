import Constant from "../Network/Constant";
import API from "../Network/Api";

export function getQuizQuestionList(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.QUIZ_QUESTION_LIST_REQUEST,
      body: body,
      isLoading: true,
    });
    return API.post("quiz_questions/quiz_question_listing", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.QUIZ_QUESTION_LIST_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.QUIZ_QUESTION_LIST_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.QUIZ_QUESTION_LIST_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function getQuizResult(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.QUIZ_RESULT_REQUEST,
      body: body,
      isLoading: true,
    });
    return API.post("quiz_questions/completed_quiz", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.QUIZ_RESULT_SUCCESS,
            payload: responseData.data,
            isLoading: false,
          });
        } else {
          callback(responseData.data, false);
          dispatch({
            type: Constant.QUIZ_RESULT_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.QUIZ_RESULT_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}

export function myQuizList(body, callback) {
  return (dispatch) => {
    dispatch({
      type: Constant.MY_QUIZ_LIST_REQUEST,
      body: body,
      page: body.page,
      isLoading: true,
    });
    return API.post("quiz_questions/my_quiz", body)
      .then((response) => {
        const responseData = response.data;
        if (responseData.success === "yes" && responseData.data) {
          callback(responseData, true);
          dispatch({
            type: Constant.MY_QUIZ_LIST_SUCCESS,
            payload: responseData,
            page: body.page,
            isLoading: false,
          });
        } else {
          callback(responseData, false);
          dispatch({
            type: Constant.MY_QUIZ_LIST_FAILURE,
            isLoading: false,
            payload: responseData,
          });
        }
      })
      .catch((error) => {
        callback(error.response, false);
        dispatch({
          type: Constant.MY_QUIZ_LIST_FAILURE,
          isLoading: false,
          payload: error,
        });
      });
  };
}
