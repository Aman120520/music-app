import Constant from "../Network/Constant";
import DialogHelper from "../Helpers/DilogHelper";

const initialState = {
  isLoading: false,
  quizzesLoading: false,
  QuizQuestionList: [],
  QuizResult: [],
  MyQuizzes: [],
  quizzesPage: 1,
  quizziesTotalPage: 100,
  MyQuizzesData: [],
  totalQuizRecord: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    /////////////////QUIZ QUESTION LIST////////////////////
    case Constant.QUIZ_QUESTION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.QUIZ_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        QuizQuestionList: action?.payload,
        error: undefined,
      };
    case Constant.QUIZ_QUESTION_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    /////////////////QUIZ RESULT////////////////////
    case Constant.QUIZ_RESULT_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.QUIZ_RESULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        QuizResult: action?.payload,
        error: undefined,
      };
    case Constant.QUIZ_RESULT_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    /////////////////MY QUIZ LIST////////////////////
    case Constant.MY_QUIZ_LIST_REQUEST:
      return {
        ...state,
        quizzesLoading: true,
        quizzesPage: action.body.page,
        isLoading: state.page === 1 || state.page === "1" ? true : false,
        type: action.type,
        error: action.error,
      };
    case Constant.MY_QUIZ_LIST_SUCCESS:
      const data = action?.payload?.data;
      return {
        ...state,
        isLoading: false,
        type: action.type,
        MyQuizzes:
          action?.payload.page === 1 || action.payload.page === "1"
            ? [...data]
            : [...state.MyQuizzes, ...data],
        quizzesLoading: false,
        quizziesTotalPage: action?.payload?.total_page,
        totalQuizRecord: action?.payload?.total_record,
        MyQuizzesData: action.payload,
        error: undefined,
      };
    case Constant.MY_QUIZ_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    default:
      return state;
  }
};
