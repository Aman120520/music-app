import Constant from "../Network/Constant";
import DialogHelper from "../Helpers/DilogHelper";

const initialState = {
  isLoading: false,
  userData: {},
  profileImage: [],
  loginData: [],
  userStatus: 0,
  generalSettingsData: [],
  tosData: [],
  privayPolicyData: [],
  aboutUsData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Constant.IS_FROM_ROOT:
      return {
        ...state,
        isFromRoot: false,
      };

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

    ///////////SIGN IN ///////////////////
    case Constant.SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        userData: action.payload,
        error: undefined,
      };
    case Constant.SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    ////////////////FORGOT PASSWORD///////////////////
    case Constant.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.FORGOT_PASSWORD_SUCCESS:
      // DialogHelper.showAPIMessage(action.payload);
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: undefined,
      };
    case Constant.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    /////////////////CHANGE PASSWORD////////////////////
    case Constant.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: undefined,
      };
    case Constant.CHANGE_PASSWORD_FAILURE:
      DialogHelper.showAPIMessage(action.payload);
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    ///////////////// EDIT PROFILE ////////////////////
    case Constant.EDIT_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        // userData: action.payload,
        error: undefined,
      };
    case Constant.EDIT_PROFILE_FAILURE:
      DialogHelper.showAPIMessage(action.payload);
      return {
        ...state,
        // isLoading: false,
        type: action.type,
        error: action.error,
      };

    ///////////////// USER DETAILS ////////////////////
    case Constant.USER_DETAILS_REQUEST:
      return {
        ...state,
        // isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.USER_DETAILS_SUCCESS:
      return {
        ...state,
        // isLoading: false,
        type: action.type,
        error: undefined,
        userData: action.payload,
      };
    case Constant.USER_DETAILS_FAILURE:
      DialogHelper.showAPIMessage(action.payload);
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    ///////////////// LOGOUT ////////////////////
    case Constant.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: undefined,
        userData: action.payload,
      };
    case Constant.LOGOUT_FAILURE:
      DialogHelper.showAPIMessage(action.payload);
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    ///////////////// TERMS OF SERVICE ////////////////////
    case Constant.TERMS_OF_SERVICE_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.TERMS_OF_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: undefined,
        tosData: action.payload.data,
      };
    case Constant.TERMS_OF_SERVICE_FAILURE:
      DialogHelper.showAPIMessage(action.payload);
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    ///////////////// TERMS OF SERVICE ////////////////////
    case Constant.PRIVACY_POLICY_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.PRIVACY_POLICY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: undefined,
        privayPolicyData: action.payload.data,
      };
    case Constant.PRIVACY_POLICY_FAILURE:
      DialogHelper.showAPIMessage(action.payload);
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    ///////////////// ABOUT US ////////////////////
    case Constant.ABOUT_US_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.ABOUT_US_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: undefined,
        aboutUsData: action.payload.data,
      };
    case Constant.ABOUT_US_FAILURE:
      DialogHelper.showAPIMessage(action.payload);
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
