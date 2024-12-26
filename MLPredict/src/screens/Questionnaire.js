import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";

export default function Questionnaire() {
  const [responses, setResponses] = useState(Array(10).fill("")); // Array to store selected responses for each question.

  const questions = [
    {
      question: "Do you enjoy solving logical puzzles and coding challenges?",
      options: [
        "I love it.",
        "I'm somewhat interested.",
        "I prefer planning structures.",
        "I like working hands-on with tools.",
      ],
    },
    {
      question: "How do you feel about designing or building physical objects?",
      options: [
        "It's okay but not my main interest.",
        "I occasionally enjoy it.",
        "I find it fascinating to plan and design structures.",
        "I enjoy working in construction projects.",
      ],
    },
    {
      question: "Which type of environment do you prefer for work?",
      options: [
        "Working on a computer.",
        "A mix of indoor and outdoor work.",
        "Mostly outdoor work overseeing designs.",
        "Construction sites or hands-on physical work.",
      ],
    },
    {
      question:
        "How much do you enjoy working on collaborative digital projects?",
      options: [
        "It's what I enjoy most.",
        "I like it but not always.",
        "I prefer working on physical structures with a team.",
        "I prefer collaborative fieldwork at construction sites.",
      ],
    },
    {
      question: "When tackling a problem, do you think about:",
      options: [
        "Writing algorithms or software solutions.",
        "Exploring different ways to balance design and implementation.",
        "How to design a functional structure.",
        "How to efficiently manage resources at a construction site.",
      ],
    },
    {
      question: "What excites you the most about technology?",
      options: [
        "Developing applications and systems.",
        "Using tools for designing complex ideas.",
        "Leveraging technology for innovative architecture.",
        "Applying technology in construction equipment.",
      ],
    },
    {
      question: "How do you approach challenges?",
      options: [
        "Analyzing and coding a solution.",
        "Balancing design and creative strategies.",
        "Planning and designing detailed projects.",
        "Practical troubleshooting in fieldwork.",
      ],
    },
    {
      question: "What interests you more?",
      options: [
        "Understanding programming languages and software development.",
        "The intricacies of integrating designs.",
        "Creating durable infrastructure.",
        "The hands-on process of building.",
      ],
    },
    {
      question:
        "How much do you enjoy keeping up with trends in your area of interest?",
      options: [
        "Following the latest in software.",
        "Learning new structural design techniques.",
        "Studying architectural advancements.",
        "Exploring innovative construction practices.",
      ],
    },
    {
      question: "Where do you see yourself excelling the most?",
      options: [
        "In software development or creating applications.",
        "In bringing creative concepts to structural designs.",
        "In planning infrastructure.",
        "In supervising and contributing to construction work.",
      ],
    },
  ];

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedResponses = [...responses];
    updatedResponses[questionIndex] = optionIndex + 1; // Store 1-based index (1, 2, 3, 4)
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    const apiUrl = "http://127.0.0.1:5001/predict"; // Replace with your backend URL
    const data = { responses };

    axios
      .post(apiUrl, data)
      .then((response) => {
        Alert.alert(
          "Prediction",
          `Your interest field is: ${response.data.prediction}`
        );
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
                  responses[index] === optionIndex + 1 &&
                    styles.selectedOptionText,
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
  questionContainer: {
    marginBottom: 30,
  },
  heading: {
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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

