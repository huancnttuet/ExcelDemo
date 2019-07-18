import React, { useState, useEffect, useGlobal } from "reactn";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router";
import "../../css/Navigator.css";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  avatar: {
    marginRight: 10,

    borderRadius: "20%"
  },
  appBar: {
    backgroundImage:
      "linear-gradient(to right top, #196ce4, #00a1ff, #00c8df, #00e48b, #b6f32a)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    marginBottom: 12
  }
};

function TopPage(props) {
  const [authenticate, setAuthenticate] = useGlobal("authenticate");
  const [name, setName] = useGlobal("name");
  const [id, setId] = useGlobal("id");
  const { classes } = props;
  const [count, setCount] = useState("0px");
  const [marginLeft, setMarginLeft] = useState("0px");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [, setOpacity] = useState("1");

  function onOpen() {
    setCount("250px");
    setMarginLeft("250px");
    setBackgroundColor("rgba(0,0,0,0.4)");
    setOpacity("0.5");
  }
  function onClose() {
    setCount("0px");
    setMarginLeft("0px");
    setBackgroundColor("white");
    setOpacity("1");
  }

  useEffect(() => {
    // Update the document title using the browser API
    document.getElementById("mySidenav").style.width = `${count}`;
    document.getElementById("mainHeader").style.marginLeft = `${marginLeft}`;
    document.body.style.backgroundColor = `${backgroundColor}`;
  });

  const goToSignIn = () => {
    props.history.push("/");
  };
  const goToSignIn2 = () => {
    props.history.push("/");
    onClose();
  };
  const goToSignUp = () => {
    props.history.push("/signup");
  };
  const goToSignUp2 = () => {
    props.history.push("/signup");
    onClose();
  };
  const goToLogout = () => {
    setAuthenticate(false);
    setName("");
    setId(0);
    props.history.push("/");
  };
  const goToChangePwd = () => {
    props.history.push("/changepwd");
  };
  const goToHome = () => {
    props.history.push("/");
  };
  const goToHistory = () => {
    props.history.push("/history");
  };
  const goToHistory2 = () => {
    props.history.push("/history");
    onClose();
  };
  const goToForgottenAcc = () => {
    props.history.push("/forgottenacc");
  };
  const goToForgottenAcc2 = () => {
    props.history.push("/forgottenacc");
    onClose();
  };
  var jsx;
  if (authenticate) {
    jsx = (
      <>
        <div style={{ marginLeft: "1000px", marginRight: "25px" }}>
          Xin chào {name}
        </div>

        <Typography
          variant="h6"
          color="primary"
          onClick={goToLogout}
          style={{ cursor: "pointer", marginRight: "12px" }}
        >
          Logout
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          onClick={goToChangePwd}
          style={{ cursor: "pointer", marginRight: "12px" }}
        >
          ChangePwd
        </Typography>
      </>
    );
  } else {
    jsx = (
      <>
        <div style={{ marginLeft: "1000px" }}>{name}</div>

        <Typography
          variant="h6"
          color="primary"
          onClick={goToSignIn}
          style={{ cursor: "pointer", marginRight: "12px" }}
        >
          SignIn
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          onClick={goToSignUp}
          style={{ cursor: "pointer", marginRight: "12px" }}
        >
          SignUp
        </Typography>
      </>
    );
  }

  return (
    <div id="mainHeader" className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onOpen}
          >
            <MenuIcon />
          </IconButton>

          <Avatar
            src="https://upload.wikimedia.org/wikipedia/commons/8/86/Microsoft_Excel_2013_logo.svg"
            className={classes.avatar}
            onClick={goToHome}
            style={{ cursor: "pointer" }}
          />

          <Typography
            variant="h6"
            onClick={goToHome}
            color="inherit"
            style={{ cursor: "pointer" }}
          >
            Excel Demo
          </Typography>

          {jsx}
        </Toolbar>
      </AppBar>
      <div id="mySidenav" className="sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={onClose}>
          &times;
        </a>
        <Typography
          variant="h6"
          color="primary"
          onClick={goToSignIn2}
          style={{ cursor: "pointer", marginRight: "12px", marginLeft: "20px" }}
        >
          SignIn
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          onClick={goToSignUp2}
          style={{ cursor: "pointer", marginRight: "12px", marginLeft: "20px" }}
        >
          SignUp
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          onClick={goToForgottenAcc2}
          style={{ cursor: "pointer", marginRight: "12px", marginLeft: "20px" }}
        >
          Forgotten Password
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          onClick={goToHistory2}
          style={{ cursor: "pointer", marginRight: "12px", marginLeft: "20px" }}
        >
          History
        </Typography>
      </div>
    </div>
  );
}

TopPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TopPage));
