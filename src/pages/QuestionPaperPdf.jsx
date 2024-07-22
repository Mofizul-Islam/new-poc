import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    border: "1px solid #000",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  question: {
    marginTop: 10,
    fontSize: 12,
  },
  listItem: {
    marginLeft: 10,
    fontSize: 12,
    marginBottom: 3,
  },
  smallText: {
    fontSize: 10,
  },
  questionContainer: {},
  mcqContainer: {},
});

const mcq1 = {
  type: "mcq",
  question: "What groups listed below have true cell walls?",
  options: {
    A: "algae",
    B: "mycoplasmas",
    C: "Gram-positive bacteria",
    D: "fungi",
    E: "protozoans",
  },
};

const shortQuestion1 = {
  type: "short_question",
  question:
    "List the similarities and differences between passive diffusion and facilitated diffusion.",
};

const longQuestion1 = {
  type: "long_question",
  question:
    "List the similar abd diffrences between passive and facilitated diffusion",
};

/* const questionsGrouped = {
   mcq: [mcq1],
   short_question: [shortQuestion1],
   long_question: [],
 } */

const _questions = [mcq1, shortQuestion1, longQuestion1];

// Create Document Component
export default ({ questions = _questions }) => {
  const computedQuestionGroups = questions.reduce(
    (acc, q) => ({ ...acc, [q.type]: [...(acc[q.type] ?? []), q] }),
    { mcq: [], long_question: [], short_question: [] }
  );

  console.log("computed", computedQuestionGroups);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>PRACTICE EXAMINATION</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>MULTIPLE CHOICE QUESTIONS</Text>
          <Text style={[styles.text, styles.smallText]}>
            Note: More than one answer can be correct. Circle all correct
            answers.
          </Text>
          {computedQuestionGroups["mcq"].map((mcq, idx) => (
            <View
              style={[styles.questionContainer, styles.questionContainer]}
              wrap={false}
            >
              <Text style={styles.question}>
                {idx + 1}. {mcq.question}
              </Text>
              {Object.entries(mcq.options).map(([key, value]) => (
                <Text style={styles.listItem}>
                  {key}. {value}
                </Text>
              ))}
              {/* <Text style={styles.listItem}>A. algae</Text>
              <Text style={styles.listItem}>B. mycoplasmas</Text>
              <Text style={styles.listItem}>C. Gram-positive bacteria</Text>
              <Text style={styles.listItem}>D. fungi</Text>
              <Text style={styles.listItem}>E. protozoans</Text> */}
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>SHORT ANSWER QUESTIONS</Text>
          {computedQuestionGroups["short_question"].map(
            (short_question, idx) => (
              <View
                style={[styles.questionContainer, styles.questionContainer]}
              >
                <Text style={styles.question}>
                  {idx + 1}. {short_question.question}
                </Text>
              </View>
            )
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>LONG ANSWER QUESTIONS</Text>
          {computedQuestionGroups["long_question"].map((long_question, idx) => (
            <View style={[styles.questionContainer, styles.questionContainer]}>
              <Text style={styles.question}>
                {idx + 1}. {long_question.question}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
