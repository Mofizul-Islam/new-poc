import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box,} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { DataGrid, } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const questionTypes = {
  long_question: "Long Question",
  short_question: "Short Question",
  mcq: "MCQ",
};

export default function QAndA() {
  const { doc_id } = useParams();
  const [rows, setRows] = useState([]);
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/question-list/${doc_id}`,
        {}
      );
      if (response.data) {
        setRows(
          response.data.questions.map((f) => ({
            ...f,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Error fetching documents");
    }
  };
  useEffect(() => {
    if (doc_id) {
      fetchQuestions();
    }
  }, [doc_id]);

  return (
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
              field: "type",
              headerName: "Type",
              // width: 10,
              flex: 0.1,
              renderCell: ({ row }) => {
                return questionTypes[row.type];
              },
              // width: 150,
              // editable: true,
              // type: "singleSelect",
            },
            {
              field: "question",
              headerName: "Question",
              flex: 1,
              minWidth: 300,
              // width: 500,
              // width: 190,
              editable: true,
            },
            {
              field: "answer",
              headerName: "Answer",
              flex: 1,
              minWidth: 300,
              // width: 500,
              // width: 190,
              editable: true,
            },
            {
              field: "options",
              headerName: "Options",
              flex: 1,
              minWidth: 300,
              // width: 500,
              // width: 160,
              align: "left",
              headerAlign: "left",
              renderCell: ({ row: { options } }) => (
                <span>{JSON.stringify(options)}</span>
              ),
              editable: true,
            },
            {
              field: "explanation",
              headerName: "Explanation",
              flex: 0.3,
              // width: 200,
              // width: 150,
              editable: true,
            },
            {
              field: "ref",
              headerName: "Ref",
              flex: 0.3,
              // width: 200,
              // width: 150,
              editable: true,
              type: "singleSelect",
            },

            // <Button variant={"contained"} onClick={() => start_test(id)}>
            //   Regenerate Test
            // </Button>,
          ]}
        />
      </Box>
    </Paper>
  );
}
