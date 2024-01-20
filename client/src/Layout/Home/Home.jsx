import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Employee from "../../components/Employee/Employee";
import SearchEmployees from "../../components/SearchEmployees/SearchEmployees";
import { useContext, useState, useEffect, useRef } from "react";
import { globalStateContext } from "./../../Routes/Routes";


const  Home =  () => {
  // state = {
  //   data: null,
  //   allEmployees: null,
  //   error: ""
  // };
  const[data, setData] = useState(null);
  const [error, setError] = useState(null)
  const tokenData = useRef(useContext(globalStateContext));
  // console.log('token===', tokenData);
  

  // async componentDidMount() {
  //   try {
  //     // const employees = await axios("http://localhost:5001/proxy/api/v1/employees");
  //     const employees = await axios("http://localhost:5001/api/v1/employees");
  //     console.log("employees===", employees)
  //     this.setState({ data: employees.data });
  //   } catch (err) {
  //     this.setState({ error: err.message });
  //   }
  // }
  useEffect(() => {
    setTimeout(async() => {
      console.log("tokenData===", tokenData)
    const config = {
      headers: {
        authorization: `Bearer ${tokenData.current.token}`,
      },
    };
    try {
      const employees = await axios("http://51.20.41.138:5000//api/v1/employees", config);
      // const employees = await axios("http://localhost:5001/api/v1/employees", config);
      console.log("employees===", employees)
      setData(employees.data)
    } catch (err) {
      setError(err.message)
    }
    }, 2000);
  }, [])

  const removeEmployee = async id => {
    const config = {
      headers: {
        authorization: `Bearer ${tokenData.current.token}`,
      },
    };
    try {
      const employeeRemoved = await axios.delete(`http://51.20.41.138:5000/api/v1/employees/${id}`, config);
      // const employeeRemoved = await axios.delete(`http://localhost:5001/api/v1/employees/${id}`, config);
      const employees = await axios("http://51.20.41.138:5000/api/v1/employees", config);
      // const employees = await axios("http://localhost:5001/api/v1/employees", config);
      setData(employees.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const searchEmployees = async key => {
    const config = {
      headers: {
        authorization: `Bearer ${tokenData.current.token}`,
      },
    };
    try {
        const searchEmployees = await axios(`http://51.20.41.138:5000/api/v1/employees/search/${key}`, config);
        // const searchEmployees = await axios(`http://localhost:5001/api/v1/employees/search/${key}`, config);
        // const employees = await axios("/api/v1/employees");
        setData(searchEmployees.data);
      } catch (err) {
        setError(err.message);
      }
  };
    // console.log(this.props);
    let employees;

    if (data)
      employees =
        data.employees &&
        data.employees.map(employee => (
          <Employee key={employee._id} {...employee} removeEmployee={removeEmployee} />
        ));
    else return <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /> </div>;

    if (error) return <h1>{error}</h1>;
    if (data !== null)
      if (!data.employees.length)
        return <h1 className="No-Employees">No employees!</h1>;

    return (

      <div className="Table-Wrapper">
        <h1>Employees:</h1>
        <SearchEmployees searchEmployees={searchEmployees} />
        <table className="Table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Organization</th>
              <th>Designation</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>{employees}</tbody>
        </table>
        {/* {this.props} */}
      </div>
    );
  }

export default Home;
