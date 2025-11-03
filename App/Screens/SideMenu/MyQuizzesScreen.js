import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DrawerSceneWrapper from "../../Components/Comman/DrawerSceneWrapper";
import { Images } from "../../Resources/Images";
import { ScaleSize } from "../../Resources/ScaleSize";
import Header from "../../Components/Comman/Drawer/Header";
import { AppFonts } from "../../Resources/AppFonts";
import { Colors } from "../../Resources/Colors";
import { useDispatch, useSelector } from "react-redux";
import { TextFontSize } from "../../Resources/TextFontSize";
import Utils from "../../Helpers/Utils";
import { myQuizList } from "../../Actions/Quiz";
import { ModalProgressLoader } from "../../Components/Comman";

const MyQuizzesScreen = ({ navigation, route }) => {
  const { userData } = useSelector((state) => state.Authentication);
  const { openDrawer } = navigation;
  const {
    MyQuizzes,
    quizzesPage,
    quizzesLoading,
    totalQuizRecord,
    quizziesTotalPage,
    isLoading,
  } = useSelector((state) => state.Quiz);
  const [refreshingData, setRefreshingData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getQuizList(1);
  }, []);

  const getQuizList = async (page) => {
    try {
      var body = {
        user_id: userData?.id,
        page: page,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          myQuizList(body, async (data, isSuccess) => {
            if (isSuccess) {
              setRefreshingData(false);
            }
          })
        );
      }
    } catch (error) {}
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate("HomeNavigator", {
            screen: "QuizResultScreen",
            params: {
              noOfQuestions: item?.no_of_questions,
              correctAnswers: item?.total_correct_questions,
              wrongAnswers: item?.total_wrong_questions,
              isFromQuizList: true,
            },
          });
        }}
      >
        <Image source={Images.quiz_main_icon} style={styles.quizIcon} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitleText}>
            Quiz {totalQuizRecord - index}
          </Text>
          <Text style={styles.itemDescriptionText}>
            You scored {item?.total_correct_questions} out of{" "}
            {item?.no_of_questions}!
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleEndReached = () => {
    if (MyQuizzes?.length > 0 && quizzesPage < quizziesTotalPage) {
      getQuizList(quizzesPage + 1);
    } else {
      null;
    }
  };

  /////////// Function for refresh //////////
  const refresh = () => {
    setRefreshingData(true);
    getQuizList(1);
  };

  return (
    <DrawerSceneWrapper>
      <ImageBackground style={styles.container} source={Images.bg}>
        <Header
          title={"My Quizzes"}
          onLeftButtonPress={openDrawer}
          leftIcon={Images.menu_icon}
          rightIcon={{ uri: userData?.profile_picture_thumb }}
          isProfileShow={true}
        />
        <ModalProgressLoader visible={isLoading} />
        {MyQuizzes?.length === 0 ? (
          <Text
            style={{
              fontSize: TextFontSize.medium_text * 1,
              fontFamily: AppFonts.medium,
              color: Colors.black,
              top: ScaleSize.spacing_extra_large * 4.5,
            }}
          >
            No data found!
          </Text>
        ) : (
          <FlatList
            style={styles.flatlist}
            data={MyQuizzes}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReached={() => handleEndReached()}
            refreshControl={
              <RefreshControl refreshing={refreshingData} onRefresh={refresh} />
            }
            ListFooterComponent={() =>
              quizzesPage > 1 &&
              quizzesLoading && (
                <ActivityIndicator
                  animating
                  size={ScaleSize.spacing_medium * 2}
                  color={Colors.primary}
                />
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ImageBackground>
    </DrawerSceneWrapper>
  );
};

export default MyQuizzesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: ScaleSize.spacing_large,
    paddingVertical: ScaleSize.spacing_semi_medium,
  },
  flatlist: {
    flexGrow: 1,
    width: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    borderRadius: ScaleSize.primary_border_radius * 1.4,
    padding: ScaleSize.spacing_medium - 3,
    backgroundColor: Colors.primary,
    marginVertical: ScaleSize.spacing_semi_medium - 4,
  },
  quizIcon: {
    height: ScaleSize.large_icon * 3,
    width: ScaleSize.large_icon * 3,
    resizeMode: "contain",
    marginRight: ScaleSize.spacing_small,
  },
  itemTextContainer: {
    paddingHorizontal: ScaleSize.spacing_small,
  },
  itemTitleText: {
    color: Colors.white,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.medium_text - 2,
  },
  itemDescriptionText: {
    color: Colors.white,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text - 1,
  },
});
