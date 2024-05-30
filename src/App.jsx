import { AppBar, Box, Button, Grid } from "@mui/material";
import "./App.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Material from "./pages/Material";
import QAndA from "./pages/QAndA";
import Edit from "./pages/Edit";

function Wrapper() {
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
        <Box padding={5} style={{ backgroundColor: "#eef1f6", height: "100%" }}>
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
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Wrapper />}>
          <Route path="profile" element={<Profile />} />
          <Route path="material" element={<Material />} />
          <Route path="question-and-answers" element={<QAndA />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
