import React, { useState, useCallback } from "react";
import PropTypes, { element } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MySnackbarContent from "../../helper/MySnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { useDropzone } from "react-dropzone";

import { excelServices } from "../../services";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  gridCenter: {
    marginTop: 200
  },
  cardStyle: {},
  contentStyle: {
    fontFamily: "Arial Rounded MT",
    height: 670
  },
  fontStyle: {
    textShadow: "2px 3px 0px #898999",
    fontFamily: "Arial Rounded MT"
  }
});

function Content(props) {
  console.log(props);
  const gravity = useFormInput("");
  const viscosity = useFormInput("");
  const porosity = useFormInput("");
  const oil_saturation = useFormInput("");
  const formation_type = useFormInput("");
  const permeability = useFormInput("");
  const net_thinkness = useFormInput("");
  const depth = useFormInput("");
  const temperature = useFormInput("");

  const selectedFile = useFormInputFile(null);

  var paramsValue = {
    gravity: gravity.value,
    viscosity: viscosity.value,
    porosity: porosity.value,
    oil_saturation: oil_saturation.value,
    formation_type: formation_type.value,
    permeability: permeability.value,
    net_thinkness: net_thinkness.value,
    depth: depth.value,
    temperature: temperature.value
  };
  const [output, setOutput] = useState("");
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState("warning");
  const [files, setFiles] = useState([""]);
  const [once, setOnce] = useState(true);
  const [once2, setOnce2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  if (once) {
    excelServices.getListData().then(res => {
      setFiles(res.data.files);
      setOnce(false);
    });
  }

  if (once2) {
    excelServices.selectFile({ filename: selectedOption }).then(res => {
      if (res.data.message === "success") {
        setOpen(true);
        setNotify("success");
        setResult(`Đã chọn file ${selectedOption}`);
      } else {
        setOpen(true);
        setNotify("error");
        setResult("Bị lỗi gì đó rồi :(");
      }
      setOnce2(false);
    });
  }
  console.log(files);
  function handleClick1() {
    const data = new FormData();
    console.log(selectedFile.value);
    data.append("foo", selectedFile.value);
    excelServices.upload(data).then(res => {
      // then print response status
      setResult(res.data.message);
      setOpen(true);
      if (res.data.message === "success") {
        setNotify("success");
        setOnce(true);
      } else if (res.data.message === "error") {
        setNotify("error");
      } else {
        setNotify("warning");
      }
    });
  }

  function handleClick2() {
    excelServices
      .processData({
        params: paramsValue
      })
      .then(res => {
        console.log(res.data.nameMethod);
        if (res.data.nameMethod === "notfound") {
          setOutput("Not Found");
        } else {
          setOutput(res.data.nameMethod);
        }
      })
      .catch(res => {
        console.log(res);
      });
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChangeRadio(e) {
    setSelectedOption(e.target.value);
    setOnce2(true);
  }
  console.log(selectedOption);
  const { classes } = props;

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
    const data = new FormData();

    data.append("foo", acceptedFiles[0]);
    excelServices.upload(data).then(res => {
      // then print response status
      setResult(res.data.message);
      setOpen(true);
      if (res.data.message === "success") {
        setNotify("success");
        setOnce(true);
      } else if (res.data.message === "error") {
        setNotify("error");
      } else {
        setNotify("warning");
      }
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container spacing={24} className={classes.contentStyle}>
      <Grid item xs={2} />
      <Grid item xs={4}>
        <h1 className={classes.fontStyle}>Upload File Excel</h1>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Kéo thả file vào đây ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>

        <TextField
          type="file"
          name="foo"
          label="Name"
          className={classes.textField}
          onChange={selectedFile.onChange}
        />

        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={handleClick1}
        >
          Upload
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "0"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MySnackbarContent
            onClose={handleClose}
            variant={notify}
            message={result}
          />
        </Snackbar>
        <ul style={{ listStyle: "none" }}>
          {files.map((element, index) => {
            return (
              <li>
                <input
                  type="radio"
                  name="rd"
                  value={element}
                  checked={selectedOption === element}
                  onChange={handleChangeRadio}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M4 1c-.55 0-.99.45-.99 1L3 16c0 .55.44 1 1 1h10c.55 0 1-.45 1-1V6l-5-5H4zm6 5V2l4 4h-4z" />
                </svg>
                <a href={`http://localhost:3000/details/${element}`}>
                  {element}
                </a>
              </li>
            );
          })}
        </ul>
      </Grid>

      <Grid item xs={2}>
        <h1 className={classes.fontStyle}>Find Method</h1>
        <div>
          <TextField
            label="Gravity"
            name="gravity"
            className={classes.textField}
            {...gravity}
          />
        </div>
        <div>
          <TextField
            label="Viscosity"
            name="viscosity"
            className={classes.textField}
            {...viscosity}
          />
        </div>
        <div>
          <TextField
            label="Porosity"
            name="porosity"
            className={classes.textField}
            {...porosity}
          />
        </div>
        <div>
          <TextField
            label="Oil Saturation"
            name="oil_saturation"
            className={classes.textField}
            {...oil_saturation}
          />
        </div>

        <FormControl className={classes.textField}>
          <InputLabel htmlFor="formation_type">Formation Type</InputLabel>
          <Select
            {...formation_type}
            inputProps={{
              name: "formation_type",
              id: "formation_type"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Sandstone or carbonat</MenuItem>
            <MenuItem value={2}>Sandstone</MenuItem>
            <MenuItem value={3}>
              Sandstone or Carbonate[PreferablyCarbonate]
            </MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            label="Permeability"
            name="permeability"
            className={classes.textField}
            {...permeability}
          />
        </div>
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="net_thinkness">Net Thinkness</InputLabel>
          <Select
            {...net_thinkness}
            inputProps={{
              name: "Net Thinkness",
              id: "net_thinkness"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Wide Range</MenuItem>
            <MenuItem value={2}>Thin unless dipping</MenuItem>
            <MenuItem value={3}>NC</MenuItem>
            <MenuItem value={4}>10</MenuItem>
            <MenuItem value={5}>20</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            label="Depth"
            name="depth"
            className={classes.textField}
            {...depth}
          />
        </div>
        <div>
          <TextField
            label="Temperature"
            name="temperature"
            className={classes.textField}
            {...temperature}
          />
        </div>

        <div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleClick2}
            >
              Send
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div>
        </div>
      </Grid>

      <Grid item xs={2} className={classes.gridCenter}>
        <h1>_______________________</h1>
        <Card className={classes.cardStyle}>
          <CardHeader
            title="Name Method"
            subheader="-----------------------------"
          />

          <CardContent>{output}</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}

function useFormInputFile(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.files[0]);
  }
  return {
    value,
    onChange: handleChange
  };
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
