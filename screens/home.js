import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from 'C:\Users\User\scanF\App.js'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window"); // 화면의 너비와 높이를 얻음
const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      {/* 오른쪽 패널 */}
      <View style={styles.rightPanel}>
        <View style={styles.iconButton}>
          <Image
            source={require("./image/icon1.png")} // 이미지 파일 경로
            style={styles.iconImage}
          />
        </View>
        <View style={styles.iconButton}>
          <Image
            source={require("./image/icon2.png")} // 이미지 파일 경로
            style={styles.iconImage}
          />
        </View>
        <View style={styles.iconButton}>
          <Image
            source={require("./image/icon3.png")} // 이미지 파일 경로
            style={styles.iconImage}
          />
        </View>
        <View style={styles.iconButton}>
          <Image
            source={require("./image/icon4.png")} // 이미지 파일 경로
            style={styles.iconImage}
          />
        </View>
        <View style={styles.iconButton}>
          <Image
            source={require("./image/icon5.png")} // 이미지 파일 경로
            style={styles.iconImage}
          />
        </View>
        <View style={styles.iconButton} onPresds={() => NavigationContainer.navigae('App')}>
          <Image
            source={require("./image/icon6.png")} // 이미지 파일 경로
            style={styles.iconImage}
          />
        </View>
        <View style={styles.undoRedoContainer}>
          <View style={styles.undoRedoButton}>
            <Image
              source={require("./image/undo.png")} // 되돌리기 이미지
              style={styles.undoRedoImage}
            />
          </View>
          <View style={styles.undoRedoButton}>
            <Image
              source={require("./image/redo.png")} // 다시하기 이미지
              style={styles.undoRedoImage}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  rightPanel: {
    position: "absolute", // 위치를 절대값으로 설정
    right: 10, // 오른쪽에 배치
    top: height * 0.1, // 위쪽 간격을 줌
    width: width * 0.1, // 오른쪽 패널의 너비를 화면 너비에 비례하게 설정
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0c541",
    padding: 10,
    borderRadius: 10,
    height: "80%", // 패널 높이를 줄임
  },
  iconButton: {
    width: width * 0.04, // 아이콘 버튼 크기를 화면 너비에 비례하게 설정
    height: width * 0.04,
    marginVertical: height * 0.005, // 화면 높이에 비례한 간격
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  undoRedoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.14, // 화면 높이에 비례한 간격
    marginBottom: height * 0.005,
  },
  undoRedoButton: {
    width: width * 0.04, // 되돌리기/다시하기 버튼 크기를 화면 너비에 비례하게 설정
    height: width * 0.04,
    marginHorizontal: width * 0.005, // 화면 너비에 비례한 간격
  },
  undoRedoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default App;
