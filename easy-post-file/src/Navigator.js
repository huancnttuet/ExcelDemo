import React, {useState, useEffect} from 'react';
import './Navigator.css'

const btnStyle = {
  fontSize:'30px',
  cursor:'pointer'
}



function Navigator(props) {
  const [count, setCount] = useState("0px");
  function onOpen() {
    setCount("250px")

  }
  function onClose() {
    setCount("0px")

  }
  console.log(count);
  useEffect(() => {
    // Update the document title using the browser API
    document.getElementById("mySidenav").style.width = `${count}`;
  });

  return (
    <div>

      <div id="mySidenav" className="sidenav" >
        <a href="javascript:void(0)" className="closebtn"  onClick={onClose}>&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>

      <div id="main">
      
        <span style={btnStyle} onClick={onOpen}>&#9776; open</span>
      </div>

    </div>
  )
}

export default Navigator
