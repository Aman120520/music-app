import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";
import { Images } from "../Resources/Images";
import { ScaleSize } from "../Resources/ScaleSize";
import { AppFonts } from "../Resources/AppFonts";
import { TextFontSize } from "../Resources/TextFontSize";
import { Colors } from "../Resources/Colors";
import { useSelector } from "react-redux";
import { Strings } from "../Resources/Strings";
import { SafeAreaView } from "react-native";

const CustomDrawer = ({ logout, ...props }) => {
  const { userData } = useSelector((state) => state.Authentication);
  return (
    <SafeAreaView style={{ backgroundColor: Colors.safeAreaBg, flex: 1 }}>
      <ImageBackground source={Images.bg} style={{ flexGrow: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
        >
          <View style={styles.headerContainer}>
            <View
              style={[
                styles.profileContainer,
                {
                  padding: userData?.profile_picture
                    ? null
                    : ScaleSize.spacing_small + 5,
                },
              ]}
            >
              <Image
                source={
                  userData?.profile_picture
                    ? { uri: userData?.profile_picture }
                    : Images.doll_placeholder_logo
                }
                style={[
                  styles.profileImage,
                  {
                    tintColor: userData?.profile_picture ? null : Colors.black,
                    resizeMode: userData?.profile_picture ? "cover" : "contain",
                  },
                ]}
              />
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.nameText}
            >
              {userData?.full_name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.emailText}
            >
              {userData?.email}
            </Text>
          </View>

          <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
            <DrawerItemList {...props} />
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 40,
            }}
          >
            <TouchableOpacity
              style={styles.PrimaryBtn}
              onPress={() => logout()}
            >
              <Text style={styles.PrimaryBtnText}>{Strings.logout}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: "#ccc",
    paddingTop: 10,
    fontWeight: "500",
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
  },
  headerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: ScaleSize.spacing_medium,
    marginTop: ScaleSize.spacing_medium,
  },
  profileContainer: {
    height: ScaleSize.very_small_image,
    width: ScaleSize.very_small_image,
    backgroundColor: Colors.light_gray,
    borderRadius: ScaleSize.small_border_radius,
    overflow: "hidden",
  },
  profileImage: {
    height: "100%",
    width: "100%",
    // elevation: 10,
    resizeMode: "cover",
  },
  nameText: {
    fontFamily: AppFonts.extra_bold,
    fontSize: TextFontSize.very_large_text + 1,
    color: Colors.black,
    width: "80%",
  },
  emailText: {
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text - 2,
    color: Colors.black,
    width: "80%",
    bottom: Platform.OS === "ios" ? 0 : ScaleSize.spacing_very_small,
  },
  PrimaryBtn: {
    backgroundColor: Colors.primary,
    height: ScaleSize.spacing_large * 2,
    width: "100%",
    margin: ScaleSize.spacing_semi_medium,
    alignSelf: "center",
    borderRadius: ScaleSize.primary_border_radius,
    justifyContent: "center",
    alignItems: "center",
  },
  PrimaryBtnText: {
    fontFamily: AppFonts.bold,
    color: Colors.white,
    top: Platform.OS === "ios" ? null : ScaleSize.font_spacing,
    fontSize: TextFontSize.small_text + 1,
  },
});
