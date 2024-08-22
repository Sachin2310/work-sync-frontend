import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "@mui/material";
import Form from "./UserDataForm";
import { useState } from "react";
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
      <Fab
        // className="fixed-drawer-button"
        style={{ position: "fixed", bottom: 16, right: 16 }}
        variant="extended"
        color="primary"
        onClick={() => toggleDrawer(true)}
      >
        <AddIcon />
      </Fab>
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
