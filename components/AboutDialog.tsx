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
      <Typography p={3}>
        The Idea Generator can assist with brainstorming business ideas by
        substituting the target audience of existing applications/businesses
        with a random noun - e.g., Tinder for Dogs.
        <br />
        <br />
        Presently, this site draws from a list of about 70 software applications
        and 6800 common nouns. In the future, there will be options to generate
        ideas on specific categories of apps and nouns.
        <br />
        <br />
        Want to contribute? Feel free to contribute a pull request on{" "}
        <a
          href="https://github.com/Walter-0/idea-generator"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        .
      </Typography>
    </Dialog>
  );
};

export default AboutDialog;
