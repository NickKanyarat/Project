import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useEffect } from "react";
import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      console.log("acess token", accessToken);
      console.log("expiration date", expirationDate);

      if (accessToken && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parseInt(expirationDate)) {
          // here the token is still valid
          navigation.replace("Main");
        } else {
          // token would be expired so we need to remove it from the async storage
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
        }
      }
    };

    checkTokenValidity();
  }, []);

  async function authenticate() {
    const config = {
      issuer: "https://accounts.spotify.com",
      clientId: "1dc7e39c7d6245deaee8177099bcfd60",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public", // or "playlist-modify-private"
      ],
      redirectUrl: "https://localhost:19000/--/spotify-auth-callback",
    };
    const result = await AppAuth.authAsync(config);
    console.log(result);
    if (result.accessToken) {
      const expirationDate = new Date(
        result.accessTokenExpirationDate
      ).getTime();
      AsyncStorage.setItem("token", result.accessToken);
      AsyncStorage.setItem("expirationDate", expirationDate.toString());
      navigation.navigate("Main");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "white", fontSize: 60, fontWeight: "bold" }}>
        WELCOME
      </Text>

      <View style={{ height: 80 }} />
      <Pressable
        onPress={authenticate}
        style={{
          backgroundColor: "#6C50AC",
          padding: 15,
          marginLeft: "auto",
          marginRight: "auto",
          width: 250,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
          Log In
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
