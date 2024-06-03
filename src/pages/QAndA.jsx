import React from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return roles;
};

const initialRows = [
  {
    id: "1",
    questionAnswers: "supplimentScore.pdf",
    headerName: "SupplimentScore.pdf.",
    type: "pdf",
    generateDate: new Date("10/12/2221"),
    subject: "math",
    grade: "A",
    test: "sampletest1",
    action: "delete/modify",
    width: 220,
  },

  {
    id: "2",
    questionAnswers: "supplimentScore.pdf",
    headerName: "SupplimentScore.pdf.",
    type: "pdf",
    generateDate: new Date("10/12/2221"),
    subject: "math",
    grade: "A",
    test: "sampletest1",
    action: "delete/modify",
    width: 220,
  },
  {
    id: "3",
    questionAnswers: "supplimentScore.pdf",
    headerName: "SupplimentScore.pdf.",
    type: "pdf",
    generateDate: new Date("10/12/2221"),
    subject: "math",
    grade: "A",
    test: "sampletest1",
    action: "delete/modify",
    width: 220,
  },
  {
    id: "4",
    questionAnswers: "supplimentScore.pdf",
    headerName: "SupplimentScore.pdf.",
    type: "pdf",
    generateDate: new Date("10/12/2221"),
    subject: "math",
    grade: "A",
    test: "sampletest1",
    action: "delete/modify",
    width: 220,
  },
  {
    id: "5",
    questionAnswers: "supplimentScore.pdf",
    headerName: "SupplimentScore.pdf.",
    type: "pdf",
    generateDate: new Date("10/12/2221"),
    subject: "math",
    grade: "A",
    test: "sampletest1",
    action: "delete/modify",
    width: 220,
  },
];

export default function QAndA() {
  const [subject, setSubject] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [test, setTest] = React.useState("");

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleTestChange = (event) => {
    setTest(event.target.value);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <strong>Generate Test Questions and Answers</strong>
      <Paper>
        <Grid padding={3} container justifyContent={"space-between"} gap={1}>
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
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <FormControl fullWidth>
              <InputLabel id="test-label">Select Test</InputLabel>
              <Select
                labelId="test-label"
                id="test-select"
                value={test}
                label="Select Test"
                onChange={handleTestChange}
              >
                <MenuItem value="A">Test-A</MenuItem>
                <MenuItem value="B">Test-B</MenuItem>
                <MenuItem value="C">Test-C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box>
          <Grid container padding={3} justifyContent={"space-between"} gap={1}>
            <Grid item md={3}>
              <Grid container>
                <Grid md={6}>
                  <Typography fontWeight={600}>Take it online.</Typography>
                </Grid>
                <Grid md={6}>
                  <Button variant={"contained"}>Start Test</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={3}>
              <Box>
                <Typography fontWeight={600}>
                  Supplemental Scoring Test Review Questions And Answers
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Button variant={"contained"}>Generate</Button>
                <Button variant={"contained"}>Clear</Button>
              </Box>
            </Grid>
            <Grid md={3}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Button variant={"contained"}>Questions</Button>
                <Button variant={"contained"}>Answers</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <DataGrid
            rows={initialRows}
            columns={[
              {
                field: "questionAnswers",
                headerName: "Questions And Answers ",
                width: 180,
                editable: true,
              },
              {
                field: "type",
                headerName: "Type",
                type: "Pdf",
                width: 120,
                align: "left",
                headerAlign: "left",
                editable: true,
              },
              {
                field: "generateDate",
                headerName: "Generate Date",
                type: "date",
                width: 120,
                editable: true,
              },
              {
                field: "subject",
                headerName: "Subject",
                width: 120,
                editable: true,
                type: "singleSelect",
              },
              {
                field: "grade",
                headerName: "Grade",
                width: 120,
                editable: true,
                type: "singleSelect",
              },
              {
                field: "test",
                headerName: "Test",
                width: 120,
                editable: true,
                type: "singleSelect",
              },
              {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 230,

                cellClassName: "actions",
                getActions: ({ id }) => {
                  return [
                    <GridActionsCellItem
                      icon={<EditIcon />}
                      label="Edit"
                      className="textPrimary"
                      color="inherit"
                    />,
                    <GridActionsCellItem
                      icon={<DeleteIcon />}
                      label="Delete"
                      color="inherit"
                    />,
                    <Button variant={"contained"}>Start Test</Button>,
                  ];
                },
              },
            ]}
            editMode="row"
            onRowEditStop={(params, event) => {
              if (params.reason === GridRowEditStopReasons.rowFocusOut) {
                event.defaultMuiPrevented = true;
              }
            }}
            processRowUpdate={(newRow) => newRow}
          />
        </Box>
      </Paper>
    </Box>
  );
}
