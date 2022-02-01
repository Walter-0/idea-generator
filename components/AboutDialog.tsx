import { Divider, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

export interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
}

const AboutDialog = (props: AboutDialogProps) => {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ p: 3 }}>
        Idea Generator
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <Typography sx={{ p: 3 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        veniam rem veritatis non, culpa quam accusantium, voluptatum consequatur
        quibusdam voluptate odio similique tenetur quia sint ea facere aperiam
        ad optio!
      </Typography>
    </Dialog>
  );
};

export default AboutDialog;
