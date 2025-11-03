import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Images } from "../../Resources/Images";
import { ScaleSize } from "../../Resources/ScaleSize";
import { Colors } from "../../Resources/Colors";
import { AppFonts } from "../../Resources/AppFonts";
import { TextFontSize } from "../../Resources/TextFontSize";
import { Strings } from "../../Resources/Strings";
import { useDispatch, useSelector } from "react-redux";
import { getQuizResult } from "../../Actions/Quiz";
import Utils from "../../Helpers/Utils";
import { ModalProgressLoader } from "../../Components/Comman";

const QuizResultScreen = ({ navigation, route }) => {
  const { noOfQuestions, correctAnswers, wrongAnswers, isFromQuizList } =
    route.params;
  const { userData } = useSelector((state) => state.Authentication);
  const { QuizResult, isLoading } = useSelector((state) => state.Quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    getQuizQuestions();
  }, []);

  const getQuizQuestions = async () => {
    try {
      var body = {
        user_id: userData?.id,
        no_of_questions: noOfQuestions,
        total_correct_questions: correctAnswers,
        total_wrong_questions: wrongAnswers,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          getQuizResult(body, async (data, isSuccess) => {
            if (isSuccess) {
            }
          })
        );
      }
    } catch (error) {}
  };

  // Function to return a compliment based on result percentage
  const getCompliment = (percentage) => {
    if (percentage >= 90) {
      return "Excellent Work!";
    } else if (percentage >= 75) {
      return "Great Job!";
    } else if (percentage >= 50) {
      return "Good Effort!";
    } else {
      return "Keep Trying!";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#77c3e1" }}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor={"#77c3e1"} barStyle="light-content" />
        <ModalProgressLoader visible={isLoading} />
        <LinearGradient
          colors={["#77c3e1", "#379bca", "#77c3e1"]}
          style={styles.linearGradient}
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Image source={Images.back_icon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{Strings.quiz_results}</Text>
          <Image source={Images.quiz_result} style={styles.quizIcon} />
          <Text style={styles.percentageText}>
            {QuizResult?.result_percentage}%
          </Text>
          <Text style={styles.remarkText}>
            {getCompliment(QuizResult?.result_percentage)}
          </Text>
          <Text style={styles.scoreText}>
            You scored {QuizResult?.total_correct_questions} out of{" "}
            {noOfQuestions}!
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (isFromQuizList) {
                navigation.goBack();
              } else {
                navigation.navigate("DrawerNavigator");
              }
            }}
          >
            <Text style={styles.backButtonText}>{Strings.back}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizResultScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: ScaleSize.spacing_large,
    paddingBottom: ScaleSize.spacing_large,
  },
  headerText: {
    alignSelf: "center",
    color: Colors.white,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.extra_large_text * 1.2,
    width: "100%",
    textAlign: "center",
  },
  quizIcon: {
    height: ScaleSize.large_image * 1.2,
    width: ScaleSize.large_image * 1.2,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: ScaleSize.spacing_medium,
  },
  percentageText: {
    alignSelf: "center",
    color: Colors.white,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.extra_large_text * 2,
    width: "100%",
    textAlign: "center",
  },
  remarkText: {
    alignSelf: "center",
    color: Colors.white,
    fontFamily: AppFonts.bold,
    bottom: ScaleSize.spacing_small,
    fontSize: TextFontSize.large_text * 1.2,
    width: "100%",
    textAlign: "center",
  },
  scoreText: {
    alignSelf: "center",
    color: Colors.white,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.large_text,
    width: "100%",
    textAlign: "center",
    top: ScaleSize.spacing_very_small,
  },
  backButton: {
    height: ScaleSize.spacing_extra_large,
    width: "100%",
    marginTop: ScaleSize.spacing_extra_large * 1.2,
    alignSelf: "center",
    padding: ScaleSize.spacing_medium,
    borderRadius: ScaleSize.primary_border_radius,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  backButtonText: {
    fontFamily: AppFonts.bold,
    color: Colors.black,
    fontSize: TextFontSize.small_text + 3,
  },
  backBtn: {
    alignSelf: "flex-start",
    height: ScaleSize.small_image,
    width: ScaleSize.small_image,
    padding: ScaleSize.spacing_large * 1.2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backIcon: {
    height: "100%",
    width: "100%",
    position: "absolute",
    resizeMode: "contain",
    tintColor: Colors.white,
  },
});
