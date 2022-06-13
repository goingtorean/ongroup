import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

function test_prime(n) {
  if (n === 1) {
    return false;
  } else if (n === 2) {
    return true;
  } else {
    for (let x = 2; x < n; x++) {
      if (n % x === 0) {
        return false;
      }
    }
    return true;
  }
}

const data = range(1, 100);
const { width, height } = Dimensions.get("window");
const itemWidth = width / 10;
const itemHeight = itemWidth;

const NumberComponent = ({ item, index, onPress }) => {
  const [checked, setChecked] = useState(false);

  const onPressNumber = () => {
    onPress(item);
    setChecked(true);
  };

  const backgroundColor = () => {
    if (checked && test_prime(item)) {
      return "green";
    } else if (checked && !test_prime(item)) {
      return "red";
    } else {
      return "white";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressNumber}
      disabled={checked}
      style={{
        width: itemWidth,
        height: itemHeight,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor(),
      }}
      key={index.toString()}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [countClick, setCountClick] = useState(0);
  const [user1, setUser1] = useState(true);

  useEffect(() => {
    if (countClick === data.length) {
      alert(checkWinner());
    }
  }, [countClick]);

  const checkWinner = () => {
    if (count1 > count2) {
      return `Winner is User1`;
    } else if (count1 === count2) {
      return `Tie`;
    } else {
      return `Winner is User2`;
    }
  };

  const onUserPress = (item) => {
    setCountClick(countClick + 1);
    if (test_prime(item)) {
      user1 ? setCount1(count1 + 1) : setCount2(count2 + 1);
    }
    setUser1(!user1);
  };

  const renderChildView = (item, index) => {
    return (
      <NumberComponent
        item={item}
        index={index}
        onPress={onUserPress}
        key={index.toString()}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 40,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <View>
          <Text>User1: {count1}</Text>
        </View>
        <View>
          <Text>User2: {count2}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {data?.map(renderChildView)}
      </View>
      <View style={{ marginTop: 40 }}>
        <Text>Turn: {user1 ? `User1` : `User2`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
