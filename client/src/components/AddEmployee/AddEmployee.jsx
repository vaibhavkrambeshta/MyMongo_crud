import React, { Component } from "react";
import './AddEmployee.css';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddEmployee extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    salary: ""
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  addEmployee = async e => {
    e.preventDefault();
    try {
      const newEmployee = await axios.post("/api/v1/employees", {
          first_name: this.refs.first_name.value,
          last_name: this.refs.last_name.value,
          email: this.refs.email.value,
          phone: this.refs.phone.value,
          organization: this.refs.organization.value,
          designation: this.refs.designation.value,
          salary: this.refs.salary.value
        }
      );

      toast("Employee " + newEmployee.data.newEmployee.first_name + " created successfully" ,{ type: toast.TYPE.SUCCESS, autoClose: 3000 });
    } catch (err) {
      toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    return (
      <div className="AddEmployee-Wrapper">
        <h1>Add Employee:</h1>
        <form onSubmit={this.addEmployee}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            placeholder="Enter the first name of the employees here"
            name="firstName"
            onChange={this.onChangeHandler}
            ref="first_name"
            className="Add-Employee-Input"
            required
            id="firstname"
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            placeholder="Enter the last name of the employees here"
            name="lastName"
            onChange={this.onChangeHandler}
            ref="last_name"
            className="Add-Employee-Input"
            required
            id="lastName"
          />
          <label htmlFor="email">email: <b>(must be a valid email)</b></label>
          <input
            type="text"
            placeholder="enter your email here"
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
            name="phone"
            onChange={this.onChangeHandler}
            ref="phone"
            className="Add-Employee-Input"
            required
            id="phone"
          />
          <label htmlFor="organization">Organization: </label>
          <input
            type="text"
            name="organization"
            onChange={this.onChangeHandler}
            ref="organization"
            className="Add-Employee-Input"
            required
            id="organization"
          />
          <label htmlFor="designation">Designation: </label>
          <input
            type="text"
            name="designation"
            onChange={this.onChangeHandler}
            ref="designation"
            className="Add-Employee-Input"
            required
            id="designation"
          />
          <label htmlFor="salary">Salary: </label>
          <input
            type="text"
            name="salary"
            onChange={this.onChangeHandler}
            ref="salary"
            className="Add-Employee-Input"
            required
            id="salary"
          />
          <button type="submit" className="Add-Employee-Submit fa fa-plus"></button>
          <button type="reset" className="Add-Employee-Reset fa fa-refresh"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AddEmployee;
