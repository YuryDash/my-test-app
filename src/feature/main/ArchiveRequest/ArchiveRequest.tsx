import { useState } from "react";
import { Fab, Modal, TextField, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { COLORS } from "common/colors/colors";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { styled } from "@material-ui/core/styles";

const StyleModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const ArchiveRequest = () => {
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
      <StyleModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width="90%" height="70%" p={3} borderRadius={5} bgcolor={"background.default"} color={"text.primary"}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color={"gray"} textAlign={"center"}>
            Create Post
          </Typography>
          <UserBox>
            <Typography fontWeight={500}>User-Arbuzer</Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={2}
            placeholder="What's on your mind?"
            variant="standard"
          />
        </Box>
      </StyleModal>
    </>
  );
};
