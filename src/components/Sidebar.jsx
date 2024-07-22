import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";


function Sidebar({ width }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navRoutes = [
    {
      path: "/profile",
      label: "Profile",
    },
    {
      path: "/material",
      label: "Material",
    },
    {
      path: "/question-and-answers",
      label: "Question & Answers",
    },
  ];
  const drawer = (
    <div>
      <Toolbar />
      {/* <Divider /> */}
      <List>
        {navRoutes.map(({ path, label }, index) => (
          <ListItem
            onClick={() => {
              navigate(path);
            }}
            key={path}
            disablePadding
            style={{
              borderLeft:
                location.pathname === path ? "5px solid blue" : undefined,
            }}
          >
            <ListItemButton>
              {/* <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} }
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
    </div>
  );

  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </div>
  );
}

export default Sidebar;
