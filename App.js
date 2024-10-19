import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import IconDraw from './screens/IconDrawing';
import ImageDraw from './screens/ImageDrawing';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="IconDraw" component={IconDraw} />
        <Stack.Screen name="ImageDraw" component={ImageDraw} />
      </Stack.Navigator>

      <View style={styles.container}>
        {/* 왼쪽 중앙의 버튼들 */}
        <View style={styles.buttonContainer}> 
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IconDraw')}> {/* 아이콘 그리기*/}
            <Text style={styles.buttonText}>아이콘 그리기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ImageDraw')}> {/* 캐릭터 그리기*/}
            <Text style={styles.buttonText}>캐릭터 그리기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}> {/* 홈 화면으로 이동*/}
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>

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
          <View style={styles.iconButton}>
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
    </NavigationContainer>
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
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f0c541", // 버튼의 배경색
    padding: height * 0.015, // 화면 높이에 비례한 패딩
    margin: width * 0.01, // 화면 너비에 비례한 마진
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.3, // 버튼의 너비를 화면 너비에 비례하게 설정
  },
  buttonText: {
    fontSize: height * 0.025, // 화면 높이에 비례한 폰트 크기
    fontWeight: "bold",
    color: "#000",
  },
  rightPanel: {
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
