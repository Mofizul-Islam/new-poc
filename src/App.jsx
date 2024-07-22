import { AppBar, Box, Button, Grid } from "@mui/material";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Material from "./pages/Material";
import QAndA from "./pages/QAndA";
import Edit from "./pages/Edit";
import Test from "./pages/Test";
// import GeneratedTest from "./pages/GeneratedTest";
import GenerateTestV2 from "./pages/GenerateTestV2";

function isLoggedIn(){
  let data = localStorage.getItem("accessToken")
  return !!data;
}

function PrivateRoute() {

  if (!isLoggedIn()) {
    return <Navigate to={"/SignIn"} />;
  }

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item md={2}>
        <Sidebar width={"16.6%"} />
      </Grid>
      <Grid item md={10}>
        <AppBar position="static">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box />
            <Box>
              <Button style={{ color: "#fff" }}>Logout</Button>
            </Box>
          </Box>
        </AppBar>
        <Box
          padding={5}
          style={{ backgroundColor: "#eef1f6", minHeight: "90vh" }}
        >
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="material" element={<Material />} />
          {/* <Route path="question-and-answers/:doc_id" element={<QAndA />} /> */}
          <Route path="question-and-answers" element={<QAndA />} />
          <Route path="edit" element={<Edit />} />
          <Route path="/test" element={<Test />} />

          {/* <Route path="/generatetest/:doc_id" element={<GeneratedTest />} /> */}
          <Route path="/generatetest/:doc_id" element={<GenerateTestV2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
