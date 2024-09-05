import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Paper, Box } from "@mui/material";

export function TestList({ rows, handlePDFGeneration, docName }) {
  const questionAndanswer = () => {
    return docName;
  };

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
          // rows={initialRows}
          rows={rows}
          columns={[
            {
              // field: state.doc.doc_name,
              valueGetter: questionAndanswer,
              headerName: "Questions And Answers ",
              width: 190,
              editable: true,
            },
            {
              field: "type",
              headerName: "Type",
              type: "Pdf",
              width: 100,
              align: "left",
              headerAlign: "left",
              editable: true,
            },
            {
              field: "generated_date",
              headerName: "Generate Date",
              type: "text",
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
                  <GridActionsCellItem
                    icon={<PictureAsPdfIcon />}
                    onClick={() => handlePDFGeneration(id)}
                    label="pdf"
                    color="inherit"
                  />,
                  // <Button variant={"contained"}>Generate Pdf</Button>,
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
  );
}
