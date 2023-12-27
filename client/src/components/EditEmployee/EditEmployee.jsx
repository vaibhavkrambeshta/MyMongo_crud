import React, { Component } from "react";
import './EditEmployee.css';
import axios from "axios";
import { withRouter } from 'react-router'
import {toast, ToastContainer} from "react-toastify";

class EditEmployee extends Component {
  state = {
    id: '',
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    salary: "",
    response: ""
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    try {
    let search =  this.props.location.search,
      id = search.substring(1, search.length);
    const updateEmployee = await axios(`/api/v1/employees/${id}`);
    const { _id, first_name, last_name, email, phone, organization, designation, salary } = updateEmployee.data.employee;
    this.setState({ id, first_name, last_name, email, phone, organization, designation, salary });
    } catch (err) {
      this.setState({ response: "Employee not found!" })
    }
  };

  updateEmployeeHandler = async (e) => {
    e.preventDefault();
    try {
      const employee = await axios.put(`/api/v1/employees/${this.state.id}`, {
        first_name: this.refs.first_name.value,
        last_name: this.refs.last_name.value,
        email: this.refs.email.value,
        phone: this.refs.phone.value,
        organization: this.refs.organization.value,
        designation: this.refs.designation.value,
        salary: this.refs.salary.value
      });
      toast(employee.data.message ,{ type: toast.TYPE.INFO, autoClose: 3000 });

    } catch (err) {
      toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    if (this.state.response === "Employee not found!")
      return <h1>Employee not found!</h1>
    return (
      <div className="Edit-Employee-Wrapper">
        <h1>Edit page</h1>
        <form onSubmit={this.updateEmployeeHandler}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            autocomplete="off"
            placeholder="firstName..."
            value={ this.state.first_name }
            name="first_name"
            onChange={this.onChangeHandler}
            ref="first_name"
            required
            className="Edit-Employee-Input"
            id="first_name"
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            autocomplete="off"
            placeholder="last_name..."
            value={ this.state.last_name }
            name="last_name"
            onChange={this.onChangeHandler}
            ref="last_name"
            required
            className="Edit-Employee-Input"
            id="last_name"
          />
          <label htmlFor="email">email: <b>(must be a valid email)</b></label>
          <input
            type="text"
            autocomplete="off"
            placeholder="enter your email here"
            value={ this.state.email }
            name="email"
            onChange={this.onChangeHandler}
            ref="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            className="Add-Employee-Input"
            required
            id="email"
          />
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            autocomplete="off"
            name="phone"
            value={ this.state.phone }
            onChange={this.onChangeHandler}
            ref="phone"
            className="Add-Employee-Input"
            required
            id="phone"
          />
          <label htmlFor="phone">Organization: </label>
          <input
            type="text"
            autocomplete="off"
            name="organization"
            value={ this.state.organization }
            onChange={this.onChangeHandler}
            ref="organization"
            className="Add-Employee-Input"
            required
            id="organization"
          />
          <label htmlFor="phone">Designation: </label>
          <input
            type="text"
            autocomplete="off"
            name="designation"
            value={ this.state.designation }
            onChange={this.onChangeHandler}
            ref="designation"
            className="Add-Employee-Input"
            required
            id="organization"
          />
          <label htmlFor="phone">Salary: </label>
          <input
            type="text"
            autocomplete="off"
            name="salary"
            value={ this.state.salary }
            onChange={this.onChangeHandler}
            ref="salary"
            className="Add-Employee-Input"
            required
            id="salary"
          />
          
          <button type="submit" className="Edit-Employee-Submit fa fa-pencil"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(EditEmployee);
