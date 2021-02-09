import React, { Component } from "react";

class Switch extends Component {
  render() {
    return (
      <div className="switch">
        <input
          onChange={(e) => this.props.onToggleChange(e.target.checked)}
          type="checkbox"
          id="switch"
          checked={this.props.toggle}
        />
        <label htmlFor="switch">Toggle</label>
        <div className="state">{this.props.toggle ? "All" : "Watched"}</div>
      </div>
    );
  }
}

export default Switch;
