import React, { useState, useEffect } from "react";
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
import axios from "axios";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/constants";

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
  const [rows, setRows] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}docs`, {});
      if (response.data) {
        setRows(
          response.data.file_list.map((f) => ({
            ...f,
            date: new Date(f.date),
          }))
        );
        setDocTypes(response.data.doc_type);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Error fetching documents");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

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

  const open_questions = (doc_id) => {
    // navigate(`/generatetest/${doc_id}`);
  };

  const view_file = (doc) => {
    console.log("doc file ", doc);
    navigate("/question-and-answers/", { state: { doc } });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setUploadedFile(file);
  };

  const handleSave = async () => {
    if (!uploadedFile || !subject || !grade) {
      alert("Please upload a file and fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("user_id", "123");
    formData.append("doc_type", uploadedFile.type);
    formData.append("subject", subject);
    formData.append("grade", grade);

    try {
      const response = await axios.post(`${BASE_URL}doc-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "ok") {
        alert("File uploaded successfully");
        fetchDocuments();
        setSubject("");
        setGrade("");
        setUploadedFile(null);
      } else {
        alert("File upload failed: " + response.data.msg);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const handleClear = () => {
    setSubject("");
    setGrade("");
    setUploadedFile(null);
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
                <MenuItem value="9th">9th</MenuItem>
                <MenuItem value="10th">10th</MenuItem>
                <MenuItem value="11th">11th</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <Button
              style={{ marginLeft: "40px" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <input
                type="file"
                style={{ display: "none", marginLeft: "40px" }}
                onChange={handleFileUpload}
              />
            </Button>

            <Box display="flex" mt={2}>
              <Button
                variant="contained"
                style={{ marginRight: "100px" }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: "8px" }}
                onClick={handleClear}
              >
                Clear
              </Button>
            </Box>
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
            sx={{
              ".MuiDataGrid-columnHeaderTitle": {
                fontWeight: 600,
              },
            }}
            rows={rows}
            columns={[
              {
                field: "doc_name",
                headerName: "Material Name",
                width: 190,
                editable: true,
              },
              {
                field: "doc_type",
                headerName: "Type",
                type: "Pdf",
                width: 160,
                align: "left",
                headerAlign: "left",
                editable: true,
              },
              {
                field: "date",
                headerName: "Uploaded Date",
                type: "date",
                width: 150,
                editable: true,
              },
              {
                field: "subject",
                headerName: "Subject",
                width: 150,
                editable: true,
                type: "singleSelect",
              },
              {
                field: "grade",
                headerName: "Grade",
                width: 150,
                editable: true,
                type: "singleSelect",
              },
              {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 230,
                cellClassName: "actions",
                getActions: ({ id, row }) => [
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
                  <Button
                    variant={"contained"}
                    //   onClick={() => open_questions(id)}
                    // >
                    //   See Questions
                    onClick={() => view_file(row)}
                  >
                    View
                  </Button>,
                ],
                // (
                //   <Button
                //     variant={"contained"}
                //     onClick={() => start_test(id)}
                //   >
                //     Generate Test
                //   </Button>
                // ),
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
