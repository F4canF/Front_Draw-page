import React, { useRef, useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Exit from './screens/home.js';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { PanResponder } from "react-native";

// SVG 아이콘 가져오기
import Icon1 from './RandImage/icon1.svg';
import Icon2 from './RandImage/icon2.svg';
import Icon3 from './RandImage/icon3.svg';
import Icon4 from './RandImage/icon4.svg';

const { width, height } = Dimensions.get("window");
const Stack = createStackNavigator();

const App = () => {
  const [paths, setPaths] = useState([]); // 그린 경로들
  const [redoPaths, setRedoPaths] = useState([]); // undo 후 redo 가능한 경로들
  const [currentPath, setCurrentPath] = useState(''); // 현재 그리는 경로
  const [strokeColor, setStrokeColor] = useState('black'); // 선 색상
  const [strokeWidth, setStrokeWidth] = useState(4); // 선 굵기
  const [randomImage, setRandomImage] = useState(null); // 랜덤 이미지 상태
  const navigation = useNavigation();

  useEffect(() => {
    // 컴포넌트가 렌더링될 때 무작위 이미지를 선택
    const randomIndex = Math.floor(Math.random() * 4); // 아이콘이 4개라서 0~3까지의 랜덤 값 생성
    const icons = [Icon1, Icon2, Icon3, Icon4];
    setRandomImage(icons[randomIndex]);
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

  return (
    <View style={styles.container}>
      {/* 무작위 SVG 아이콘 */}
      {randomImage && <randomImage width={width * 0.6} height={height * 0.4} />}

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
            <Icon1 width={40} height={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activateFountainPen}>
            <Icon2 width={40} height={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activatePencil}>
            <Icon3 width={40} height={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={activateHighlighter}>
            <Icon4 width={40} height={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={goToOtherPage}>
            <Icon1 width={40} height={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.undoRedoContainer}>
          <TouchableOpacity onPress={undo}>
            <Icon2 width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={redo}>
            <Icon3 width={40} height={40} />
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
  undoRedoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.14,
    marginBottom: height * 0.005,
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
