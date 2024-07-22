import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
// import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Modal from "@mui/material/Modal";
import {
  randomCreatedDate,
  randomPrice,
  randomCurrency,
  randomCountry,
  randomCity,
  randomEmail,
  randomInt,
  randomAddress,
  randomCommodity,
} from "@mui/x-data-grid-generator";
import { Icon, IconButton } from "@mui/material";

const questionTypes = {
  long_question: "Long Question",
  short_question: "Short Question",
  mcq: "MCQ",
};

function DetailPanelContent({ row }) {
  return (
    <Stack
      sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <Typography variant="h6">{`question #${row.id}`}</Typography>
          {/* <Grid container> */}
          {[
            {
              label: "Question type",
              value: questionTypes[row.type],
              row,
            },
            {
              label: "Question",
              value: row.question,
              row,
            },
            {
              label: "Answer",
              value: row.answer,
            //   printIf: (row) =>
            //     row.type === "long_question" ||
            //     row.type === "short_question",
                //  ||
                // row.type === "mcq",
              row,
            },
            {
              label: "Explanation",
              value: row.explanation,
              row,
            },
            {
              label: "Ref",
              value: row.ref,
              row,
            },
            {
              label: "Options",
              value: JSON.stringify(row.options),
              row,
              printIf: (row) => row.type === "mcq",
            },
          ].map((section) =>
            !section.printIf || section.printIf(row) ? (
              <Box style={{ display: "flex" }}>
                <Box style={{ width: "20%" }}>
                  <Typography variant="body1" color="textSecondary">
                    {section.label}
                  </Typography>
                </Box>
                <Box style={{ width: "80%" }}>
                  <Typography variant="body1">{section.value}</Typography>
                </Box>
              </Box>
            ) : null
          )}
          {/* <Grid item md={6}>
              <Typography variant="body2" color="textSecondary">
                Question Information
              </Typography>
              <Typography variant="body1">{row.questions}</Typography>
            </Grid> */}
          {/* <Grid item md={6}>
              <Typography variant="body2" color="textSecondary">
                Question type:
              </Typography>
            </Grid> */}
          {/* <Typography variant="body1">{row.type}</Typography> */}
          {/* <Grid item md={6}>
              <Typography variant="body1">{questionTypes[row.type]}</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="body1" color="textSecondary">
                Explanation:
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="body1">{row.explanation}</Typography>
            </Grid>

            <Grid item md={6}>
              <Typography variant="body1" color="textSecondary">
                Ref:
              </Typography>
            </Grid>

            <Grid item md={6}>
              <Typography variant="body1">{`${row.ref}`}</Typography>
            </Grid>
            {row.type === "mcq" && (
              <Grid item md={12}>
                <Box style={{ display: "flex" }}>
                  <Box flex={0.6}>
                    <Typography variant="body1" color="textSecondary">
                      Options:
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">{`${row.options}`}</Typography>
                  </Box>
                </Box>
              </Grid>
            )} */}
          {/* </Grid> */}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default function QAndA() {
  const { doc_id } = useParams();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({});
  const handleDetailOpen = () => setOpen(true);
  const handleDetailClose = () => setOpen(false);
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

  const getDetailPanelContent = React.useCallback(
    ({ row }) => <DetailPanelContent row={row} />,
    []
  );

  const getDetailPanelHeight = React.useCallback(() => 400, []);
  const handleOpenQuestion = React.useCallback(({ row }) => {
    setSelectedRow(row);
    handleDetailOpen();
  }, []);

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
              field: "action",
              headerName: "Action",
              renderCell: ({ row }) => {
                return (
                  <IconButton
                    onClick={() => handleOpenQuestion({ row })}
                    size="small"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                );
              },
            },
            {
              field: "type",
              headerName: "Type",
              width: 10,
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
              flex: 0.2,
              minWidth: 300,
              // width: 500,
              // width: 190,
              editable: true,
            },
            // {
            //   field: "answer",
            //   headerName: "Answer",
            //   flex: 1,
            //   minWidth: 300,
            //   // width: 500,
            //   // width: 190,
            //   editable: true,
            // },
            // {
            //   field: "options",
            //   headerName: "Options",
            //   flex: 1,
            //   minWidth: 300,
            //   // width: 500,
            //   // width: 160,
            //   align: "left",
            //   headerAlign: "left",
            //   renderCell: ({ row: { options } }) => (
            //     <span>{JSON.stringify(options)}</span>
            //   ),
            //   editable: true,
            // },
            // {
            //   field: "explanation",
            //   headerName: "Explanation",
            //   flex: 0.3,
            //   // width: 200,
            //   // width: 150,
            //   editable: true,
            // },
            // {
            //   field: "ref",
            //   headerName: "Ref",
            //   flex: 0.3,
            //   // width: 200,
            //   // width: 150,
            //   editable: true,
            //   type: "singleSelect",
            // },

            // <Button variant={"contained"} onClick={() => start_test(id)}>
            //   Regenerate Test
            // </Button>,
          ]}
          getDetailPanelHeight={getDetailPanelHeight}
          getDetailPanelContent={getDetailPanelContent}
        />
      </Box>

      <Modal
        open={open}
        onClose={handleDetailClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-title"></Typography>
          <Box id="modal-description">
            <DetailPanelContent row={selectedRow} />
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
}
