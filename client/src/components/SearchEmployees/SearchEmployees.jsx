import React, { Component } from "react";
import "./SearchEmployees.css";

class SearchEmployees extends Component {
  state = { value: "" };

  onChangeHandler = e => {
    if(e.target.value){
      this.setState({ value: e.target.value }, () => {
        this.props.searchEmployees(this.state.value);
      });
    }
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Filter by name..."
        name="name"
        onBlur={ this.onChangeHandler }
        className="Search-Employee-Input"
      />
    );
  }
}

export default SearchEmployees;
