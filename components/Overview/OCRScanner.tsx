import React, { useState, useEffect } from "react";
import { View, Button, Image, Text, ScrollView, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import TextRecognition from "react-native-text-recognition";

export default function OCRScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Berechtigung benötigt", "Wir brauchen Zugriff auf die Kamera!");
      }
    })();
  }, []);

  // Texterkennung starten, wenn sich `image` ändert
  useEffect(() => {
    const recognizeText = async () => {
      if (image) {
        try {
          console.log(image)
          const extractedText = await TextRecognition.recognize(image);
          setText(extractedText.join("\n")); // Erkannten Text formatieren
        } catch (error) {
          console.error("Fehler bei der Texterkennung:", error);
          setText("Texterkennung fehlgeschlagen.");
        }
      }
    };
    recognizeText();
  }, [image]); 

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Fehler beim Öffnen der Kamera:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="📸 Rezept fotografieren" onPress={takePicture} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.heading}>Erkanntes Rezept:</Text>
      <Text style={styles.text}>{text || "Kein Text erkannt"}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 20 },
  image: { width: 250, height: 250, margin: 10, borderRadius: 10 },
  heading: { fontWeight: "bold", fontSize: 18, marginTop: 10 },
  text: { marginTop: 10, textAlign: "center" },
});
