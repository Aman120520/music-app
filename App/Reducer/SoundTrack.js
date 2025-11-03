import Constant from "../Network/Constant";
import DialogHelper from "../Helpers/DilogHelper";

const initialState = {
  isLoading: false,
  userData: {},
  soundTrackList: {},
  soundTrackDetails: {},
  favoriteList: [],
  favoritesLoading: false,
  favoritesPage: 1,
  favoritesTotalPage: 100,
  MyFavoritesData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    /////////////////SOUNDTRACK LISTING////////////////////
    case Constant.SOUNDTRACK_LISTING_REQUEST:
      return {
        ...state,
        isLoading: true,
        soundTrackList: [],
        type: action.type,
        error: action.error,
      };
    case Constant.SOUNDTRACK_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        soundTrackList: action?.payload,
        error: undefined,
      };
    case Constant.SOUNDTRACK_LISTING_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    /////////////////UPDATE FAVORITE STATUS////////////////////
    case Constant.UPDATE_FAVORITE_STATUS:
      return {
        ...state,
        soundTrackList: state.soundTrackList.map((track) =>
          track?.id === action?.payload?.id
            ? { ...track, is_favorite: action?.payload?.is_favorite }
            : track
        ),
      };

    /////////////////SOUNDTRACL DETAILS////////////////////
    case Constant.SOUNDTRACK_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        soundTrackList: [],
        type: action.type,
        error: action.error,
      };
    case Constant.SOUNDTRACK_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        soundTrackDetails: action?.payload,
        error: undefined,
      };
    case Constant.SOUNDTRACK_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    /////////////////ADD TO FAVORITES////////////////////
    case Constant.ADD_TO_FAVORITES_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
        error: action.error,
      };
    case Constant.ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        favoriteList: action?.payload,
        error: undefined,
      };
    case Constant.ADD_TO_FAVORITES_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    /////////////////FAVORITE LIST////////////////////
    case Constant.FAVORITES_LIST_REQUEST:
      return {
        ...state,
        favoritesLoading: true,
        favoritesPage: action.body.page,
        isLoading: state.page === 1 || state.page === "1" ? true : false,
        type: action.type,
        error: action.error,
      };
    case Constant.FAVORITES_LIST_SUCCESS:
      const data = action?.payload?.data;
      return {
        ...state,
        isLoading: false,
        type: action.type,
        favoriteList:
          action?.payload.page === 1 || action.payload.page === "1"
            ? [...data]
            : [...state.favoriteList, ...data],
        favoritesLoading: false,
        favoritesTotalPage: action?.payload?.data?.length,
        MyFavoritesData: action.payload,
        error: undefined,
      };
    case Constant.FAVORITES_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        type: action.type,
        error: action.error,
      };

    /////////////////SOUNDTRACK VIEW////////////////////
    case Constant.SOUNDTRACK_VIEW_REQUEST:
      return {
        ...state,
        type: action.type,
        error: action.error,
      };
    case Constant.SOUNDTRACK_VIEW_SUCCESS:
      return {
        ...state,
        type: action.type,
        error: undefined,
      };
    case Constant.SOUNDTRACK_VIEW_FAILURE:
      return {
        ...state,
        type: action.type,
        error: action.error,
      };

    default:
      return state;
  }
};
