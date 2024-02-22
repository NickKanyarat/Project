import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewScreen}>
        <Text style={styles.titleText}>SONG</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  viewScreen: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  titleText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default HomeScreen;
