import { styled } from "@material-ui/core/styles";
import { Fab, Modal, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { COLORS } from "common/colors/colors";
import { useState } from "react";
import { DialogHeader } from "feature/main/AddNewArchiveRequest/DialogHeader/DialogHeader";
import { EditArchive } from "feature/main/AddNewArchiveRequest/EditArchive/EditArchive";
import { AddFile } from "feature/main/AddNewArchiveRequest/AddFile/AddFile";
import { Note } from "../Note/Note";

const StyleModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const AddNewArchiveRequest = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip onClick={(event) => setOpen(true)} title="Add new Post">
        <IconButton>
          <Fab
            aria-label="add"
            sx={{
              backgroundColor: COLORS.ORANGE,
              color: "white",
              "&:hover": {
                backgroundColor: COLORS.ORANGE,
              },
            }}
          >
            <SpeedDialIcon />
          </Fab>
        </IconButton>
      </Tooltip>
      <StyleModal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            overflow: "auto",
            maxHeight: "100%",
          }}
          width="90%"
          height="70%"
          p={0}
          borderRadius={5}
          bgcolor={"background.default"}
          color={"text.primary"}
        >
          <DialogHeader />
          <EditArchive />
          <AddFile />
          <Note />
        </Box>
      </StyleModal>
    </>
  );
};
