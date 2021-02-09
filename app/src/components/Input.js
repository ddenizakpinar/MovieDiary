import React, { Component } from "react";

class Input extends Component {
  render() {
    return (
      <div className="input">
        <input
          placeholder="Movie/Series"
          value={this.props.searchInput}
          onChange={(e) => this.props.onSearchInputChange(e.target.value)}
        />
      </div>
    );
  }
}

export default Input;
