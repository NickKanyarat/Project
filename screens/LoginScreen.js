import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const LoginScreen = () => {
  const navigation = useNavigation();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "c082e853dede4ab7a5dd520df4ca3d44",
      scopes: ["user-read-email", "playlist-modify-public"],
      usePKCE: false,
      redirectUri: "exp://localhost:8081/--/spotify-auth-callback",
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      navigation.navigate("Main");
    }
  }, [response, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "white", fontSize: 60, fontWeight: "bold" }}>
        WELCOME
      </Text>

      <View style={{ height: 80 }} />
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
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
