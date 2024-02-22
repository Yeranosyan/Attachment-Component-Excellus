import { Input, MenuButton, Option, Select } from "@pega/cosmos-react-core";
import * as React from "react";
import { Button } from "@pega/cosmos-react-core";
import { IoMdClose } from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import FileFromDevice from "./FileFromDevice";
import TabularView from "./TabularView";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MenuButtonAction = () => {
  const [open, setOpen] = React.useState(false);
  const [openUrl, setOpenUrl] = React.useState(false);
  const [filess, setFiles] = React.useState([]);

  React.useEffect(() => {
    console.log("files changed");
    console.log(filess);
  }, [filess]);

  React.useEffect(() => {
    console.log("Mounted");
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenUrl = () => {
    setOpenUrl(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUrl(false);
  };

  const items = [
    {
      id: 1,
      primary: "File from device",
    },
    {
      id: 2,
      primary: "URL",
    },
  ];

  const handleMenuItemClick = (id) => {
    if (id === 1) {
      return handleClickOpen();
    } else handleClickOpenUrl();
  };

  const addNewFile = (filesToAdd, existingFiles) => {
    console.log("addNewFile");
    console.log(filess);
    console.log(existingFiles);
    console.log(filesToAdd);
    console.log("addNewFile.close");
    //setFiles([...files, ...filesToAdd]);
    setFiles([...existingFiles, ...filesToAdd]);
  };

  console.log("files");
  console.log(filess);

  return (
    <>
      <MenuButton
        text="Attachments"
        variant="secondary"
        iconOnly={false}
        menu={{
          mode: "action",
          items: items,
          onItemClick: handleMenuItemClick,
        }}
      />

      <Dialog
        fullWidth="md"
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <p> Attach file(s)</p>
          <p onClick={handleClose} style={{ cursor: "pointer", color: "gray" }}>
            <IoMdClose />
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {<FileFromDevice existingFiles={filess} addNewFile={addNewFile} />}
          </DialogContentText>
        </DialogContent>

        {/* Select files manually tabular view */}
        <div style={{ textAlign: "center" }}>
          {" "}
          {<TabularView files={filess} />}
        </div>

        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "40px",
          }}
        >
          <Button onClick={handleClose} variant="simple">
            Cancel
          </Button>

          <Button onClick={handleClose} variant="primary">
            Attach
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth="md"
        maxWidth="md"
        open={openUrl}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <p>Attach a link</p>
          <p onClick={handleClose} style={{ cursor: "pointer", color: "gray" }}>
            <IoMdClose />
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Input
              id="input-demo"
              type="text"
              label="Name"
              labelHidden={false}
              info={""}
              placeholder={""}
              status={undefined}
              required={true}
              disabled={false}
              readOnly={false}
            />

            <Input
              id="input-demo"
              type="url"
              label="URL"
              labelHidden={false}
              info={""}
              placeholder={""}
              status={undefined}
              required={true}
              disabled={false}
              readOnly={false}
            />

            <Select
              style={{ maxWidth: "200px" }}
              id="select-demo"
              label="Attachment Category"
              labelHidden={false}
              status={undefined}
              required={true}
              disabled={false}
              readOnly={false}
            >
              <Option>Select…</Option>
              <Option>Option 1</Option>
              <Option>Option 2</Option>
              <Option>Option 3</Option>
            </Select>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "40px",
          }}
        >
          <Button onClick={handleClose} variant="simple">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuButtonAction;
