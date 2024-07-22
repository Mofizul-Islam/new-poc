import React from "react";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import QuestionPaperPdf from "./QuestionPaperPdf";

export default () => (
  <PDFViewer width={"100%"} height={"600px"}>
    <QuestionPaperPdf />
  </PDFViewer>
);
