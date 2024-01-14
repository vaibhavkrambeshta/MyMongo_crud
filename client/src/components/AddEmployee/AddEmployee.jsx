import React, { Component } from "react";
import './AddEmployee.css';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { globalStateContext } from "./../../Routes/Routes";
import { useContext, useState, useEffect, useRef } from "react";


const AddEmployee =  () => {
  // state = {
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   phone: "",
  //   organization: "",
  //   designation: "",
  //   salary: ""
  // };
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const tokenData = useRef(useContext(globalStateContext));

  // const onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });
  const onFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const onLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const onPhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const onOrganizationChange = (e) => {
    setOrganization(e.target.value)
  }
  const onDesignationChange = (e) => {
    setDesignation(e.target.value)
  }
  const onSalaryChange = (e) => {
    setSalary(e.target.value)
  }
  

  const addEmployee = async e => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${tokenData.current.token}`,
      },
    };
    try {
      const newEmployee = await axios.post("http://localhost:5000/api/v1/employees", {
        // const newEmployee = await axios.post("http://localhost:5001/api/v1/employees", {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone: phone,
          organization: organization,
          designation: designation,
          salary: salary
        },
        config
      );

      toast("Employee " + newEmployee.data.newEmployee.first_name + " created successfully" ,{ type: toast.TYPE.SUCCESS, autoClose: 3000 });
    } catch (err) {
      toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };
    return (
      <div className="AddEmployee-Wrapper">
        <h1>Add Employee:</h1>
        <form onSubmit={addEmployee}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            placeholder="Enter the first name of the employees here"
            name="firstName"
            onChange={onFirstNameChange}
            // ref="first_name"
            className="Add-Employee-Input"
            required
            id="firstname"
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            placeholder="Enter the last name of the employees here"
            name="lastName"
            onChange={onLastNameChange}
            // ref="last_name"
            className="Add-Employee-Input"
            required
            id="lastName"
          />
          <label htmlFor="email">email: <b>(must be a valid email)</b></label>
          <input
            type="text"
            placeholder="enter your email here"
            name="email"
            onChange={onEmailChange}
            // ref="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            className="Add-Employee-Input"
            required
            id="email"
          />
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            onChange={onPhoneChange}
            // ref="phone"
            className="Add-Employee-Input"
            required
            id="phone"
          />
          <label htmlFor="organization">Organization: </label>
          <input
            type="text"
            name="organization"
            onChange={onOrganizationChange}
            // ref="organization"
            className="Add-Employee-Input"
            required
            id="organization"
          />
          <label htmlFor="designation">Designation: </label>
          <input
            type="text"
            name="designation"
            onChange={onDesignationChange}
            // ref="designation"
            className="Add-Employee-Input"
            required
            id="designation"
          />
          <label htmlFor="salary">Salary: </label>
          <input
            type="text"
            name="salary"
            onChange={onSalaryChange}
            // ref="salary"
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

export default AddEmployee;
