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
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
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

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = id++;
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function QAndA() {
  const [subject, setSubject] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [test, setTest] = React.useState("");

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
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

  const columns = [
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
      width: 120,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
          <Grid padding={3} container justifyContent={"space-between"} gap={1}>
            <Grid item md={3}>
              <Grid container>
                <Grid md={6}>
                  <Typography variant={"h6"}>Take it online.</Typography>
                </Grid>
                <Grid md={6}>
                  <Button variant={"contained"}>Start Test</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={6}>
              <Typography variant={"h6"}>
                Supplemental Scoring Test Review Questions And Answers
              </Typography>
            </Grid>
            <Grid>
              <Button variant={"contained"}>Generate</Button>
              <Button variant={"contained"}>Clear</Button>
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
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
