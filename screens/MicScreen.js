import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

const MicScreen = () => {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewScreen}>
        <Text style={styles.titleText}>MICROPHONE</Text>
        <View style={styles.button}>
          <Button
            title={recording ? "Stop Recording" : "Start Recording"}
            onPress={recording ? stopRecording : startRecording}
            color="purple"
          />
        </View>
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
    textAlign: "center",
  },
  button: {
    marginHorizontal: 50,
    marginVertical: 50,
    padding: 50,
  },
});

export default MicScreen;
