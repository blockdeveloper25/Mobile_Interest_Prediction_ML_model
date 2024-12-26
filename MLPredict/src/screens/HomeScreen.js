import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Questionnaire from "./Questionnaire";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Questionnaire</Text>
      <Questionnaire />
      <TouchableOpacity
        onPress={() => navigation.navigate("Clarification")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Clarification Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0288D1",
    paddingVertical: 15,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
