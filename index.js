/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider as StoreProvider } from "react-redux";
import store from "./App/Store/Store";
import TrackPlayer from "react-native-track-player";

export default function Main() {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

TrackPlayer.registerPlaybackService(() => require("./service"));
