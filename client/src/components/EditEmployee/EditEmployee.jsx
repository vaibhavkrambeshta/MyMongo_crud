import React, { Component } from "react";
import './EditEmployee.css';
import axios from "axios";
import { withRouter } from 'react-router'
import {toast, ToastContainer} from "react-toastify";
import { globalStateContext } from "./../../Routes/Routes";
import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';

const EditEmployee = (props) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [response, setResponse] = useState("");
  const [id, setId] = useState("")
  const [queryParam, setQueryParam] = useState(props.location.search)
  const tokenData = useRef(useContext(globalStateContext));

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

    useEffect(() => {
    setTimeout(async() => {
      const config = {
        headers: {
          authorization: `Bearer ${tokenData.current.token}`,
        },
      };
      try {
        // const params = useParams();
        let search =  props.location.search;
        console.log("search =", search);
        const id = search.substring(1, search.length);
          
        const updateEmployee = await axios(`http://51.20.41.138:5000/api/v1/employees/${id}`, config);
        // const updateEmployee = await axios(`http://localhost:5001/api/v1/employees/${id}`, config);
        const { _id, first_name, last_name, email, phone, organization, designation, salary } = updateEmployee.data.employee;
        setFirstName(first_name);
        setLastName(last_name);
        setEmail(email);
        setPhone(phone);
        setOrganization(organization);
        setDesignation(designation);
        setSalary(salary);
        setId(_id)
        
        } catch (err) {
          setResponse("Employee not found!")
        }
    }, 0);
  }, [])

  const updateEmployeeHandler = async (e) => {
    const config = {
      headers: {
        authorization: `Bearer ${tokenData.current.token}`,
      },
    };
    e.preventDefault();
    try {

      const employee = await axios.put(`http://51.20.41.138:5000//api/v1/employees/${id}`, {
        // const employee = await axios.put(`http://localhost:5001/api/v1/employees/${id}`, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        organization: organization,
        designation: designation,
        salary: salary
      }, config);
      toast(employee.data.message ,{ type: toast.TYPE.INFO, autoClose: 3000 });

    } catch (err) {
      toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

    if (response === "Employee not found!")
      return <h1>Employee not found!</h1>
    return (
      <div className="Edit-Employee-Wrapper">
        <h1>Edit page</h1>
        <form onSubmit={updateEmployeeHandler}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            autocomplete="off"
            placeholder="firstName..."
            value={ first_name }
            name="first_name"
            onChange={onFirstNameChange}
            // ref="first_name"
            required
            className="Edit-Employee-Input"
            id="first_name"
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            autocomplete="off"
            placeholder="last_name..."
            value={ last_name }
            name="last_name"
            onChange={onLastNameChange}
            // ref="last_name"
            required
            className="Edit-Employee-Input"
            id="last_name"
          />
          <label htmlFor="email">email: <b>(must be a valid email)</b></label>
          <input
            type="text"
            autocomplete="off"
            placeholder="enter your email here"
            value={ email }
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
            autocomplete="off"
            name="phone"
            value={ phone }
            onChange={onPhoneChange}
            // ref="phone"
            className="Add-Employee-Input"
            required
            id="phone"
          />
          <label htmlFor="phone">Organization: </label>
          <input
            type="text"
            autocomplete="off"
            name="organization"
            value={ organization }
            onChange={onOrganizationChange}
            // ref="organization"
            className="Add-Employee-Input"
            required
            id="organization"
          />
          <label htmlFor="phone">Designation: </label>
          <input
            type="text"
            autocomplete="off"
            name="designation"
            value={ designation }
            onChange={onDesignationChange}
            // ref="designation"
            className="Add-Employee-Input"
            required
            id="organization"
          />
          <label htmlFor="phone">Salary: </label>
          <input
            type="text"
            autocomplete="off"
            name="salary"
            value={ salary }
            onChange={onSalaryChange}
            // ref="salary"
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

export default withRouter(EditEmployee);
