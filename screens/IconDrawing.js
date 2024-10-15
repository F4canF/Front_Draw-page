import React, { useRef, useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Exit from './screens/home.js';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { PanResponder } from "react-native";

const { width, height } = Dimensions.get("window");
const Stack = createStackNavigator();

// 이미지 목록 (RandImage 폴더에서 이미지를 가져옴)
const images = [
  require('./RandImage/image1.png'),
  require('./RandImage/image2.png'),
  require('./RandImage/image3.png'),
  require('./RandImage/image4.png'),
  require('./RandImage/image5.png'),
  require('./RandImage/image6.png'),
  require('./RandImage/image7.png'),
  require('./RandImage/image8.png'),
  require('./RandImage/image9.png'),
  require('./RandImage/image10.png'),
];

const App = () => {
  const [paths, setPaths] = useState([]); // 그린 경로들
  const [redoPaths, setRedoPaths] = useState([]); // undo 후 redo 가능한 경로들
  const [currentPath, setCurrentPath] = useState(''); // 현재 그리는 경로
  const [strokeColor, setStrokeColor] = useState('black'); // 선 색상
  const [strokeWidth, setStrokeWidth] = useState(4); // 선 굵기
  const [randomImage, setRandomImage] = useState(null); // 랜덤 이미지 상태

  useEffect(() => {
    // 컴포넌트가 렌더링될 때 무작위 이미지를 선택
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  // PanResponder 설정
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { moveX, moveY } = gestureState;
        const newPath = `${currentPath} L ${moveX} ${moveY}`;
        setCurrentPath(newPath);
      },
      onPanResponderRelease: () => {
        setPaths([...paths, { path: currentPath, strokeColor, strokeWidth }]);
        setCurrentPath('');
        setRedoPaths([]);
      },
    })
  ).current;

  // 각 버튼의 기능
  const activatePen = () => {
    setStrokeColor('black');
    setStrokeWidth(4); // 볼펜
  };

  const activateFountainPen = () => {
    setStrokeColor('black');
    setStrokeWidth(2); // 만년필
  };

  const activatePencil = () => {
    setStrokeColor('black');
    setStrokeWidth(6); // 연필
  };

  const activateHighlighter = () => {
    setStrokeColor('yellow');
    setStrokeWidth(8); // 형광펜
  };

  const undo = () => {
    if (paths.length > 0) {
      const newPaths = [...paths];
      const lastPath = newPaths.pop();
      setRedoPaths([lastPath, ...redoPaths]);
      setPaths(newPaths);
    }
  };

  const redo = () => {
    if (redoPaths.length > 0) {
      const newRedoPaths = [...redoPaths];
      const pathToRestore = newRedoPaths.shift();
      setPaths([...paths, pathToRestore]);
      setRedoPaths(newRedoPaths);
    }
  };

  const goToOtherPage = () => {
    // 페이지 이동 기능. 여기서 원하는 페이지로 이동 설정
  };

  const goHome = () => {
    // 홈으로 나가는 기능
  };

  return (
    <View style={styles.container}>
      {/* 무작위 이미지 영역 */}
      {randomImage && (
        <Image source={randomImage} style={styles.randomImage} />
      )}

      {/* 그림판 영역 */}
      <View {...panResponder.panHandlers} style={styles.canvas}>
        <Svg style={StyleSheet.absoluteFill}>
          {paths.map((p, index) => (
            <Path
              key={index}
              d={p.path}
              stroke={p.strokeColor}
              strokeWidth={p.strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          <Path
            d={currentPath}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      {/* 오른쪽 패널 */}
      <View style={styles.rightPanel}>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activatePen}>
            <Image
              source={require("./image/icon1.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activateFountainPen}>
            <Image
              source={require("./image/icon2.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activatePencil}>
            <Image
              source={require("./image/icon3.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activateHighlighter}>
            <Image
              source={require("./image/icon4.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={goToOtherPage}>
            <Image
              source={require("./image/icon6.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.undoRedoContainer}>
          <TouchableOpacity onPress={undo}>
            <Image
              source={require("./image/undo.png")}
              style={styles.undoRedoImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={redo}>
            <Image
              source={require("./image/redo.png")}
              style={styles.undoRedoImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 나가기 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exit')}>
          <Text style={styles.buttonText}>나가기</Text>
        </TouchableOpacity>
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
  randomImage: {
    position: "absolute",
    top: height * 0.25,
    width: width * 0.6,
    height: height * 0.4,
    resizeMode: "contain",
  },
  canvas: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  rightPanel: {
    position: "absolute",
    right: 10,
    top: height * 0.1,
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0c541",
    padding: 10,
    borderRadius: 10,
    height: "80%",
  },
  iconButton: {
    width: width * 0.04,
    height: width * 0.04,
    marginVertical: height * 0.005,
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  undoRedoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.14,
    marginBottom: height * 0.005,
  },
  undoRedoImage: {
    width: width * 0.04,
    height: width * 0.04,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  button: {
    backgroundColor: "#f0c541",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 30,
  },
});

export default App;
