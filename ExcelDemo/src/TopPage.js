import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import './css/Navigator.css'

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  avatar: {
    marginRight: 10,

    borderRadius: '20%'
  },
  appBar: {
    backgroundImage: 'linear-gradient(to right top, #196ce4, #00a1ff, #00c8df, #00e48b, #b6f32a)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    marginBottom: 12
  }
};


function TopPage(props) {
  const { classes } = props;
  const [count, setCount] = useState("0px");
  const [marginLeft, setMarginLeft] = useState("0px")
  const [backgroundColor, setBackgroundColor] = useState("white")
  const [, setOpacity] = useState("1")

  function onOpen() {
    setCount("250px")
    setMarginLeft("250px")
    setBackgroundColor("rgba(0,0,0,0.4)")
    setOpacity("0.5")
  }
  function onClose() {
    setCount("0px")
    setMarginLeft("0px")
    setBackgroundColor("white")
    setOpacity("1")
  }
  console.log(count);
  useEffect(() => {
    // Update the document title using the browser API
    document.getElementById("mySidenav").style.width = `${count}`;
    document.getElementById("mainHeader").style.marginLeft = `${marginLeft}`;
    document.body.style.backgroundColor = `${backgroundColor}`
  });

  return (
    <div id="mainHeader" className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onOpen}>
            <MenuIcon />
          </IconButton>
          <Avatar src='https://upload.wikimedia.org/wikipedia/commons/8/86/Microsoft_Excel_2013_logo.svg' className={classes.avatar} />
          <Typography variant="h6" color="inherit">
            Excel Demo
          </Typography>

        </Toolbar>
      </AppBar>
      <div id="mySidenav" className="sidenav" >
        <a href="javascript:void(0)" className="closebtn"  onClick={onClose}>&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    </div>
  );
}

TopPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopPage);
