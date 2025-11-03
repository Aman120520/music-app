import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScaleSize } from "../../Resources/ScaleSize";
import CommonHeader from "../../Components/Comman/CommonHeader";
import { Images } from "../../Resources/Images";
import { Colors } from "../../Resources/Colors";
import { AppFonts } from "../../Resources/AppFonts";
import { useDispatch, useSelector } from "react-redux";
import { TextFontSize } from "../../Resources/TextFontSize";
import * as Progress from "react-native-progress";
import { ModalProgressLoader, PrimaryButton } from "../../Components/Comman";
import Utils from "../../Helpers/Utils";
import { getQuizQuestionList } from "../../Actions/Quiz";

const QuizScreen = ({ navigation, route }) => {
  const [progress, setProgress] = useState(0.1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedOption, setSelectedOption] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const { totalQuestion } = route.params;
  const [isOptionSelect, setIsOptionSelect] = useState(false);
  const { QuizQuestionList, isLoading } = useSelector((state) => state.Quiz);
  const { userData } = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();

  const optionsData = [
    {
      id: 1,
      option: QuizQuestionList[questionNumber - 1]?.option1,
      isTrue:
        QuizQuestionList[questionNumber - 1]?.correct_answer === 1
          ? true
          : false,
    },
    {
      id: 2,
      option: QuizQuestionList[questionNumber - 1]?.option2,
      isTrue:
        QuizQuestionList[questionNumber - 1]?.correct_answer === 2
          ? true
          : false,
    },
    {
      id: 3,
      option: QuizQuestionList[questionNumber - 1]?.option3,
      isTrue:
        QuizQuestionList[questionNumber - 1]?.correct_answer === 3
          ? true
          : false,
    },
    {
      id: 4,
      option: QuizQuestionList[questionNumber - 1]?.option4,
      isTrue:
        QuizQuestionList[questionNumber - 1]?.correct_answer === 4
          ? true
          : false,
    },
  ];

  useEffect(() => {
    const newProgress = questionNumber / totalQuestion;
    setProgress(newProgress);
  }, [questionNumber]);

  useEffect(() => {
    getQuizQuestions();
  }, []);

  const getQuizQuestions = async () => {
    try {
      var body = {
        user_id: userData?.id,
        no_of_questions: totalQuestion,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          getQuizQuestionList(body, async (data, isSuccess) => {
            if (isSuccess) {
            }
          })
        );
      }
    } catch (error) {}
  };

  const handleSelectOption = (item) => {
    setSelectedOption(item?.id);
    setIsOptionSelect(true);
    if (item?.isTrue) {
      setCorrectAnswer(correctAnswer + 1);
    } else {
      setWrongAnswer(wrongAnswer + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.safeAreaBg }}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          backgroundColor={Colors.statusbar}
          barStyle={"dark-content"}
        />
        <ImageBackground source={Images.bg} style={styles.bgImg}>
          <ModalProgressLoader visible={isLoading} />
          <CommonHeader
            leftIcon={Images.back_icon}
            onLeftButtonPress={() => navigation.goBack()}
            title={"Bible Quiz"}
          />
          <Text style={styles.questionCountText}>
            Question {questionNumber} 0f {totalQuestion}
          </Text>
          <Progress.Bar
            progress={progress}
            width={null}
            animationType={"spring"}
            height={ScaleSize.spacing_small}
            borderRadius={10}
            color={Colors.primary}
            style={styles.progressBar}
          />
          <Text style={styles.questionText}>
            {!isLoading && QuizQuestionList[questionNumber - 1]?.question}
          </Text>
          <View style={styles.optionTabsContainer}>
            {optionsData?.map((item, index) => {
              const isSelected = selectedOption === item.id;
              return (
                <TouchableOpacity
                  style={[
                    styles.optionTab,
                    {
                      backgroundColor: isSelected
                        ? item.isTrue
                          ? Colors.light_green
                          : Colors.gray
                        : Colors.lightest_gray,
                    },
                  ]}
                  disabled={selectedOption ? true : false}
                  onPress={() => handleSelectOption(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: isSelected ? Colors.white : Colors.black,
                      },
                    ]}
                  >
                    {!isLoading && item.option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.nextButton}>
            <PrimaryButton
              string={"Next"}
              onPress={() => {
                if (isOptionSelect === true) {
                  if (
                    questionNumber === totalQuestion ||
                    questionNumber === QuizQuestionList?.length
                  ) {
                    navigation.replace("QuizResultScreen", {
                      noOfQuestions: questionNumber,
                      correctAnswers: correctAnswer,
                      wrongAnswers: wrongAnswer,
                      isFromQuizList: false,
                    });
                  } else {
                    setSelectedOption(null);
                    setQuestionNumber(questionNumber + 1);
                  }
                  setIsOptionSelect(false);
                } else {
                  Alert.alert("Please select an Answer.");
                }
              }}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  bgImg: {
    flex: 1,
    paddingHorizontal: ScaleSize.spacing_large,
    paddingBottom: ScaleSize.spacing_small,
  },
  questionCountText: {
    color: Colors.black,
    alignSelf: "center",
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.large_text,
    marginTop: ScaleSize.spacing_medium,
  },
  progressBar: {
    alignSelf: "center",
    width: "100%",
    borderWidth: 0,
    marginTop: ScaleSize.spacing_medium,
    backgroundColor: "#cde5f2",
  },
  questionText: {
    marginVertical: ScaleSize.spacing_medium,
    color: Colors.black,
    fontFamily: AppFonts.extra_bold,
    width: "100%",
    fontSize: TextFontSize.large_text * 1.1,
  },
  optionTabsContainer: {
    justifyContent: "center",
    marginBottom: ScaleSize.spacing_extra_large * 1.3,
    alignItems: "center",
    width: "100%",
  },
  optionTab: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: ScaleSize.small_border_radius,
    padding: ScaleSize.spacing_medium,
    marginBottom: ScaleSize.spacing_semi_large,
  },
  optionText: {
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.very_small_text,
  },
  nextButton: {
    width: "100%",
    alignSelf: "center",
    bottom: ScaleSize.spacing_semi_medium,
  },
});
