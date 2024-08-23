import Fab from "@mui/material/Fab";
import { Drawer } from "@mui/material";
import Form from "./DataForm";
import { useState } from "react";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";
import Tooltip from "@mui/material/Tooltip";
// import "../assets/Custom.css";

const RightDrawer = ({ userType, onClose }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setDrawerOpen(open);
    if (!open) {
      onClose();
    }
  };

  return (
    <>
      <Tooltip title={`Add ${userType}`} placement="top">
        <Fab
          // className="fixed-drawer-button"
          style={{ position: "fixed", bottom: 16, right: 16 }}
          variant="extended"
          color="primary"
          onClick={() => toggleDrawer(true)}
        >
          <GroupAddTwoToneIcon />
        </Fab>
      </Tooltip>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Form userform={userType} onClose={() => toggleDrawer(false)} />
      </Drawer>
    </>
  );
};

export default RightDrawer;
