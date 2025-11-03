import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Colors, Images } from "../../Resources";
import { PrimaryButton } from "../../Components/Comman";
import { ScaleSize } from "../../Resources/ScaleSize";
import { Strings } from "../../Resources/Strings";

const GetStartedScreen = ({ navigation, route }) => {
  return (
    <ImageBackground source={Images.bg} style={styles.container}>
      <StatusBar backgroundColor={Colors.statusbar} barStyle={"dark-content"} />
      <Image source={Images.logo} style={styles.splash_logo} />

      <View style={styles.startButton}>
        <PrimaryButton
          string={Strings.get_started}
          onPress={() => navigation.replace("SignInScreen")}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  splash_logo: {
    width: "100%",
    resizeMode: "contain",
  },
  startButton: {
    position: "absolute",
    bottom: ScaleSize.spacing_large - 5,
    width: "100%",
    paddingHorizontal: ScaleSize.spacing_large,
  },
});
