import Constant from '../Network/Constant';
import DialogHelper from '../Helpers/DilogHelper';

const initialState = {
  isLoading: false,
  userData: {},
  categoryList: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    /////////////////SIGN UP////////////////////
    case Constant.NEW_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.NEW_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        userData: action.payload,
        error: undefined,
      };
    case Constant.NEW_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    /////////////////CATEGORY LISTING////////////////////
    case Constant.CATEGORY_LISTING_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.CATEGORY_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        categoryList: action?.payload?.data,
        error: undefined,
      };
    case Constant.CATEGORY_LISTING_FAILURE:
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
