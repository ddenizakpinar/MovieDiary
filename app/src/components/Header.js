import React, { Component } from "react";
import Penguen from "../assets/penguen-img.png";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div>Movie</div>
        <img src={Penguen} alt="penguen-img" width={100} />
        <div>Diary</div>
      </div>
    );
  }
}

export default Header;
