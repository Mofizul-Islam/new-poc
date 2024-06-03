import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return roles;
};

export default function QAndA() {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [test, setTest] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      id: "1",
      questionAnswers: "SupplementScore1.pdf",
      headerName: "SupplementScore1.pdf",
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
      questionAnswers: "SupplementScore2.pdf",
      headerName: "SupplementScore2.pdf",
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
      questionAnswers: "SupplementScore3.pdf",
      headerName: "SupplementScore3.pdf",
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
      questionAnswers: "SupplementScore4.pdf",
      headerName: "SupplementScore4.pdf",
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
      questionAnswers: "SupplementScore5.pdf",
      headerName: "SupplementScore5.pdf",
      type: "pdf",
      generateDate: new Date("10/12/2221"),
      subject: "math",
      grade: "A",
      test: "sampletest1",
      action: "delete/modify",
      width: 220,
    },
  ]);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleTestChange = (event) => {
    setTest(event.target.value);
  };

  const handleDeleteClick = (row) => () => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRow) {
      const updatedRows = rows.filter((r) => r.id !== selectedRow.id);
      setRows(updatedRows);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <strong>Upload Material</strong>
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
            <Box display="flex" mt={2}>
              <Button variant="contained" style={{ marginRight: "100px" }}>
                Save
              </Button>
              <Button variant="contained" style={{ marginLeft: "8px" }}>
                Clear
              </Button>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <input type="file" style={{ display: "none" }} />
            </Button>
          </Grid>
        </Grid>
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
                getActions: ({ id }) => [
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
                    onClick={handleDeleteClick(rows.find((r) => r.id === id))}
                  />,
                ],
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

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Are you sure you want to delete this row?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
