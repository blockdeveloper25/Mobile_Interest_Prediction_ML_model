import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import axios from "axios";

export default function ClarificationScreen() {
  const [responses, setResponses] = useState(Array(15).fill("")); // Store selected responses for each question.

  const questions = [
    { question: "How much do you enjoy solving logical problems or coding puzzles?", options: ["Love it", "Neutral", "Dislike it", "Never tried"] },
    { question: "How do you feel about designing and building physical structures?", options: ["Excited", "Somewhat interested", "Indifferent", "Not interested"] },
    { question: "Are you interested in understanding how to improve health and well-being?", options: ["Very interested", "Interested", "Neutral", "Not at all"] },
    { question: "How much do you enjoy sketching or creating visual designs?", options: ["Love it", "Like it", "Neutral", "Dislike it"] },
    { question: "Do you prefer working with machines and tools to build things?", options: ["Yes, I enjoy it", "Sometimes", "Rarely", "Not at all"] },
    { question: "Are you fascinated by programming and creating software applications?", options: ["Yes, very much", "Somewhat", "Neutral", "No interest"] },
    { question: "Do you like the idea of planning and managing construction projects?", options: ["Love it", "Interested", "Neutral", "Dislike it"] },
    { question: "Are you interested in designing innovative solutions for day-to-day problems?", options: ["Very much", "Somewhat", "Indifferent", "Not interested"] },
    { question: "How much do you enjoy analyzing data or working on statistics?", options: ["Love it", "Like it", "Neutral", "Dislike it"] },
    { question: "How often do you think about improving infrastructure, like roads and bridges?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { question: "Do you enjoy working in environments related to patient care or health?", options: ["Very much", "Somewhat", "Neutral", "No interest"] },
    { question: "How passionate are you about learning new technologies?", options: ["Very passionate", "Interested", "Indifferent", "Not interested"] },
    { question: "Do you enjoy creating models or blueprints?", options: ["Love it", "Somewhat enjoy", "Neutral", "Dislike it"] },
    { question: "Do you like studying about human biology or anatomy?", options: ["Love it", "Interested", "Neutral", "No interest"] },
    { question: "Are you more drawn to creative arts or designing concepts?", options: ["Very drawn", "Somewhat", "Neutral", "No interest"] },
  ];

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedResponses = [...responses];
    updatedResponses[questionIndex] = optionIndex + 1; // Store 1-based index (1, 2, 3, 4)
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    const apiUrl = "http://127.0.0.1:5002/predict"; // Replace with your backend URL
    const data = { responses };

    axios
      .post(apiUrl, data)
      .then((response) => {
        Alert.alert("Prediction", `Your interest field is: ${response.data.prediction}`);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to get prediction from backend.");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Answer the Questions</Text>
      {questions.map((item, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{item.question}</Text>
          {item.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[
                styles.option,
                responses[index] === optionIndex + 1 && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(index, optionIndex)}
            >
              <Text
                style={[
                  styles.optionText,
                  responses[index] === optionIndex + 1 && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  questionContainer: {
    marginBottom: 30,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#0288D1",
    borderColor: "#0288D1",
  },
  optionText: {
    color: "#333",
    fontSize: 14,
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0288D1",
    paddingVertical: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
