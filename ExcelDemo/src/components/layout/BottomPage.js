import React from "react";
import StickyFooter from "react-sticky-footer";

function BottomPage(props) {
  return (
    <div style={{ marginTop: "160px" }}>
      <StickyFooter
        bottomThreshold={50}
        normalStyles={{
          backgroundImage:
            "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
          padding: "2rem",
          height: 80,
          textAlign: "center",
          fontFamily: "Goudy Old Style",
          fontSize: 25,
          color: "white"
        }}
        stickyStyles={{
          backgroundImage:
            "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "Goudy Old Style",
          fontSize: 25,
          color: "white"
        }}
      >
        Demo 5/2019 by HyperMiner
      </StickyFooter>
    </div>
  );
}

export default BottomPage;
