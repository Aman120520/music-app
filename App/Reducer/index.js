import { combineReducers } from "@reduxjs/toolkit";
import Authentication from "./Authentication";
import Settings from "./Settings";
import Constant from "../Network/Constant";
import { navigate } from "../Navigators/NavigationHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Categories from "./Categories";
import SoundTrack from "./SoundTrack";
import Quiz from "./Quiz";

const rootReducer = combineReducers({
  Authentication: Authentication,
  Settings: Settings,
  Categories: Categories,
  SoundTrack: SoundTrack,
  Quiz: Quiz,
});

export default (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined; // Reset state to initial state
  } else if (action.type === Constant.LOGOUT_SUCCESS) {
    state = undefined;
  } else if (
    action !== null &&
    action.hasOwnProperty("status") &&
    action.status !== undefined
  ) {
    if (action.status === 401) {
      setTimeout(async function () {
        try {
          var selectedTypes = await AsyncStorage.getItem("@userType");
          await AsyncStorage.clear();

          await AsyncStorage.setItem("@userType", selectedTypes);
          navigate("AuthenticationNavigator", {
            state: {
              routes: [
                {
                  name: "SignInScreen",
                  params: { type: selectedTypes },
                },
              ],
            },
          });
        } catch (error) {
          await AsyncStorage.clear();
          navigate("AuthenticationNavigator");
        }
      }, 500);
    }
  }

  return rootReducer(state, action);
};
