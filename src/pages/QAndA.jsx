import React, { useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Box,
  Typography,
  Button,
  Input,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import FormLabel from "@mui/material/FormLabel";
import { useLocation } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import QuestionPaperPdf from "./QuestionPaperPdf";
import { BASE_URL } from "../api/constants";
import { TestList } from "../components/qAndA/TestList";
// import ReactPDF from "@react-pdf/renderer";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return roles;
};

const initialRows = [];

const baseApiUrl = BASE_URL;
const start_test = async (doc_id, test, mcqCount, shortCount, longCount) => {
  if (!doc_id) {
    console.error("doc-id is mandatory");
    return;
  }
  const res = await axios.get(
    `${baseApiUrl}/start-test/${doc_id}?test_name=${test}&mcq_count=${mcqCount}&shortques_count=${shortCount}&longques_count=${longCount}`
  );
  // open_questions(doc_id);

  console.log("RESPONSE", res.data);

  return res.data;
};
const getTests = async () => {
  const res = await axios.get(`${baseApiUrl}/question-test`);
  return res.data;
};

const getQuestions = async (testId) => {
  const response = await axios.get(`${BASE_URL}question-list/${testId}`, {});

  return response.data;
};

const modalRootStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function QAndA() {
  const [subject, setSubject] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [test, setTest] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [generatingTest, setGeneratingTest] = React.useState(false);
  const [questionPDFOpen, setQuestionPDFOpen] = React.useState(false);
  const [activeTestQuestions, setActiveTestQuestions] = React.useState([]);
  const [mcqCount, setMcqCount] = React.useState(10);
  const [shortCount, setShortCount] = React.useState(10);
  const [longCount, setLongCount] = React.useState(10);

  const { state } = useLocation();
  useEffect(() => {
    console.log("doc", state);
    if (state && state.doc) {
      const doc = state.doc;
      setSubject(doc.subject);
      setGrade(doc.grade);
    }
  }, [state]);

  useEffect(() => {
    fetchTests();
  }, []);
  // const {  } = doc;

  const fetchTests = async () => {
    const tests = await getTests();
    setRows(tests.test_questions);
    console.log("testing ", tests);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleTestChange = (event) => {
    setTest(event.target.value);
  };
  const clearTestFields = () => {
    setTest("");
  };
  const handleMcqCount = (event) => {
    setMcqCount(event.target.value);
  };
  const handleShortCount = (event) => {
    setShortCount(event.target.value);
  };
  const handleLongCount = (event) => {
    setLongCount(event.target.value);
  };

  const handleStartTest = async () => {
    setGeneratingTest(true);
    try {
      await start_test(state?.doc?.id, test, mcqCount, shortCount, longCount);
      //  const res = await start_test(state?.doc?.id, test);
      //  const pdfStream = await ReactPDF.renderToStream(<MyDocument />);
      //  pdfStream.readable
      clearTestFields();
    } finally {
      setGeneratingTest(false);
    }
    fetchTests();
  };

  const handlePDFGeneration = async (testId) => {
    const { questions } = await getQuestions(testId);
    setActiveTestQuestions(questions);
    setQuestionPDFOpen(true);
  };
  const questionAndanswer = () => {
    return state?.doc?.doc_name;
  };

  console.log("ROWS", rows);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <strong>Generate Test Questions and Answers</strong>
      <Paper>
        <Grid padding={3} container justifyContent={"space-between"} gap={3}>
          <Grid item md={3}>
            <FormControl fullWidth>
              <InputLabel id="subject-label">Select Subject</InputLabel>
              <Select
                labelId="subject-label"
                id="subject-select"
                value={subject}
                label="Select Subject"
                onChange={handleSubjectChange}
              >
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="History">History</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <FormControl fullWidth>
              <InputLabel id="grade-label">Select Grade</InputLabel>
              <Select
                labelId="grade-label"
                id="grade-select"
                value={grade}
                label="Select Grade"
                onChange={handleGradeChange}
              >
                <MenuItem value="9th">9th</MenuItem>
                <MenuItem value="10th">10th</MenuItem>
                <MenuItem value="11th">11th</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <FormControl fullWidth>
              <TextField
                label="Test Name"
                onChange={handleTestChange}
                value={test}
              />
            </FormControl>
          </Grid>

          <Grid item md={3}>
            <FormControl fullWidth>
              <TextField
                type="number"
                label=" MCQ"
                onChange={handleMcqCount}
                value={mcqCount}
              />
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <FormControl fullWidth>
              <TextField
                type="number"
                label="Short Questions"
                onChange={handleShortCount}
                value={shortCount}
              />
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <FormControl fullWidth>
              <TextField
                type="number"
                label="Long Questions"
                onChange={handleLongCount}
                value={longCount}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box>
          <Grid container padding={3} justifyContent={"space-between"} gap={1}>
            <Grid item md={3}>
              <Grid container>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    {/* <strong>Questions:</strong> */}
                  </FormLabel>
                </FormControl>
              </Grid>
            </Grid>
            <Grid md={3}></Grid>
            <Grid md={3}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Button
                  disabled={generatingTest}
                  variant={"contained"}
                  onClick={() => handleStartTest()}
                >
                  Generate Test
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <TestList
        rows={rows}
        handlePDFGeneration={handlePDFGeneration}
        docName={state?.doc?.doc_name}
      />
      <Modal
        open={questionPDFOpen}
        onClose={() => setQuestionPDFOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={modalRootStyle}
          width={"80%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <PDFViewer width={"100%"} height={"600px"}>
            <QuestionPaperPdf questions={activeTestQuestions} />
          </PDFViewer>
        </Box>
      </Modal>
    </Box>
  );
}
